import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head } from '@inertiajs/react'
import React from 'react'
import SubscriptionCard from './SubscriptionCard'
import { SubscriptionCardProps } from '@/types'

export default function Index({subscriptions}: SubscriptionCardProps) {
  return (
    <Authenticated>
        <Head title="Subscriptions" />
          <div className="main-content app-content">
            <div className="container-fluid">
             <Breadcrumb
             items={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Subscriptions', href: '/subscriptions' },
                { label: 'All', active: true }
              ]}
              />
        <div className="grid grid-cols-12 gap-x-6">
        {subscriptions?.length === 0 && (
            <div className="col-span-12">
                <div className="box flex ml-4"> 
                    <p className="text-center p-4 ml-4">
                    No subscriptions found
                    </p>
                </div>
            </div>
        )}
            {subscriptions?.map((subscription: any) => (
                <SubscriptionCard key={subscription.id} subscription={subscription} />
            ))}
                
        </div>
        </div>
        </div>
    </Authenticated>
  )
}
