import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import HeaderCard from './Dashboard/HeaderCard';
import { DPieChart } from './Charts/DPieChart';
import NotificationCard from './Dashboard/NotificationCard';
import { Breadcrumb } from '@/Shared/Breadcrumb';
import { DashboardProps, PageProps } from '@/types';
import DBarChart from './Charts/DBarChart';
import showToast from '@/utils/showToast';
import { useEffect } from 'react';

export default function Dashboard({ metrics: { metrics, userAnalytics } }: DashboardProps) {
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
             
                 <HeaderCard 
                //  @ts-ignore
                   metrics={metrics}
                 />

              <div className="grid grid-cols-12 gap-x-6 col-span-12">
                <div className="xxl:col-span-8 col-span-12">
                <div style={{minHeight: 345 + 'px'}} className="">
                        <DBarChart 
                        // @ts-ignore
                        userAnalytics={userAnalytics}/>
                </div>
                </div>
                <NotificationCard/>
              </div>
          
            
            </div>
          </div>
        </AuthenticatedLayout>
        
    );
}
