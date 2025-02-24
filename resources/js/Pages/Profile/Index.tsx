import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head, Link } from '@inertiajs/react'
import React, { lazy, Suspense, useState } from 'react'
import AccountSettings from './AccountSettings'
import NotificationSettings from './NotificationSettings'
import SecuritySettings from './SecuritySettings'

export default function Index({user} : any) {
    const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'notification', label: 'Notification' },
    { id: 'security', label: 'Security' }
  ];
  return (
    <Authenticated>
          <Head title="Dashboard" />
          <div className="main-content app-content">
            <div className="container-fluid">
             <Breadcrumb
             items={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Profile', href: '/profile' },
                { label: 'Details', active: true }
              ]}
              />
             
             
        
             <div className="">
  <div className=" mx-auto">
    <div className="box">
      <ul className="nav nav-tabs tab-style-8 scaleX rounded m-4 profile-settings-tab gap-2 flex flex-wrap" id="myTab4" role="tablist">
      {tabs.map((tab) => (
            <li key={tab.id} className="nav-item me-1">
              <button
                type="button"
                className={`nav-link !px-6 text-primary rounded-md bg-primary/10 ${
                  activeTab === tab.id ? 'active' : ''
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
      </ul>
      <div className="p-4 border-b border-t border-dashed border-defaultborder dark:border-defaultborder/10 tab-content">

      <div className={activeTab === 'account' ? 'block' : 'hidden'}>
          <AccountSettings user={user} />
      </div>
        


      <div className={activeTab === 'notification' ? 'block' : 'hidden'}>
           <NotificationSettings />
       </div>


       <div className={activeTab === 'security' ? 'block' : 'hidden'}>
           <SecuritySettings />
          </div>
        
       
      </div>
      
    </div>
  </div>
</div>
            </div>
          </div>
        </Authenticated>
  )
}
