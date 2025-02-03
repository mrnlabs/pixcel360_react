<?php

namespace App\Services;

use App\Models\Subscription;

class SubscriptionService
{
    public function getAllSubscriptions()
    {
        return Subscription::all();
    }

    public function createSubscription(array $data)
    {
        Subscription::create($data);
        return "Subscription created successfully!";
    }

    public function getSubscription($subscriptionId)
    {
        return Subscription::find($subscriptionId);
    }

    public function updateSubscription($subscriptionId, array $data)
    {
        $subscription = Subscription::find($subscriptionId);

        if (!$subscription) {
            return false; // Subscription not found
        }

        $subscription->update($data);
        return "Subscription updated successfully!";
    }

    public function deleteSubscription($subscriptionId)
    {
        $subscription = Subscription::find($subscriptionId);

        if (!$subscription) {
            return false; // Subscription not found
        }

        $subscription->delete();
        return true;
    }
}

