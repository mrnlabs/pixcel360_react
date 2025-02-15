<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // Event Management
            'create events',
            'edit events',
            'delete events',
            'view events',
            
            // User Management
            'view users',
            'create users',
            'edit users',
            'delete users',
            
            // Ticket Management
            'process orders',
            'issue refunds',
            'view orders',
            
            // Content Management
            'moderate content',
            'manage reports',
            'view reports',
            
            // Staff Management
            'manage staff',
            'assign roles',
            
            // System Settings
            'manage settings',
            'view analytics',
            'manage subscriptions'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $systemAdmin = Role::create(['name' => 'System Admin']);
        $systemAdmin->givePermissionTo(Permission::all());

        $accountOwner = Role::create(['name' => 'Account Owner']);
        $accountOwner->givePermissionTo(Permission::all());

        $eventOrganizer = Role::create(['name' => 'Account Manager']);
        $eventOrganizer->givePermissionTo([
            'create events',
            'edit events',
            'delete events',
            'view events',
            'process orders',
            'view orders',
            'manage staff',
            'view analytics',
            'view reports'
        ]);

        $contentModerator = Role::create(['name' => 'Content Moderator']);
        $contentModerator->givePermissionTo([
            'moderate content',
            'manage reports',
            'view reports',
            'view events'
        ]);

        $eventStaff = Role::create(['name' => 'Event Staff']);
        $eventStaff->givePermissionTo([
            'view events',
            'process orders',
            'view orders',
            'view reports'
        ]);

        $ticketManager = Role::create(['name' => 'Account Admin']);
        $ticketManager->givePermissionTo([
            'process orders',
            'issue refunds',
            'view orders',
            'view reports'
        ]);

        $regularUser = Role::create(['name' => 'Regular User']);
        $regularUser->givePermissionTo([
            'view events'
        ]);

        $attendee = Role::create(['name' => 'Attendee']);
        $attendee->givePermissionTo([
            'view events'
        ]);

        $guest = Role::create(['name' => 'Guest']);
        $guest->givePermissionTo([
            'view events'
        ]);
    }
}