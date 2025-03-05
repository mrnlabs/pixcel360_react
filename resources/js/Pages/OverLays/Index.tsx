import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head, router, useForm } from '@inertiajs/react'
import { Loader } from 'lucide-react'
import React, { Suspense, useState } from 'react';
import VideoCard from './OverLayCard';
import { EventProps, Filters, QueryParams } from '@/types';
// @ts-expect-error
import { debounce } from 'lodash';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select';
import OverLayCard from './OverLayCard';
import OverLayModal from './OverLayModal';
import showToast from '@/utils/showToast';

export default function Index({overlays=[]} : any) {

  const [modalOpen, setModalOpen] = useState(false);
  const [overlay, setOverlay] = useState(null);

  const [filters, setFilters] = useState({
    search: '',
    sort: ''
});

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    pngFile: null as File | string | null,
});

const updateFilters = React.useCallback(
  debounce((newFilters: Partial<Filters>) => {
    const queryParams: QueryParams = {};
    
    // Merge new filters with existing filters
    const updatedFilters = { ...filters, ...newFilters };
    
    // Add non-empty filter values to query params
    Object.keys(updatedFilters).forEach(key => {
      if (updatedFilters[key as keyof Filters]) {
        queryParams[key] = updatedFilters[key as keyof Filters] as string;
      }
    });

    router.get(route('admin.overlays.store'), queryParams, {
      preserveState: true,
      replace: true
    });

    // Update local state with merged filters
    setFilters(updatedFilters);
  }, 300),
  [filters]
);

const handleSubmit = () => {
  post(route('admin.overlays.store'), {
    preserveState: true,
    onSuccess: () => {
      setModalOpen(false);
      setData('pngFile', null);
      reset();
    },
    onError: () => {
      showToast('error', 'Something went wrong', {position: 'bottom-right'});
    }
  });
}


  return (
    <Authenticated>
          <Head title="Pixcel360 - Overlays" />
          <div className="main-content app-content">
            <div className="container-fluid">
             <Breadcrumb
             items={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Overlays', active: true }
              ]}
              />
        
        <div className="row">
          <div className="col-xl-12">
            <div className="box">
              <div className="box-body p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
               <button onClick={() => setModalOpen(true)} className='ti-btn ti-btn-primary !m-0 btn-wave ti-btn-sm waves-effect waves-light'>Upload New Overlay</button>
                  <div className="flex" role="search">
                    <Input 
                    onChange={(e) => updateFilters({ search: e.target.value })} className="form-control me-2" type="search" placeholder="Search Video" aria-label="Search"/>
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
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Suspense fallback={<Loader className="align-middle animate-spin"/>}>
              
                 {overlays?.data?.map((overlay: any) => ( 
                  <OverLayCard 
                    key={overlay.id}
                    setModalOpen={setModalOpen}
                    overlay={overlay}
                    
                  />
               ))}

              <OverLayModal 
              data={data}
                 setData={setData}
                  open={modalOpen} 
                  setOpen={setModalOpen} 
                  overlay={overlay}
                  handleSubmit={handleSubmit}
                  processing={processing}
                />

              </Suspense>
      </div>
              {!overlays?.data?.length && <div className="text-center">No overlays found.</div>}
            </div>
          </div>
        </Authenticated>
  )
}
