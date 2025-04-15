<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use App\Models\IssueCategory;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class IssueCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Event Creation',
                'slug' => 'event-creation',
            ],
            [
                'name' => 'Subscriptions/Payment',
                'slug' => 'subscription-payment',
            ],
            [
                'name' => 'Event Activation/QR Code',
                'slug' => 'event-activation',
            ],
            [
                'name' => 'Mobile App',
                'slug' => 'mobile-app',
            ],
            [
                'name' => 'General',
                'slug' => 'general',
            ],
            [
                'name' => 'Other',
                'slug' => 'other',
            ],
        ];

        foreach ($categories as $category) {
            IssueCategory::create($category);
        }
    }
}
