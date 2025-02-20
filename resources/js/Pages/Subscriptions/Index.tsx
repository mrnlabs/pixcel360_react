import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head } from '@inertiajs/react'
import React from 'react'
import SubscriptionCard from './SubscriptionCard'

export default function Index({subscriptions}: any) {
  return (
    <Authenticated>
        <Head title="Dashboard" />
          <div className="main-content app-content">
            <div className="container-fluid">
             <Breadcrumb
             items={[
                { label: 'Home', href: '/' },
                { label: 'Subscriptions', href: '/subscriptions' },
                { label: 'All', active: true }
              ]}
              />
        <div className="grid grid-cols-12 gap-x-6">
            {subscriptions?.map((subscription: any) => (
                <SubscriptionCard key={subscription.id} subscription={subscription} />
            ))}
                
        </div>
        </div>
        </div>
    </Authenticated>
  )
}
