import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Footer from '@/Shared/Footer';
import Header from '@/Shared/Header';
import Sidebar from '@/Shared/Sidebar';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <div className="page">
       
        <Header/>
        {/* <!-- /app-header --> */}
        {/* <!-- Start::app-sidebar --> */}

        <Sidebar/>
       
        {/* <!-- End::app-sidebar --> */}
        {/* <!-- Start::app-content --> */}
        <div className="main-content app-content">
          <div className="container-fluid">
            {/* <!-- Start::page-header --> */}
            <div className="flex items-center justify-between page-header-breadcrumb flex-wrap gap-2">
              <div>
                <nav>
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <a href="javascript:void(0);"> Dashboards </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">HRM</li>
                  </ol>
                </nav>
                <h1 className="page-title font-medium text-lg mb-0">HRM</h1>
              </div>
              <div className="btn-list">
                <button type="button" className="ti-btn bg-white dark:bg-bodybg border border-defaultborder dark:border-defaultborder/10 btn-wave !my-0 waves-effect waves-light">
                  <i className="ri-filter-3-line align-middle me-1 leading-none"></i> Filter </button>
                <button type="button" className="ti-btn ti-btn-primary !border-0 btn-wave me-0 waves-effect waves-light">
                  <i className="ri-share-forward-line me-1"></i> Share </button>
              </div>
            </div>
            {/* <!-- End::page-header --> */}
            {/* <!-- Start:: row-1 --> */}
            <div className="grid grid-cols-12 gap-x-6">
              <div className="xxl:col-span-3 xl:col-span-6 col-span-12">
                <div className="box overflow-hidden">
                  <div className="m-4 bg-light rounded-sm border border-defaultborder dark:border-defaultborder/10">
                    <div className="box-body pb-4 mb-2">
                      <div className="flex items-center w-full justify-between gap-1">
                        <div>
                          <p className="mb-1 text-textmuted dark:text-textmuted/50 font-medium">Total Employees</p>
                          <h4 className="mb-0 font-medium">12,116</h4>
                        </div>
                        <div className="ms-auto text-end">
                          <span className="badge bg-success rounded-full items-center text-[11px] inline-flex">
                            <i className="ri-arrow-left-up-line text-[11px] me-1"></i> 2.5% </span>
                          <div className="text-textmuted dark:text-textmuted/50 text-xs mt-1">Increased from last year</div>
                        </div>
                      </div>
                    </div>
                    <div id="employees" style={{minHeight: 50 + 'px'}}>
                      <div id="apexchartsxevl76j4h" className="apexcharts-canvas apexchartsxevl76j4h apexcharts-theme-" style={{width: 352 + 'px', height: 50 +'px'}}>
                       {/* ApexChart here */}
                        <div className="apexcharts-tooltip apexcharts-theme-light">
                          <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-0" style={{order: '1'}}>
                            <span className="apexcharts-tooltip-marker" style={{backgroundColor: 'rgba(var(--primary-rgb))'}}></span>
                            <div className="apexcharts-tooltip-text" style={{fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 12 + 'px'}}>
                              <div className="apexcharts-tooltip-y-group">
                                <span className="apexcharts-tooltip-text-y-label"></span>
                                <span className="apexcharts-tooltip-text-y-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-goals-group">
                                <span className="apexcharts-tooltip-text-goals-label"></span>
                                <span className="apexcharts-tooltip-text-goals-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-z-group">
                                <span className="apexcharts-tooltip-text-z-label"></span>
                                <span className="apexcharts-tooltip-text-z-value"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                          <div className="apexcharts-yaxistooltip-text"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-3 xl:col-span-6 col-span-12">
                <div className="box">
                  <div className="m-4 bg-light rounded-sm border border-defaultborder dark:border-defaultborder/10">
                    <div className="box-body pb-4 mb-2">
                      <div className="flex items-center w-full justify-between gap-1">
                        <div>
                          <p className="mb-1 text-textmuted dark:text-textmuted/50 font-medium">Total Job Applied</p>
                          <h4 className="mb-0 font-medium">15,784</h4>
                        </div>
                        <div className="ms-auto text-end">
                          <span className="badge bg-danger rounded-full items-center text-[11px] inline-flex">
                            <i className="ri-arrow-left-down-line text-[11px] me-1"></i> 1.5% </span>
                          <div className="text-textmuted dark:text-textmuted/50 text-xs mt-1">Decreased from last year</div>
                        </div>
                      </div>
                    </div>
                    <div id="job-applied" style={{ minHeight: 50 + 'px'}} className="">
                      <div id="apexchartsvy25o462" className="apexcharts-canvas apexchartsvy25o462 apexcharts-theme-" style={{width: 352 + 'px', height: 50 + 'px'}}>
                      {/* ApexChart here */}
                        <div className="apexcharts-tooltip apexcharts-theme-light">
                          <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-0" style={{order: '1'}}>
                            <span className="apexcharts-tooltip-marker" style={{backgroundColor: 'rgb(227, 84, 212)'}}></span>
                            <div className="apexcharts-tooltip-text" style={{fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 12 + 'px' }}>
                              <div className="apexcharts-tooltip-y-group">
                                <span className="apexcharts-tooltip-text-y-label"></span>
                                <span className="apexcharts-tooltip-text-y-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-goals-group">
                                <span className="apexcharts-tooltip-text-goals-label"></span>
                                <span className="apexcharts-tooltip-text-goals-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-z-group">
                                <span className="apexcharts-tooltip-text-z-label"></span>
                                <span className="apexcharts-tooltip-text-z-value"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                          <div className="apexcharts-yaxistooltip-text"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-3 xl:col-span-6 col-span-12">
                <div className="box">
                  <div className="m-4 bg-light rounded-sm border border-defaultborder dark:border-defaultborder/10">
                    <div className="box-body pb-4 mb-2">
                      <div className="flex items-center w-full justify-between gap-1">
                        <div>
                          <p className="mb-1 text-textmuted dark:text-textmuted/50 font-medium">Total Compensation</p>
                          <h4 className="mb-0 font-medium">$56,784</h4>
                        </div>
                        <div className="ms-auto text-end">
                          <span className="badge bg-success rounded-full items-center text-[11px] inline-flex">
                            <i className="ri-arrow-left-up-line text-[11px] me-1"></i> 6.0% </span>
                          <div className="text-textmuted dark:text-textmuted/50 text-xs mt-1">Increased from last year</div>
                        </div>
                      </div>
                    </div>
                    <div id="total-payouts" style={{minHeight: 50 + 'px'}}>
                      <div id="apexcharts5d7871w9" className="apexcharts-canvas apexcharts5d7871w9 apexcharts-theme-" style={{width: 352 + 'px', height: 50 + 'px'}}>
                        {/* ApexChart here */}
                        <div className="apexcharts-tooltip apexcharts-theme-light">
                          <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-0" style={{order: '1'}}>
                            <span className="apexcharts-tooltip-marker" style={{backgroundColor: 'rgb(255, 93, 159)'}}></span>
                            <div className="apexcharts-tooltip-text" style={{fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 12 + 'px' }}>
                              <div className="apexcharts-tooltip-y-group">
                                <span className="apexcharts-tooltip-text-y-label"></span>
                                <span className="apexcharts-tooltip-text-y-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-goals-group">
                                <span className="apexcharts-tooltip-text-goals-label"></span>
                                <span className="apexcharts-tooltip-text-goals-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-z-group">
                                <span className="apexcharts-tooltip-text-z-label"></span>
                                <span className="apexcharts-tooltip-text-z-value"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                          <div className="apexcharts-yaxistooltip-text"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-3 xl:col-span-6 col-span-12">
                <div className="box">
                  <div className="m-4 bg-light rounded-sm border border-defaultborder dark:border-defaultborder/10">
                    <div className="box-body pb-4 mb-2">
                      <div className="flex items-center w-full justify-between gap-1">
                        <div>
                          <p className="mb-1 text-textmuted dark:text-textmuted/50 font-medium">Annual Compensation </p>
                          <h4 className="mb-0 font-medium">$6.8k</h4>
                        </div>
                        <div className="ms-auto text-end">
                          <span className="badge bg-success rounded-full items-center text-[11px] inline-flex">
                            <i className="ri-arrow-left-up-line text-[11px] me-1"></i> 6.0% </span>
                          <div className="text-textmuted dark:text-textmuted/50 text-xs mt-1">Increased from last year</div>
                        </div>
                      </div>
                    </div>
                    <div id="gross-salary" style={{minHeight: 50 + 'px'}} className="">
                      <div id="apexchartsivyu5id6i" className="apexcharts-canvas apexchartsivyu5id6i apexcharts-theme-" style={{width: 352 + 'px', height: 50 + 'px'}}>
                        {/* Apexcharts here */}
                        <div className="apexcharts-tooltip apexcharts-theme-light">
                          <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-0" style={{order: '1'}}>
                            <span className="apexcharts-tooltip-marker" style={{backgroundColor: 'rgb(255, 142, 111)'}}></span>
                            <div className="apexcharts-tooltip-text" style={{fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 12 + 'px'}}>
                              <div className="apexcharts-tooltip-y-group">
                                <span className="apexcharts-tooltip-text-y-label"></span>
                                <span className="apexcharts-tooltip-text-y-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-goals-group">
                                <span className="apexcharts-tooltip-text-goals-label"></span>
                                <span className="apexcharts-tooltip-text-goals-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-z-group">
                                <span className="apexcharts-tooltip-text-z-label"></span>
                                <span className="apexcharts-tooltip-text-z-value"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                          <div className="apexcharts-yaxistooltip-text"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End:: row-1 --> */}
            {/* <!-- Start:: row-2 --> */}
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
                    <ul className="flex flex-wrap mb-0 list-none gap-5 justify-around p-4 border rounded-sm border-dashed dark:border-defaultborder/10">
                      <li>
                        <div className="flex items-start justify-between gap-2">
                          <div className="leading-none me-1">
                            <span className="avatar avatar-lg avatar-rounded bg-primary/10 !text-primary">
                              <i className="ri-stack-line text-xl"></i>
                            </span>
                          </div>
                          <div>
                            <span className="block mb-0 font-medium text-textmuted dark:text-textmuted/50">New</span>
                            <h4 className="font-medium mb-0">64,241</h4>
                          </div>
                        </div>
                      </li>
                      <li className="">
                        <div className="flex items-start justify-between gap-2">
                          <div className="leading-none me-1">
                            <span className="avatar avatar-lg avatar-rounded bg-primarytint1color/10 !text-primarytint1color">
                              <i className="ri-rocket-line text-xl"></i>
                            </span>
                          </div>
                          <div>
                            <span className="block mb-0 font-medium text-textmuted dark:text-textmuted/50">Inprogress</span>
                            <h4 className="font-medium mb-0">1,543</h4>
                          </div>
                        </div>
                      </li>
                      <li className="">
                        <div className="flex items-start justify-between gap-2">
                          <div className="leading-none me-1">
                            <span className="avatar avatar-lg avatar-rounded bg-primarytint2color/10 !text-primarytint2color">
                              <i className="ri-check-line text-xl"></i>
                            </span>
                          </div>
                          <div>
                            <span className="block mb-0 font-medium text-textmuted dark:text-textmuted/50">Completed</span>
                            <h4 className="font-medium mb-0">3,848</h4>
                          </div>
                        </div>
                      </li>
                      <li className="">
                        <div className="flex items-start justify-between gap-2">
                          <div className="leading-none me-1">
                            <span className="avatar avatar-lg avatar-rounded bg-primarytint3color/10 !text-primarytint3color">
                              <i className="ri-time-line text-xl"></i>
                            </span>
                          </div>
                          <div>
                            <span className="block mb-0 font-medium text-textmuted dark:text-textmuted/50">Onhold</span>
                            <h4 className="font-medium mb-0">938</h4>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div id="project-analysis" style={{minHeight: 345 + 'px'}} className="">
                      <div id="apexchartswmlg6oekj" className="apexcharts-canvas apexchartswmlg6oekj apexcharts-theme-" style={{width: 1037+'px', height: 330+'px'}}>
                        {/* Apex here */}
                        <div className="apexcharts-tooltip apexcharts-theme-light">
                          <div className="apexcharts-tooltip-title" style={{fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 12+'px'}}></div>
                          <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-0" style={{order: '1'}}>
                            <span className="apexcharts-tooltip-marker" style={{ backgroundColor: 'rgba(var(--primary-rgb))'}}></span>
                            <div className="apexcharts-tooltip-text" style={{fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 12+'px'}}>
                              <div className="apexcharts-tooltip-y-group">
                                <span className="apexcharts-tooltip-text-y-label"></span>
                                <span className="apexcharts-tooltip-text-y-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-goals-group">
                                <span className="apexcharts-tooltip-text-goals-label"></span>
                                <span className="apexcharts-tooltip-text-goals-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-z-group">
                                <span className="apexcharts-tooltip-text-z-label"></span>
                                <span className="apexcharts-tooltip-text-z-value"></span>
                              </div>
                            </div>
                          </div>
                          <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-1" style={{ order: '2'}}>
                            <span className="apexcharts-tooltip-marker" style={{ backgroundColor: 'rgba(227, 84, 212, 0.4)'}}></span>
                            <div className="apexcharts-tooltip-text" style={{fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 12+'px' }}>
                              <div className="apexcharts-tooltip-y-group">
                                <span className="apexcharts-tooltip-text-y-label"></span>
                                <span className="apexcharts-tooltip-text-y-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-goals-group">
                                <span className="apexcharts-tooltip-text-goals-label"></span>
                                <span className="apexcharts-tooltip-text-goals-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-z-group">
                                <span className="apexcharts-tooltip-text-z-label"></span>
                                <span className="apexcharts-tooltip-text-z-value"></span>
                              </div>
                            </div>
                          </div>
                          <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-2" style={{order: '3'}}>
                            <span className="apexcharts-tooltip-marker" style={{backgroundColor: 'rgba(255, 93, 159, 0.2)'}}></span>
                            <div className="apexcharts-tooltip-text" style={{fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 12+'px'}}>
                              <div className="apexcharts-tooltip-y-group">
                                <span className="apexcharts-tooltip-text-y-label"></span>
                                <span className="apexcharts-tooltip-text-y-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-goals-group">
                                <span className="apexcharts-tooltip-text-goals-label"></span>
                                <span className="apexcharts-tooltip-text-goals-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-z-group">
                                <span className="apexcharts-tooltip-text-z-label"></span>
                                <span className="apexcharts-tooltip-text-z-value"></span>
                              </div>
                            </div>
                          </div>
                          <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-3" style={{order: '4'}}>
                            <span className="apexcharts-tooltip-marker" style={{backgroundColor: 'rgba(255, 142, 111, 0.1)'}}></span>
                            <div className="apexcharts-tooltip-text" style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 12+'px'}}>
                              <div className="apexcharts-tooltip-y-group">
                                <span className="apexcharts-tooltip-text-y-label"></span>
                                <span className="apexcharts-tooltip-text-y-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-goals-group">
                                <span className="apexcharts-tooltip-text-goals-label"></span>
                                <span className="apexcharts-tooltip-text-goals-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-z-group">
                                <span className="apexcharts-tooltip-text-z-label"></span>
                                <span className="apexcharts-tooltip-text-z-value"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                          <div className="apexcharts-yaxistooltip-text"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-4 col-span-12">
                <div className="box">
                  <div className="box-header justify-between">
                    <div className="box-title">Upcoming Events</div>
                    <a aria-label="anchor" href="javascript:void(0);" className="ti-btn ti-btn-sm bg-primary/10 !text-primary"> View All </a>
                  </div>
                  <div className="box-body">
                    <ul className="list-none timeline-widget1 mb-0">
                      <li className="timeline-widget-list">
                        <div className="flex items-center flex-wrap">
                          <div className="avatar avatar-xl bg-primary/10 !text-primary me-2 flex-shrink-0">
                            <div className="text-center">
                              <div className=" font-medium leading-none mb-1">02</div>
                              <div className="text-xs text-defaulttextcolor font-medium leading-none">Mon</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap flex-auto items-top justify-between flex-xl-nowrap">
                            <div className="events-width">
                              <p className="mb-1 timeline-widget-content">You have an announcement - Ipsum Est Diam Eirmod</p>
                              <p className="mb-0 text-xs leading-none text-textmuted dark:text-textmuted/50">10:00AM <span className="badge bg-primary/10 ms-2 text-primary">Announcement</span>
                              </p>
                            </div>
                            <div className="ti-dropdown hs-dropdown">
                              <a aria-label="anchor" href="javascript:void(0);" className="ti-btn ti-btn-light ti-btn-icon" data-bs-toggle="dropdown">
                                <i className="fe fe-more-vertical"></i>
                              </a>
                              <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Action</a>
                                </li>
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Another action</a>
                                </li>
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Something else here</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="timeline-widget-list">
                        <div className="flex items-center flex-wrap">
                          <div className="avatar avatar-xl bg-primarytint1color/10 !text-primarytint1color me-2 flex-shrink-0">
                            <div className="text-center">
                              <div className=" font-medium leading-none mb-1">08</div>
                              <div className="text-xs text-defaulttextcolor font-medium leading-none">Tue</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap flex-auto items-top justify-between flex-xl-nowrap">
                            <div className="events-width">
                              <p className="mb-1 timeline-widget-content ">National holiday - Vero Jayanti</p>
                              <p className="mb-0 text-xs leading-none text-textmuted dark:text-textmuted/50">
                                <span className="badge bg-warning/10 text-warning">Holiday</span>
                              </p>
                            </div>
                            <div className="ti-dropdown hs-dropdown">
                              <a aria-label="anchor" href="javascript:void(0);" className="ti-btn ti-btn-light ti-btn-icon" data-bs-toggle="dropdown">
                                <i className="fe fe-more-vertical"></i>
                              </a>
                              <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Action</a>
                                </li>
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Another action</a>
                                </li>
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Something else here</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="timeline-widget-list">
                        <div className="flex items-center flex-wrap">
                          <div className="avatar avatar-xl bg-primarytint2color/10 !text-primarytint2color me-2 flex-shrink-0">
                            <div className="text-center">
                              <div className=" font-medium leading-none mb-1">12</div>
                              <div className="text-xs text-defaulttextcolor font-medium leading-none">Wed</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap flex-auto items-top justify-between flex-xl-nowrap">
                            <div className="events-width">
                              <p className="mb-1 timeline-widget-content">John pup birthday - Team Member</p>
                              <p className="mb-2 text-xs leading-none text-textmuted dark:text-textmuted/50">09:00AM <span className="badge bg-success/10 text-success ms-2">Birthday</span>
                              </p>
                            </div>
                            <div className="ti-dropdown hs-dropdown">
                              <a aria-label="anchor" href="javascript:void(0);" className="ti-btn ti-btn-light ti-btn-icon" data-bs-toggle="dropdown">
                                <i className="fe fe-more-vertical"></i>
                              </a>
                              <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Action</a>
                                </li>
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Another action</a>
                                </li>
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Something else here</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="timeline-widget-list">
                        <div className="flex items-center flex-wrap">
                          <div className="avatar avatar-xl bg-primarytint3color/10 !text-primarytint3color me-2 flex-shrink-0">
                            <div className="text-center">
                              <div className=" font-medium leading-none mb-1">20</div>
                              <div className="text-xs text-defaulttextcolor font-medium leading-none">Thu</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap flex-auto items-top justify-between flex-xl-nowrap">
                            <div className="events-width">
                              <p className="mb-1 timeline-widget-content">National Holiday - Dolore Ipsum</p>
                              <p className="mb-0 text-xs leading-none text-textmuted dark:text-textmuted/50">
                                <span className="badge bg-warning/10 text-warning">Holiday</span>
                              </p>
                            </div>
                            <div className="ti-dropdown hs-dropdown">
                              <a aria-label="anchor" href="javascript:void(0);" className="ti-btn ti-btn-light ti-btn-icon" data-bs-toggle="dropdown">
                                <i className="fe fe-more-vertical"></i>
                              </a>
                              <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Action</a>
                                </li>
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Another action</a>
                                </li>
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Something else here</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="timeline-widget-list">
                        <div className="flex items-center flex-wrap">
                          <div className="avatar avatar-xl bg-warning/10 !text-warning me-2 flex-shrink-0">
                            <div className="text-center">
                              <div className=" font-medium leading-none mb-1">12</div>
                              <div className="text-xs text-defaulttextcolor font-medium leading-none">Wed</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap flex-auto items-top justify-between flex-xl-nowrap">
                            <div className="events-width">
                              <p className="mb-1 timeline-widget-content ">Amet sed no dolor kasd - Et Dolores Tempor Erat</p>
                              <p className="mb-0 text-xs leading-none text-textmuted dark:text-textmuted/50">04:00PM <span className="badge bg-primary/10 text-primary ms-2">Announcement</span>
                              </p>
                            </div>
                            <div className="ti-dropdown hs-dropdown">
                              <a aria-label="anchor" href="javascript:void(0);" className="ti-btn ti-btn-light ti-btn-icon" data-bs-toggle="dropdown">
                                <i className="fe fe-more-vertical"></i>
                              </a>
                              <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Action</a>
                                </li>
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Another action</a>
                                </li>
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Something else here</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="timeline-widget-list">
                        <div className="flex items-center flex-wrap">
                          <div className="avatar avatar-xl bg-secondary/10 !text-secondary me-2 flex-shrink-0">
                            <div className="text-center">
                              <div className=" font-medium leading-none mb-1">21</div>
                              <div className="text-xs text-defaulttextcolor font-medium leading-none">Fri</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap flex-auto items-top justify-between flex-xl-nowrap">
                            <div className="events-width">
                              <p className="mb-1 timeline-widget-content">John pup birthday - Team Member</p>
                              <p className="mb-2 text-xs leading-none text-textmuted dark:text-textmuted/50">09:00AM <span className="badge bg-success/10 text-success ms-2">Birthday</span>
                              </p>
                            </div>
                            <div className="ti-dropdown hs-dropdown">
                              <a aria-label="anchor" href="javascript:void(0);" className="ti-btn ti-btn-light ti-btn-icon" data-bs-toggle="dropdown">
                                <i className="fe fe-more-vertical"></i>
                              </a>
                              <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Action</a>
                                </li>
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Another action</a>
                                </li>
                                <li>
                                  <a className="ti-dropdown-item" href="javascript:void(0);">Something else here</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End:: row-2 --> */}
            {/* <!-- Start:: row-3 --> */}
            <div className="grid grid-cols-12 gap-x-6">
              <div className="xxl:col-span-5 col-span-12">
                <div className="box overflow-hidden">
                  <div className="box-header justify-between">
                    <div className="box-title">Employee's Leave</div>
                    <a href="javascript:void(0);" className="ti-btn ti-btn-sm ti-btn-light">View All</a>
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
                                  <a href="javascript:void(0);" className="text-[11px] text-textmuted dark:text-textmuted/50">Team Lead</a>
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
                                  <a href="javascript:void(0);" className="ti-btn ti-btn-icon ti-btn-sm !rounded-full ti-btn-soft-info !mb-0">
                                    <i className="ti ti-pencil"></i>
                                    <span className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm " role="tooltip" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" 
                                    style="position: fixed; inset: auto auto 0px 0px; margin: 0px; transform: translate(835px, 531px);"> Edit </span>
                                  </a>
                                </div>
                                <div className="hs-tooltip ti-main-tooltip">
                                  <a href="javascript:void(0);" className="ti-btn ti-btn-icon ti-btn-sm !rounded-full ti-btn-soft-primary2 !m-0">
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
                      <a href="javascript:void(0);" className="ti-btn ti-btn-light ti-btn-sm">View All</a>
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
                    <div className="box-title"> Gender Distribution </div>
                    <div>
                      <a href="javascript:void(0);" className="ti-btn ti-btn-light ti-btn-sm">View All</a>
                    </div>
                  </div>
                  <div className="box-body text-center mx-auto">
                    <div id="gender-chart" style={{ minHeight: '252.75px' }}>
                      <div id="apexcharts8j4x1v1c" className="apexcharts-canvas apexcharts8j4x1v1c apexcharts-theme-" style={{ width: 300+'px', height: 252.75+'px' }}>
                       {/* Apex Charts here */}
                        <div className="apexcharts-tooltip apexcharts-theme-dark">
                          <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-0" style={{order: '1'}}>
                            <span className="apexcharts-tooltip-marker" style={{backgroundColor: 'rgba(var(--primary-rgb))'}}></span>
                            <div className="apexcharts-tooltip-text" style={{fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 12 + 'px' }}>
                              <div className="apexcharts-tooltip-y-group">
                                <span className="apexcharts-tooltip-text-y-label"></span>
                                <span className="apexcharts-tooltip-text-y-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-goals-group">
                                <span className="apexcharts-tooltip-text-goals-label"></span>
                                <span className="apexcharts-tooltip-text-goals-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-z-group">
                                <span className="apexcharts-tooltip-text-z-label"></span>
                                <span className="apexcharts-tooltip-text-z-value"></span>
                              </div>
                            </div>
                          </div>
                          <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-1" style={{ order: '2'}}>
                            <span className="apexcharts-tooltip-marker" style={{backgroundColor: 'rgb(227, 84, 212)'}}></span>
                            <div className="apexcharts-tooltip-text" style={{fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 12 + 'px'}}>
                              <div className="apexcharts-tooltip-y-group">
                                <span className="apexcharts-tooltip-text-y-label"></span>
                                <span className="apexcharts-tooltip-text-y-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-goals-group">
                                <span className="apexcharts-tooltip-text-goals-label"></span>
                                <span className="apexcharts-tooltip-text-goals-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-z-group">
                                <span className="apexcharts-tooltip-text-z-label"></span>
                                <span className="apexcharts-tooltip-text-z-value"></span>
                              </div>
                            </div>
                          </div>
                          <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-2" style={{order: '3'}}>
                            <span className="apexcharts-tooltip-marker" style={{backgroundColor: 'rgb(255, 93, 159)'}}></span>
                            <div className="apexcharts-tooltip-text" style={{fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 12 + 'px'}}>
                              <div className="apexcharts-tooltip-y-group">
                                <span className="apexcharts-tooltip-text-y-label"></span>
                                <span className="apexcharts-tooltip-text-y-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-goals-group">
                                <span className="apexcharts-tooltip-text-goals-label"></span>
                                <span className="apexcharts-tooltip-text-goals-value"></span>
                              </div>
                              <div className="apexcharts-tooltip-z-group">
                                <span className="apexcharts-tooltip-text-z-label"></span>
                                <span className="apexcharts-tooltip-text-z-value"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
                        <a href="javascript:void(0);" className="ti-btn ti-btn-sm ti-btn-primary ti-dropdown-toggle hs-dropdown-toggle !m-0" data-bs-toggle="dropdown" aria-expanded="false"> Sort By <i className="ri-arrow-down-s-line align-middle ms-1"></i>
                        </a>
                        <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                          <li>
                            <a className="ti-dropdown-item" href="javascript:void(0);">New</a>
                          </li>
                          <li>
                            <a className="ti-dropdown-item" href="javascript:void(0);">Popular</a>
                          </li>
                          <li>
                            <a className="ti-dropdown-item" href="javascript:void(0);">Relevant</a>
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
                                    <a href="javascript:void(0);" className="text-[13px] font-medium">Richard Dom</a>
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
                              <a href="javascript:void(0);">richard116@demo.com</a>
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
                                  <a aria-label="anchor" href="javascript:void(0);" className="hs-tooltip-toggle ti-btn ti-btn-icon me-2 ti-btn-soft-primary !mb-0">
                                    <span className="ri-pencil-line text-[14px]"></span>
                                    <span className="hs-tooltip-content ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm dark:bg-slate-700" role="tooltip" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" 
                                    style={{ position: 'fixed', inset: 'auto auto 0px 0px', margin: '0px', transform: 'translate(1719px, 1074px)'}}> Edit </span>
                                  </a>
                                </div>
                                <div className="hs-tooltip ti-main-tooltip [--placement:top]">
                                  <a aria-label="anchor" href="javascript:void(0);" className="hs-tooltip-toggle ti-btn ti-btn-icon me-2 ti-btn-soft-danger !mb-0">
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
                              <a className="page-link" href="javascript:void(0);"> Prev </a>
                            </li>
                            <li className="page-item ">
                              <a className="page-link active" href="javascript:void(0);">1</a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="javascript:void(0);">2</a>
                            </li>
                            <li className="page-item">
                              <a className="page-link !text-primary" href="javascript:void(0);"> next </a>
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
        
        <Footer/>
      
      </div>
    );
}
