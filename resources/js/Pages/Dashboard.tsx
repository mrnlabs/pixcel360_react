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
              {/* <!-- End:: row-2 --> */}
              {/* <!-- Start:: row-3 --> */}
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-5 col-span-12">
                  <div className="box overflow-hidden">
                    <div className="box-header justify-between">
                      <div className="box-title">Employee's Leave</div>
                      <a href="#!" className="ti-btn ti-btn-sm ti-btn-light">View All</a>
                    </div>
                    <div className="box-body p-0">
                      <div className="table-responsive">
                        <table className="ti-custom-table ti-custom-table-head">
                          <thead>
                            <tr className="border-b border-defaultborder dark:!border-defaultborder/10">
                              <th scope="col">Employee</th>
                              <th scope="col">Type</th>
                              <th scope="col">Days</th>
                              <th scope="col">Status</th>
                              <th scope="col">Start Date</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="">
                            <tr className="border-b !border-defaultborder dark:!border-defaultborder/10">
                              <td>
                                <div className="flex items-center">
                                  <span className="avatar avatar-sm">
                                    <img src="../assets/images/faces/2.jpg" className="" alt=""/>
                                  </span>
                                  <div className="flex-1 ms-2">
                                    <p className="mb-0 text-xs font-medium">Socrates Itumay</p>
                                    <a href="#!" className="text-[11px] text-textmuted dark:text-textmuted/50">Team Lead</a>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span className="">Sick</span>
                              </td>
                              <td>
                                <span className="">2 Days</span>
                              </td>
                              <td>
                                <span className="badge bg-success/10 text-success">Approved</span>
                              </td>
                              <td>
                                <span className="text-xs">30-05-2024</span>
                              </td>
                              <td>
                                {/* <div className="btn-list">
                                  <div className="hs-tooltip ti-main-tooltip">
                                    <a href="#!" className="ti-btn ti-btn-icon ti-btn-sm !rounded-full ti-btn-soft-info !mb-0">
                                      <i className="ti ti-pencil"></i>
                                      <span className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm " role="tooltip" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" 
                                      style="position: fixed; inset: auto auto 0px 0px; margin: 0px; transform: translate(835px, 531px);"> Edit </span>
                                    </a>
                                  </div>
                                  <div className="hs-tooltip ti-main-tooltip">
                                    <a href="#!" className="ti-btn ti-btn-icon ti-btn-sm !rounded-full ti-btn-soft-primary2 !m-0">
                                      <i className="ti ti-trash"></i>
                                      <span className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm " role="tooltip" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style="position: fixed; inset: auto auto 0px 0px; margin: 0px; transform: translate(860px, 535px);"> Delete </span>
                                    </a>
                                  </div>
                                </div> */}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-4 col-span-12">
                  <div className="box">
                    <div className="box-header justify-between">
                      <div className="box-title"> Today's Interviews </div>
                      <div>
                        <a href="#!" className="ti-btn ti-btn-light ti-btn-sm">View All</a>
                      </div>
                    </div>
                    <div className="box-body py-3">
                      <ul className="list-none mb-0 schedule-list">
                        <li>
                          <div className="flex items-center flex-wrap flex-xl-nowrap gap-1">
                            <div className="leading-none">
                              <span className="avatar avatar-md avatar-rounded p-1 bg-danger/10">
                                <img src="../assets/images/faces/15.jpg" alt=""/>
                              </span>
                            </div>
                            <div className="flex-auto ms-2">
                              <p className="font-medium mb-0">Anurag Batiya</p>
                              <p className="text-[11px] text-textmuted dark:text-textmuted/50 mb-0 text-nowrap truncate w-75">
                                <i className="ri-time-line me-1"></i>03 May(9.00am-10.00am)
                              </p>
                            </div>
                            <div className="ms-auto">
                              <button type="button" className="ti-btn bg-primary ti-btn-sm text-nowrap text-white">Call Now</button>
                            </div>
                          </div>
                        </li>
                      /
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-3 col-span-12">
                  <div className="box">
                    <div className="box-header justify-between">
                      <div className="box-title"> Site Visitors </div>
                      <div>
                        <a href="#!" className="ti-btn ti-btn-light ti-btn-sm">View All</a>
                      </div>
                    </div>
                    <div className="box-body text-center mx-auto">
                      <div style={{ minHeight: 252.75+'px' }}>
                        <DPieChart/>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>
             
            
            </div>
          </div>
        </AuthenticatedLayout>
        
    );
}
