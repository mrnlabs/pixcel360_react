<?php

namespace App\Services;

use App\Models\Plan;
use GuzzleHttp\Client;

class PayFastService
{
    protected $client;
    protected $merchantId;
    protected $merchantKey;
    protected $passphrase;
    protected $payfastUrl;

    public function __construct()
    {
        $this->client = new Client();
        $this->merchantId = env('PAYFAST_MERCHANT_ID');
        $this->merchantKey = env('PAYFAST_MERCHANT_KEY');
        $this->passphrase = env('PAYFAST_PASSPHRASE');
        $this->payfastUrl = env('PAYFAST_URL');
    }

    public function initiatePayment($data)
    {
        $payload = [
            'merchant_id' => $this->merchantId,
            'merchant_key' => $this->merchantKey,
            'amount' => $data['amount'],
            'item_name' => $data['item_name'],
            'return_url' => $data['return_url'],
            'cancel_url' => $data['cancel_url'],
            'notify_url' => $data['notify_url'],
        ];

        // Generate the signature
        $payload['signature'] = $this->generateSignature($payload);

        $response = $this->client->post("{$this->payfastUrl}", [
            'form_params' => $payload
        ]);

        return json_decode($response->getBody(), true);
    }

    private function generateSignature($data)
    {
        ksort($data);
        $queryString = http_build_query($data);
        return md5($queryString . '&passphrase=' . $this->passphrase);
    }
}

