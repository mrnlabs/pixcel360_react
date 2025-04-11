import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import HeaderCard from './HeaderCard';
import { Breadcrumb } from '@/Shared/Breadcrumb';
import { DashboardProps } from '@/types';
import DBarChart from '../Charts/DBarChart';
import showToast from '@/utils/showToast';
import { Suspense, useEffect } from 'react';
import { Loader } from 'lucide-react';
import EventCard from './EventCard';
import UserHeaderCard from './UserHeaderCard';

export default function UserDashboard({ metrics: { metrics, userAnalytics },events }: DashboardProps) {
  // @ts-ignore
  const user = usePage().props.auth.user;

  useEffect(() => {
    // Parse the current URL
    const url = new URL(window.location.href);
    const success = url.searchParams.get('success');
    
    if (success) {
      showToast('success', `Welcome back ${user.firstname } ${user.lastname }`, {position: 'top-right'});
      
      const timeoutId = setTimeout(() => {
        url.searchParams.delete('success');
        
        window.history.replaceState({}, '', url.toString());
      }, 5000);
      
      return () => clearTimeout(timeoutId);
    }
  }, []); 


    return (
        <AuthenticatedLayout>
          <Head title="Dashboard" />
          <div className="main-content app-content">
            <div className="container-fluid">
              <div className="flex items-center justify-between page-header-breadcrumb flex-wrap gap-2">
              <Breadcrumb
              items={[
                  { label: 'Dashboard', href: '/dashboard' },
                  { label: 'Metrics', active: true }
                ]}
              />
                
              </div>
             
                 <UserHeaderCard 
                //  @ts-ignore
                   metrics={metrics}
                 />

              <div className="grid grid-cols-12 gap-x-6 col-span-12">
                <div className="xxl:col-span-8 col-span-12">
                <div style={{minHeight: 345 + 'px'}} className="">
                  {/* <Suspense fallback={<Loader className='mr-2 h-4 w-4 animate-spin'/>}>
                        <DBarChart 
                        // @ts-ignore
                        userAnalytics={userAnalytics}/>
                        </Suspense> */}
                </div>
                </div>
                {/* <Suspense fallback={<Loader className='mr-2 h-4 w-4 animate-spin'/>}>
                    <EventCard events={events} />
                 </Suspense> */}
                
              </div>
          
            
            </div>
          </div>
        </AuthenticatedLayout>
        
    );
}
