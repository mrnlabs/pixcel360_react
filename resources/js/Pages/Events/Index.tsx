import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head, Link } from '@inertiajs/react'
import { Copy, QrCode, SquarePen, SquarePlus, Trash2 } from 'lucide-react'
import React, { lazy, Suspense, useState } from 'react'
import Table from './Table'
import DuplicateModal from './DuplicateModal'
const QRModal = lazy(() => import("./QRModal"));

export default function Index({events} : any) {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [QRData, setQRData] = useState(null);

  return (
    <Authenticated>
          <Head title="Dashboard" />
          <div className="main-content app-content">
            <div className="container-fluid">
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
                      <div className="flex flex-wrap gap-2">
                        <Link href={route('event.create')} className="ti-btn ti-btn-primary !m-0 btn-wave ti-btn-sm waves-effect waves-light">
                          <SquarePlus className="align-middle" />Create </Link>
                        <div>
                          <input className="form-control form-control-sm" type="text" placeholder="Search Here" aria-label=".form-control-sm example"/>
                        </div>
                        <div className="ti-dropdown hs-dropdown">
                          <a href="javascript:void(0);" className="ti-btn ti-btn-primary !m-0 ti-btn-sm btn-wave waves-effect waves-light" data-bs-toggle="dropdown" aria-expanded="false"> Sort By <i className="ri-arrow-down-s-line align-middle ms-1 inline-block"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="box-body">
                      <Table 
                      setModalOpen={setModalOpen} 
                      setDuplicateModalOpen={setDuplicateModalOpen}
                      events={events}
                      setQRData={setQRData}
                       />
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
              <QRModal open={modalOpen} setOpen={setModalOpen} QRData={QRData}/>
              <DuplicateModal open={duplicateModalOpen} setDuplicateModalOpen={setDuplicateModalOpen} event={QRData}/>
             </Suspense>
            
            </div>
          </div>
        </Authenticated>
  )
}
