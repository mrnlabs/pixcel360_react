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

export default function Index({events} : any) {
  
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
             
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-12 col-span-12">
                  <div className="box">
                    <div className="box-header justify-between">
                      <div className="box-title"> Events <span className="text-primary">({totalItems})</span></div>
                      <div className="flex flex-wrap gap-2">
                        <Link href={route('event.create')} className="ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white !m-0 btn-wave ti-btn-sm waves-effect waves-light">
                          <SquarePlus className="align-middle" />Create </Link>
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
