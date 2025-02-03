<?php

namespace App\Services;

use App\Models\Plan;

class PlanService
{
    public function createPlan(array $data)
    {
        // Create a new plan
        return Plan::create($data);
    }

    public function getPlan($planId)
    {
        // Get a plan by ID
        return Plan::find($planId);
    }

    public function updatePlan($planId, array $data)
    {
        // Find the plan
        $plan = Plan::find($planId);

        if (!$plan) {
            // Plan not found
            return false;
        }

        // Update the plan
        $plan->update($data);

        return $plan;
    }

    public function deletePlan($planId)
    {
        // Find the plan
        $plan = Plan::find($planId);

        if (!$plan) {
            // Plan not found
            return false;
        }

        // Delete the plan
        $plan->delete();

        return true;
    }
}

