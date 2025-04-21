<?php

namespace App\Http\Controllers\PaymentGateWays;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Plan;
use Inertia\Inertia;

class PayFastControllerCopy extends Controller
{
    private $merchant_id;
    private $merchant_key;
    private $passphrase;
    private $testMode;
    
    public function __construct()
    {
        $this->merchant_id = env('PAYFAST_MERCHANT_ID');
        $this->merchant_key = env('PAYFAST_MERCHANT_KEY');
        $this->passphrase = env('PAYFAST_PASSPHRASE');
        $this->testMode = true;        
    }



    public function subscribe($slug)
    {
        
        try {

            $data = array(
                // Merchant details
                'merchant_id' => $this->merchant_id,
                'merchant_key' => $this->merchant_key,
                'return_url' =>  route('payment.success'),
                'cancel_url' => route('payment.cancel'),
                'notify_url' => route('payment.notify'),
                // Buyer details
                'name_first' => 'First Name',
                'name_last'  => 'Last Name',
                'email_address'=> 'test@test.com',
                // Transaction details
                'm_payment_id' => '1234', //Unique payment ID to pass through to notify_url
                'amount' => number_format( sprintf( '%.2f', 200 ), 2, '.', '' ),
                'item_name' => 'Order#123'
            );
           

            $data['signature'] = $this->generateSignature($data, $this->passphrase);


            // convert data to string
            $data_string = $this->dataToString($data);
          
           
           $identifier = $this->generatePaymentIdentifier($data_string);
          
           if($identifier) {
                return Inertia::view('PaymentMethods/Index', [
                    'order' => Plan::where('slug', $slug)->first(),
                    'uuid' => $identifier,
                    "return_url" => $data['return_url'],
                    "cancel_url" => $data['cancel_url'],
                    "notify_url" => $data['notify_url'],
                    "amount" => 200
                ]);
           }
        
        } catch (\Illuminate\Http\Client\RequestException $e) {
            // Handle exception
            logger()->error('PayFast API Error: ' . $e->getMessage());
            throw $e;
        }


            $plan = Plan::where('slug', $slug)->first();
            $plan->subscriptions()->create([
                'user_id' => auth()->id(),
                'plan_id' => $plan->id,
                'started_at' => now(),
                'expires_at' => $plan->getEndDate(),
            ]);
            return back()->with('success', 'Plan subscribed successfully');
        
    }

    function dataToString($dataArray) {
        // Create parameter string
          $pfOutput = '';
          foreach( $dataArray as $key => $val ) {
              if($val !== '') {
                  $pfOutput .= $key .'='. urlencode( trim( $val ) ) .'&';
              }
          }
          // Remove last ampersand
          return substr( $pfOutput, 0, -1 );
      }

    function generatePaymentIdentifier($pfParamString, $pfProxy = null) {
        // Use cURL (if available)
        if( in_array( 'curl', get_loaded_extensions(), true ) ) {
            // Variable initialization
            $url = 'https://payfast.co.za/onsite/process';
    
            // Create default cURL object
            $ch = curl_init();
    
            // Set cURL options - Use curl_setopt for greater PHP compatibility
            // Base settings
            curl_setopt( $ch, CURLOPT_USERAGENT, NULL );  // Set user agent
            curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );      // Return output as string rather than outputting it
            curl_setopt( $ch, CURLOPT_HEADER, false );             // Don't include header in output
            curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, 2 );
            curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, true );
    
            // Standard settings
            curl_setopt( $ch, CURLOPT_URL, $url );
            curl_setopt( $ch, CURLOPT_POST, true );
            curl_setopt( $ch, CURLOPT_POSTFIELDS, $pfParamString );
            if( !empty( $pfProxy ) )
                curl_setopt( $ch, CURLOPT_PROXY, $pfProxy );
    
            // Execute cURL
           
            $response = curl_exec( $ch );
            curl_close( $ch );
            // echo $response;
            $rsp = json_decode($response, true);
            if ($rsp['uuid']) {
                return $rsp['uuid'];
            }
        }
        return null;
    }

    public function initiatePayment(Request $request)
    {
        //dd($request);
        $order = Plan::findOrFail($request->orderId);

        $data = [
            'merchant_id' => $this->merchant_id,
            'merchant_key' => $this->merchant_key,
            'return_url' => route('payment.success'),
            'cancel_url' => route('payment.cancel'),
            'notify_url' => route('payment.notify'),
            'amount' => number_format(200, 2, '.', ''),
            'm_payment_id' => $order->orderId,
            'item_name' => 'Order #' . $order->orderId,
            'item_description' => 'Payment for order #' . $order->orderId,
            'email_address' => $order->email,
        ];

        $signature = $this->generateSignature($data);
        $data['signature'] = $signature;

        return response()->json([
            'merchantId' => $this->merchant_id,
            'merchantKey' => $this->merchant_key,
            'paymentData' => $data,
            'testMode' => $this->testMode
        ]);
    }

    function generateSignature($data, $passPhrase = null) {
        // Create parameter string
        $pfOutput = '';
        foreach( $data as $key => $val ) {
            if($val !== '') {
                $pfOutput .= $key .'='. urlencode( trim( $val ) ) .'&';
            }
        }
        // Remove last ampersand
        $getString = substr( $pfOutput, 0, -1 );
        if( $passPhrase !== null ) {
            $getString .= '&passphrase='. urlencode( trim( $passPhrase ) );
        }
        return md5( $getString );
    } 

    public function success()
    {
        logger()->error('SUCCESS HIT: ' );
        return Inertia::render('Subscriptions/Success');
    }

    public function cancel()
    {
        return Inertia::render('Subscriptions/Cancel');
    }

    public function notify(Request $request)
    {
        logger()->error('NOTIFY HIT: ' );
        // Verify the payment notification
        if (!$this->verifyPayment($request->all())) {
            return response('Invalid signature', 400);
        }

        $payment_status = $request->input('payment_status');
        $order_id = $request->input('m_payment_id');
        
        $order = Plan::find($order_id);
        if ($payment_status === 'COMPLETE') {
            $order->status = 'paid';
            $order->save();
        }

        return response('OK');
    }

    private function verifyPayment($pfData)
    {
        $signature = $this->generateSignature($pfData);
        return $signature === $pfData['signature'];
    }
}
