import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import HeaderCard from './Dashboard/HeaderCard';
import { DBarChart } from './Charts/DBarChart';
import { DPieChart } from './Charts/DPieChart';
import NotificationCard from './Dashboard/NotificationCard';
import { Breadcrumb } from '@/Shared/Breadcrumb';
import { PageProps } from '@/types';

export default function Dashboard({ metrics }: PageProps) {
    return (
        <AuthenticatedLayout>
          <Head title="Dashboard" />
          <div className="main-content app-content">
            <div className="container-fluid">
              {/* <!-- Start::page-header --> */}
              <div className="flex items-center justify-between page-header-breadcrumb flex-wrap gap-2">
              <Breadcrumb
             items={[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Metrics', active: true }
              ]}
              />
                
              </div>
             
                 <HeaderCard 
                 metrics={metrics}
                 />
                 
              <div className="grid grid-cols-12 gap-x-6 col-span-12">
                <div className="xxl:col-span-8 col-span-12">
                  <div className="box">
                    <div className="box-header justify-between">
                      <div className="box-title">Project Analysis</div>
                      <div className="flex gap-2">
                        <div className="ti-btn ti-btn-sm ti-btn-outline-light">Today</div>
                        <div className="ti-btn ti-btn-sm ti-btn-outline-light">Weakly</div>
                        <div className="ti-btn ti-btn-sm ti-btn-light">Yearly</div>
                      </div>
                    </div>
                    <div className="box-body pb-1">
                      <div style={{minHeight: 345 + 'px'}} className="">
                        <DBarChart/>
                      </div>
                    </div>
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
                  <div className="box">
                    <div className="box-body">
                      <ul className="flex flex-wrap mb-0 list-none justify-around text-center gap-2">
                        <li>
                          <div>
                            <div className="leading-none me-1 mb-2">
                              <span className="avatar avatar-md bg-primary/10 !text-primary border-primary/25 border-[3px] avatar-rounded">
                                <i className="ri-stack-line text-[17px] leading-none"></i>
                              </span>
                            </div>
                            <div>
                              <span className="block mb-0 text-textmuted dark:text-textmuted/50 text-xs">Attendance</span>
                              <h5 className="font-medium mb-0">4,241</h5>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div>
                            <div className="leading-none me-1 mb-2">
                              <span className="avatar avatar-md bg-primarytint1color/10 !text-primarytint1color border-primarytint1color/25 border-[3px] avatar-rounded">
                                <i className="ri-calendar-todo-line text-[17px] leading-none"></i>
                              </span>
                            </div>
                            <div>
                              <span className="block mb-0 text-textmuted dark:text-textmuted/50 text-xs">Absent</span>
                              <h5 className="font-medium mb-0">485</h5>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div>
                            <div className="leading-none me-1 mb-2">
                              <span className="avatar avatar-md bg-primarytint2color/10 !text-primarytint2color border-primarytint2color/25 border-[3px] avatar-rounded">
                                <i className="ri-time-line text-[17px] leading-none"></i>
                              </span>
                            </div>
                            <div>
                              <span className="block mb-0 text-textmuted dark:text-textmuted/50 text-xs">Late</span>
                              <h5 className="font-medium mb-0">08</h5>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- End:: row-3 --> */}
              {/* <!-- Start:: row-4 --> */}
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-12 col-span-12">
                  <div className="box">
                    <div className="box-header justify-between">
                      <div className="box-title"> Employee Directory </div>
                      <div className="flex flex-wrap">
                        <div className="me-3 my-1">
                          <input className="form-control form-control-sm" type="text" placeholder="Search Here" aria-label=" example"/>
                        </div>
                        <div className="ti-dropdown hs-dropdown my-1">
                          <a href="#!" className="ti-btn ti-btn-sm ti-btn-primary ti-dropdown-toggle hs-dropdown-toggle !m-0" data-bs-toggle="dropdown" aria-expanded="false"> Sort By <i className="ri-arrow-down-s-line align-middle ms-1"></i>
                          </a>
                          <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                            <li>
                              <a className="ti-dropdown-item" href="#!">New</a>
                            </li>
                            <li>
                              <a className="ti-dropdown-item" href="#!">Popular</a>
                            </li>
                            <li>
                              <a className="ti-dropdown-item" href="#!">Relevant</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="box-body">
                      <div className="table-responsive overflow-auto table-bordered-default">
                        <table className="ti-custom-table text-nowrap ti-custom-table-hover">
                          <thead>
                            <tr className="border-b border-defaultborder dark:border-defaultborder/10">
                              <th scope="col" className="text-center">S.No</th>
                              <th scope="col">Employee Id</th>
                              <th scope="col">Employee Name</th>
                              <th scope="col">Position</th>
                              <th scope="col">Department</th>
                              <th scope="col">Email</th>
                              <th scope="col">Status</th>
                              <th scope="col">Contact</th>
                              <th scope="col">Salary</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-defaultborder dark:border-defaultborder/10">
                              <td className="text-center"> 01 </td>
                              <td>
                                <span className="text-primary text-[14px]">#emp23520</span>
                              </td>
                              <td>
                                <div className="flex items-center">
                                  <img src="../assets/images/faces/1.jpg" className="avatar avatar-sm" alt=""/>
                                  <div className="flex-1 flex-between pos-relative ms-2">
                                    <div className="">
                                      <a href="#!" className="text-[13px] font-medium">Richard Dom</a>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span className="">Team Leader</span>
                              </td>
                              <td>
                                <span className="">Backend</span>
                              </td>
                              <td>
                                <a href="#!">richard116@demo.com</a>
                              </td>
                              <td>
                                <span className="badge bg-success/10 text-success leading-none">Active</span>
                              </td>
                              <td>
                                <span className="">+0987654321</span>
                              </td>
                              <td>
                                <span className="font-medium">$15,000</span>
                              </td>
                              <td>
                                {/* <div className="btn-list">
                                  <div className="hs-tooltip ti-main-tooltip [--placement:top]">
                                    <a aria-label="anchor" href="#!" className="hs-tooltip-toggle ti-btn ti-btn-icon me-2 ti-btn-soft-primary !mb-0">
                                      <span className="ri-pencil-line text-[14px]"></span>
                                      <span className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700" role="tooltip" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" 
                                      style={{ position: 'fixed', inset: 'auto auto 0px 0px', margin: '0px', transform: 'translate(1719px, 1074px)'}}> Edit </span>
                                    </a>
                                  </div>
                                  <div className="hs-tooltip ti-main-tooltip [--placement:top]">
                                    <a aria-label="anchor" href="#!" className="hs-tooltip-toggle ti-btn ti-btn-icon me-2 ti-btn-soft-danger !mb-0">
                                      <span className="ri-delete-bin-7-line text-[14px]"></span>
                                      <span className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700" role="tooltip" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" 
                                      style={{position: 'fixed', inset: 'auto auto 0px 0px; margin: 0px; transform: translate(1756px, 1074px)' }}> Delete </span>
                                    </a>
                                  </div>
                                </div> */}
                              </td>
                            </tr>
                            
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="box-footer">
                      <div className="flex flex-wrap items-center">
                        <div> Showing 6 Entries <i className="bi bi-arrow-right ms-2 font-medium"></i>
                        </div>
                        <div className="ms-auto">
                          <nav aria-label="Page navigation" className="pagination-style-4">
                            <ul className="ti-pagination mb-0 flex-wrap">
                              <li className="page-item disabled">
                                <a className="page-link" href="#!"> Prev </a>
                              </li>
                              <li className="page-item ">
                                <a className="page-link active" href="#!">1</a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#!">2</a>
                              </li>
                              <li className="page-item">
                                <a className="page-link !text-primary" href="#!"> next </a>
                              </li>
                            </ul>
                          </nav>
                        </div>
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
