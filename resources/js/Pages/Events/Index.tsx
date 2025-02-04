import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head } from '@inertiajs/react'
import { QrCode } from 'lucide-react'
import React, { lazy, Suspense, useState } from 'react'
const QRModal = lazy(() => import("./QRModal"));

export default function Index() {
  
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Authenticated>
          <Head title="Dashboard" />
          <div className="main-content app-content">
            <div className="container-fluid">
              {/* <!-- Start::page-header --> */}
             <Breadcrumb
             items={[
                { label: 'Home', href: '/' },
                { label: 'Events', href: '/events' },
                { label: 'All', active: true }
              ]}
              />
             
             
        
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-12 col-span-12">
                  <div className="box">
                    <div className="box-header justify-between">
                      <div className="box-title"> Events </div>
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
                              <th scope="col" className="text-center">NR.</th>
                              <th scope="col">NAME</th>
                              <th scope="col">Created</th>
                              <th scope="col">Status</th>
                              <th scope="col">Expires</th>
                              <th scope="col">QR Code</th>
                              <th scope="col">Data</th>
                              <th scope="col">GALLERY</th>
                              <th scope="col">Overlays</th>
                              <th scope="col">Salary</th>
                              <th scope="col">Manage</th>			
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-defaultborder dark:border-defaultborder/10">
                            <td>
                                <span className="text-primary text-[14px]">#520</span>
                              </td>
                              <td>
                                <div className="flex items-center">
                                  <div className="flex-1 flex-between pos-relative ms-2">
                                    <div className="">
                                      <a href="javascript:void(0);" className="text-[13px] font-medium">Richard Dom</a>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className=""> 2025-01-23 </td>
                              
                              
                              <td>
                              <span className="badge bg-success/10 text-success leading-none">Active</span>
                              </td>
                              <td>
                                <span className="">Backend</span>
                              </td>
                              <td>
                                <div onClick={() => setModalOpen(true)} className="cursor-pointer">
                                <QrCode />
                                </div>
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

              <Suspense fallback={""}>
              <QRModal open={modalOpen} setOpen={setModalOpen} />
             </Suspense>
            
            </div>
          </div>
        </Authenticated>
  )
}
