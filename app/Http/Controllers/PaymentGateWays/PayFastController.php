<?php

namespace App\Http\Controllers\PaymentGateWays;

use App\Models\Plan;
use Inertia\Inertia;
use App\Models\Transaction;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Jobs\SendPaymentErrorEmailJob;
use App\Jobs\SendPaymentSuccessEmailJob;

class PayFastController extends Controller
{
    private $merchant_id;
    private $merchant_key;
    private $passphrase;
    private $testMode;
    private $apiUrl;
    
    public function __construct()
    {
        $this->merchant_id = env('PAYFAST_MERCHANT_ID');
        $this->merchant_key = env('PAYFAST_MERCHANT_KEY');
        $this->passphrase = env('PAYFAST_PASSPHRASE');
        $this->testMode = (bool) env('PAYFAST_TEST_MODE', true);
        
        // Set the appropriate URL based on test mode
        $this->apiUrl = $this->testMode 
            ? 'https://sandbox.payfast.co.za/onsite/process'
            : 'https://payfast.co.za/onsite/process';
    }

    public function subscribe($slug)
    {
        try {
            $plan = Plan::where('slug', $slug)->firstOrFail();
            $user = auth()->user();
            
            // Generate a unique order ID
            $orderId = Str::random(10);
            
            $data = array(
                // Merchant details
                'merchant_id' => $this->merchant_id,
                'merchant_key' => $this->merchant_key,
                'return_url' =>  route('payment.success'),
                'cancel_url' => route('payment.cancel'),
                'notify_url' => route('payment.notify'),
                
                // Buyer details
                'name_first' => $user->firstname ?? 'First Name',
                'name_last'  => $user->lastname ?? 'Last Name',
                'email_address'=> $user->email ?? 'test@test.com',
                
                // Transaction details
                'm_payment_id' => $orderId,
                'amount' => number_format(sprintf('%.2f', $plan->price), 2, '.', ''),
                'item_name' => $plan->name ?? 'Subscription Plan',

                'custom_str1' => (string)$user->id,  // User ID
                'custom_str2' => (string)$plan->id,  // Plan ID
            );
            
            // Add signature
            $data['signature'] = $this->generateSignature($data, $this->passphrase);

            // Convert data to string
            $data_string = $this->dataToString($data);
            
            // Log the request for debugging
            logger()->info('PayFast Request Data: ' . $data_string);
            
            // Get payment identifier
            $identifier = $this->generatePaymentIdentifier($data_string);
            
            if ($identifier) {
                return Inertia::render('PaymentMethods/Index', [
                    'order' => $plan,
                    'payfastIdentifier' => $identifier,
                    "return_url" => $data['return_url'],
                    "cancel_url" => $data['cancel_url'],
                    "notify_url" => $data['notify_url'],
                    "amount" => $plan->price
                ]);
            } else {
                logger()->error('Failed to get PayFast payment identifier');
                return back()->with('error', 'Unable to initialize payment. Please check your network connection and try again.');
            }
            
        } catch (\Exception $e) {
            logger()->error('PayFast Error: ' . $e->getMessage());
            return back()->with('error', 'An error occurred. Please try again later.');
        }
    }

    protected function dataToString($dataArray) {
        // Create parameter string
        $pfOutput = '';
        foreach ($dataArray as $key => $val) {
            if ($val !== '') {
                $pfOutput .= $key .'='. urlencode(trim($val)) .'&';
            }
        }
        // Remove last ampersand
        return substr($pfOutput, 0, -1);
    }

    protected function generatePaymentIdentifier($pfParamString, $pfProxy = null) {
        // Use cURL (if available)
        if (!in_array('curl', get_loaded_extensions(), true)) {
            logger()->error('cURL is not installed');
            return null;
        }
            
        try {
            // Create default cURL object
            $ch = curl_init();
            
            // Set cURL options
            curl_setopt($ch, CURLOPT_USERAGENT, 'PayFast PHP SDK');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HEADER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
            
            // Standard settings
            curl_setopt($ch, CURLOPT_URL, $this->apiUrl);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $pfParamString);
            
            if (!empty($pfProxy)) {
                curl_setopt($ch, CURLOPT_PROXY, $pfProxy);
            }
            
            // Add timeout
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
            curl_setopt($ch, CURLOPT_TIMEOUT, 30);
            
            // Execute cURL
            $response = curl_exec($ch);
            
            // Check for errors
            if (curl_errno($ch)) {
                logger()->error('cURL Error: ' . curl_error($ch));
                curl_close($ch);
                return null;
            }
            
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            
            logger()->info('PayFast API Response Code: ' . $httpCode);
            logger()->info('PayFast API Raw Response: ' . $response);
            
            // Process the response
            if (!empty($response)) {
                $rsp = json_decode($response, true);
                
                if (json_last_error() !== JSON_ERROR_NONE) {
                    logger()->error('JSON decode error: ' . json_last_error_msg());
                    return null;
                }
                
                if (isset($rsp['uuid'])) {
                    return $rsp['uuid'];
                } else {
                    logger()->error('PayFast API Error: UUID not found in response');
                    logger()->error('Response: ' . $response);
                }
            } else {
                logger()->error('PayFast API Error: Empty response');
            }
            
        } catch (\Exception $e) {
            logger()->error('Exception in generatePaymentIdentifier: ' . $e->getMessage());
        }
        
        return null;
    }

    public function initiatePayment(Request $request)
    {
        try {
            $order = Plan::findOrFail($request->orderId);
            $user = auth()->user();
            
            $data = [
                'merchant_id' => $this->merchant_id,
                'merchant_key' => $this->merchant_key,
                'return_url' => route('payment.success'),
                'cancel_url' => route('payment.cancel'),
                'notify_url' => route('payment.notify'),
                'amount' => number_format($order->price, 2, '.', ''),
                'm_payment_id' => $order->id,
                'item_name' => 'Subscription: ' . $order->name,
                'item_description' => 'Subscription to ' . $order->name,
                'email_address' => $user->email ?? 'test@test.com',
                'name_first' => $user->firstname ?? 'First Name',
                'name_last' => $user->lastname ?? 'Last Name',
            ];

            $signature = $this->generateSignature($data, $this->passphrase);
            $data['signature'] = $signature;
            logger()->info('PayFast Request Data: ' . json_encode($data));
            return response()->json([
                'merchantId' => $this->merchant_id,
                'merchantKey' => $this->merchant_key,
                'paymentData' => $data,
                'testMode' => $this->testMode
            ]);
        } catch (\Exception $e) {
            logger()->error('PayFast initiate payment error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to initialize payment'], 500);
        }
    }

    protected function generateSignature($data, $passPhrase = null) {
        // Create parameter string
        $pfOutput = '';
        foreach ($data as $key => $val) {
            if ($val !== '') {
                $pfOutput .= $key .'='. urlencode(trim($val)) .'&';
            }
        }
        // Remove last ampersand
        $getString = substr($pfOutput, 0, -1);
        if ($passPhrase !== null) {
            $getString .= '&passphrase='. urlencode(trim($passPhrase));
        }
        return md5($getString);
    } 

    public function success(Request $request)
    {
        logger()->info('PayFast payment successful - User returned');
        logger()->info('Return data: ' . json_encode($request->all()));
        
        $m_payment_id = $request->input('m_payment_id');
        $pf_payment_id = $request->input('pf_payment_id');
        
        $transaction = Transaction::where('merchant_payment_id', $m_payment_id)->first();
        
        if ($transaction) {
            $paymentData = $transaction->payment_data ?? [];
            $paymentData['return_data'] = $request->all();
            
            $transaction->update([
                'payment_data' => $paymentData,
                'transaction_id' => $pf_payment_id,
            ]);
        }
        
        return Inertia::render('Subscriptions/Success', [
            'paymentData' => $request->all(),
            'transactionId' => $pf_payment_id,
            'orderReference' => $m_payment_id,
            'message' => 'Your payment was successful. Thank you for your subscription!'
        ]);
    }

    public function cancel(Request $request)
    {
        logger()->info('PayFast payment cancelled by user');
        logger()->info('Cancel data: ' . json_encode($request->all()));
        
        $m_payment_id = $request->input('m_payment_id');
        
        // Find the transaction
        $transaction = Transaction::where('merchant_payment_id', $m_payment_id)->first();
        
        // Update transaction status
        if ($transaction) {
            $paymentData = $transaction->payment_data ?? [];
            $paymentData['cancel_data'] = $request->all();
            
            $transaction->update([
                'status' => 'cancelled',
                'payment_data' => $paymentData
            ]);
        }
        
        return Inertia::render('Subscriptions/Cancel', [
            'message' => 'Your payment was cancelled. Please try again or contact support if you need assistance.'
        ]);
    }

    public function notify(Request $request)
    {
        logger()->info('PayFast notification received');
        logger()->info('Notification data: ' . json_encode($request->all()));
        
        // Verify the payment notification
        // if (!$this->verifyPayment($request->all())) {
        //     logger()->error('PayFast notification verification failed');
        //     return response('Invalid signature', 400);
        // }

        $payment_status = $request->input('payment_status');
        $m_payment_id = $request->input('m_payment_id');
        $pf_payment_id = $request->input('pf_payment_id');
        $amount_gross = $request->input('amount_gross');
        $userId = $request->input('custom_str1');
        $planId = $request->input('custom_str2');
        
        logger()->info("Processing payment: Status={$payment_status}, OrderID={$m_payment_id}, PayFastID={$pf_payment_id}, Amount={$amount_gross}");
        
        try {
            // Find the transaction by merchant payment ID
            $transaction = Transaction::where('merchant_payment_id', $m_payment_id)->first();
            
            if (!$transaction) {
               //its new transaction lets insert data
                $transaction = Transaction::create([
                    "merchant_payment_id" => $m_payment_id,
                    "pf_payment_id" => $pf_payment_id,
                    'amount' => $request->input('amount_fee'),
                    'amount_net' => $request->input('amount_net'),
                    "amount_gross" => $amount_gross,
                    "status" => $payment_status,
                    "payment_data" => $request->all(),
                    "user_id" => $userId,
                    'completed_at' => now(),
                    'currency' => 'USD',
                    "item_name" => $request->input('item_name'),
                    "plan_id" => $planId,
                    "email" => $request->input('email_address'),
                ]);

            }else{
            
      
            $paymentData = $transaction->payment_data ?? [];
            $paymentData['notification_data'] = $request->all();

            $transaction->update([
                "merchant_payment_id" => $m_payment_id,
                "pf_payment_id" => $pf_payment_id,
                'amount' => $request->input('amount_fee'),
                'amount_net' => $request->input('amount_net'),
                "amount_gross" => $amount_gross,
                "status" => $payment_status,
                "payment_data" => $request->all(),
                "user_id" => $userId,
                "plan_id" => $planId,
                'completed_at' => now(),
                'currency' => 'USD',
                "item_name" => $request->input('item_name'),
                "email" => $request->input('email_address'),
            ]);
            
        }
            if ($payment_status === 'COMPLETE') {                
                $transaction->markAsCompleted();
                
                $plan = $transaction->plan;
                $user = $transaction->user;
                
                if ($plan && $user) {
                    // Create subscription
                    $subscription = $plan->subscriptions()->create([
                        'user_id' => $user->id,
                        'plan_id' => $plan->id,
                        'started_at' => now(),
                        'expires_at' => $plan->getEndDate(),
                        'payment_method' => 'payfast',
                        'transaction_id' => $pf_payment_id,
                    ]);
                    
                    logger()->info("Subscription {$subscription->id} created successfully for plan: {$plan->id}, user: {$user->id}");
                    
                    SendPaymentSuccessEmailJob::dispatch(
                        $user, $subscription, 
                        $transaction->email,
                        $plan)
                        ->onQueue('payments');
                }
            } else if (in_array($payment_status, ['FAILED', 'CANCELLED'])) {
                $transaction->markAsFailed();
                logger()->warning("Payment {$payment_status}. Transaction: {$transaction->id}");
            } else {
                logger()->info("Payment status: {$payment_status}. Transaction: {$transaction->id}");
            }
            SendPaymentErrorEmailJob::dispatch(
                $user, $subscription, 
                $transaction->email, $plan)
            ->onQueue('payments');
            
            return response('OK');
        } catch (\Exception $e) {
            logger()->error('Error processing PayFast notification: ' . $e->getMessage());
            logger()->error($e->getTraceAsString());
            return response('Error processing notification', 500);
        }
    }

    private function verifyPayment($pfData)
    {
        // First, check that the notification is coming from PayFast's IP range
        if (!$this->validatePayFastHost()) {
            logger()->error('PayFast notification coming from unrecognized host');
            return false;
        }
        
        // Remove the signature from the data
        $signature = isset($pfData['signature']) ? $pfData['signature'] : null;
        
        if (!$signature) {
            logger()->error('No signature in PayFast notification data');
            return false;
        }
        
        // Create a copy of the data without the signature for signature verification
        $pfParamsToValidate = $pfData;
        unset($pfParamsToValidate['signature']);
        
        // Also remove pf_ params when generating a signature
        $pfParamsForSignature = [];
        foreach ($pfParamsToValidate as $key => $val) {
            if (strpos($key, 'pf_') !== 0) {
                $pfParamsForSignature[$key] = $val;
            }
        }
        
        // Generate signature
        $generatedSignature = $this->generateSignature($pfParamsForSignature, $this->passphrase);
        
        // Verify signature
        $signatureValid = hash_equals($signature, $generatedSignature);
        
        if (!$signatureValid) {
            logger()->error('PayFast signature validation failed');
            logger()->error('Expected: ' . $generatedSignature . ', Received: ' . $signature);
        }
        
        return $signatureValid;
    }

    private function validatePayFastHost()
    {
        // Skip validation in test mode
        if ($this->testMode) {
            return true;
        }
        
        // Get the originating IP
        $validHosts = [
            'www.payfast.co.za',
            'sandbox.payfast.co.za',
            'w1w.payfast.co.za',
            'w2w.payfast.co.za',
        ];
        
        $validIps = [];
        foreach ($validHosts as $pfHostname) {
            $ips = gethostbynamel($pfHostname);
            if ($ips !== false) {
                $validIps = array_merge($validIps, $ips);
            }
        }
        
        // Remove duplicates
        $validIps = array_unique($validIps);
        
        // Get current server IP
        $remoteIp = request()->ip();
        
        // Validate IP
        if (in_array($remoteIp, $validIps, true)) {
            return true;
        }
        
        logger()->warning('PayFast notification from invalid IP: ' . $remoteIp);
        return false;
    }
}