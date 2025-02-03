<?php

namespace App\Services;

use App\Models\Plan;

class PayfastService
{
    public function pay($request)
    {
             $cartTotal = 10.00; // This amount needs to be sourced from your application
             $domain = env('APP_URL');
            $passphrase = 'jt7NOE43FZPn';
            $data = array(
                // Merchant details
                'merchant_id' => '10000100',
                'merchant_key' => '46f0cd694581a',
                'return_url' => $domain.'/return',
                'cancel_url' => $domain.'/cancel',
                'notify_url' => $domain.'/notify',
                // Buyer details
                'name_first' => 'First Name',
                'name_last'  => 'Last Name',
                'email_address'=> 'test@test.com',
                // Transaction details
                'm_payment_id' => '1234', //Unique payment ID to pass through to notify_url
                'amount' => number_format( sprintf( '%.2f', $cartTotal ), 2, '.', '' ),
                'item_name' => 'Order#123'
            );

            $signature = $this->generateSignature($data, $passphrase);
            $data['signature'] = $signature;

            // If in testing mode make use of either sandbox.payfast.co.za or www.payfast.co.za
            $testingMode = true;
            $pfHost = $testingMode ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';
            $htmlForm = '<form action="https://'.$pfHost.'/eng/process" method="post">';
            foreach($data as $name=> $value)
            {
                $htmlForm .= '<input name="'.$name.'" type="hidden" value=\''.$value.'\' />';
            }
            $htmlForm .= '<input type="submit" value="Pay Now" class="main-btn btn-hover h_50 w-100 mt-5 payfast-btn" /></form>';
            return $htmlForm; 
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
}

