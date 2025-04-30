import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head, Link, router } from '@inertiajs/react'
import { Copy, QrCode, SquarePen, SquarePlus, Trash2 } from 'lucide-react'
import React, { lazy, Suspense, useState } from 'react'
import Table from './Table'
import DuplicateModal from './DuplicateModal'
import { Filters, QueryParams } from '@/types'
const QRModal = lazy(() => import("./QRModal"));
// @ts-expect-error
import { debounce } from 'lodash';
import { Input } from '@/Components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select'
import Paginator from '@/Shared/Paginator'
import { AuthGuard } from '@/guards/authGuard'

export default function Index({events, active_events_count} : any) {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [QRData, setQRData] = useState(null);


  const totalItems = events?.original?.pagination?.total;
  const itemsPerPage = events?.original?.pagination?.per_page;
  const currentPage = events?.original?.pagination?.current_page;


  const handlePageChange  = (page: number) => {
   router.get(route('events'), {page}, {
    preserveState: true,
    replace: true
   })
  }

  const [filters, setFilters] = useState({
    search: '',
    sort: ''
});

const updateFilters = React.useCallback(
  debounce((newFilters: Partial<Filters>) => {
    const queryParams: QueryParams = {};
    
    const updatedFilters = { ...filters, ...newFilters };
    
    Object.keys(updatedFilters).forEach(key => {
      if (updatedFilters[key as keyof Filters]) {
        queryParams[key] = updatedFilters[key as keyof Filters] as string;
      }
    });

    router.get(route('events'), queryParams, {
      preserveState: true,
      replace: true
    });

    // Update local state with merged filters
    setFilters(updatedFilters);
  }, 300),
  [filters]
);

  return (
    <Authenticated>
          <Head title="Events" />
          <div className="main-content app-content">
            <div className="container-fluid">
             <Breadcrumb
             items={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Events', href: '/events' },
                { label: 'All', active: true }
              ]}
              />
                <div className="row">
                <div className="col-xl-12">
                  <div className="box flex ml-4"> 
                    <h6 className=" mt-6 ml-4">
                    My events
                    </h6>
                    <span className='mb-4 ml-4'><span className='text-danger'>*</span> The gallery of an event is deleted 
                      <span className='text-primary'> six months </span> 
                       after creation. Backup your data before the indicated date.</span>
                  </div>
                </div>
          
        </div>
             
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-12 col-span-12">
                  <div className="box">
                    <div className="box-header justify-between">
                      <div className="box-title"> 
                        Total Events: <span className="text-primary">{totalItems}</span>
                        <span className="ml-6">Active License Slots: <span className='text-primary'>{4 - active_events_count}/4</span></span>
                        </div>
                      <div className="flex flex-wrap gap-2">
                        <AuthGuard roles={["Account Owner"]} 
                            permissions={["*"]}
                            requireAll={true}
                            >
                          <Link href={route('event.create')} className="ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white !m-0 btn-wave ti-btn-sm waves-effect waves-light">
                          <SquarePlus className="align-middle" />Create Event
                          </Link>
                          </AuthGuard>
                        <div>
                          <Input 
                          onChange={(e) => updateFilters({ search: e.target.value })}
                          className="form-control form-control-sm" type="search" placeholder="Search Events" aria-label=".form-control-sm example"/>
                        </div>
                        <div className="ti-dropdown hs-dropdown">
                          <Select onValueChange={(e) => updateFilters({ sort: e })}>
                          <SelectTrigger className="w-[180px] form-control">
                            <SelectValue placeholder="Sort By"></SelectValue>
                          </SelectTrigger>
                          <SelectContent className='form-control'>
                            <SelectGroup>
                              <SelectLabel>Sort By</SelectLabel>
                              <SelectItem className='cursor-pointer' value="latest">Latest</SelectItem>
                              <SelectItem className='cursor-pointer' value="oldest">Oldest</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        </div>
                      </div>
                    </div>
                    <div className="box-body">
                      <Table 
                      setModalOpen={setModalOpen} 
                      setDuplicateModalOpen={setDuplicateModalOpen}
                      events={events?.original?.data}
                      setQRData={setQRData}
                       />
                    </div>
                    <div className="box-footer">
                    <Paginator
                      totalItems={totalItems}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                      showingText="Displaying"
                      maxVisiblePages={5}
                    />
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
