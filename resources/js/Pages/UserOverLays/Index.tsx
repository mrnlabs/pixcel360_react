import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head, router, useForm } from '@inertiajs/react'
import { Loader } from 'lucide-react'
import React, { Suspense, useEffect, useState } from 'react';
import VideoCard from './UserOverLayCard';
import { EventProps, Filters, QueryParams } from '@/types';
// @ts-expect-error
import { debounce } from 'lodash';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select';
import showToast from '@/utils/showToast';
import UserOverLayCard from './UserOverLayCard';
import UserOverLayModal from './UserOverLayModal';

export default function Index({ adminOverlays=[], isAdmin} : any) {

  const [modalOpen, setModalOpen] = useState(false);
  const [overlay, setOverlay] = useState<any>(null);

  const [activeOverlay, setActiveOverlay] = useState<any>(null);
  const [showPresets, setShowPresets] = useState(false);


  const [overlays, setOverlays] = useState(adminOverlays);

  const handleOverlaySelect = (overlay: any) => {
    setActiveOverlay(overlay);
  };

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

    router.get(route('admin.overlays.index'), queryParams, {
      preserveState: true,
      replace: true
    });

    // Update local state with merged filters
    setFilters(updatedFilters);
  }, 300),
  [filters]
);

const handleSubmit = () => {
  post(route('user.overlays.store'), {
    preserveState: true,
    onSuccess: () => {
      setModalOpen(false);
      setData('pngFile', null);
      showToast('success', 'Overlay uploaded successfully', {position: 'bottom-right'});
      reset();
    },
    onError: () => {
      showToast('error', 'Something went wrong', {position: 'bottom-right'});
    }
  });
}

const togglePresets = () => {
  setShowPresets(!showPresets);
};

const handleDeleteSelected = () => {
  if (activeOverlay) {
    if(!window.confirm('Are you sure you want to delete this overlay?')) return;
    router.delete(route('user.overlays.destroy', activeOverlay.id), {
      preserveState: true,
      onSuccess: () => {
        showToast('success', 'Overlay deleted successfully', {position: 'bottom-right'});
      },
      onError: () => {
        showToast('error', 'Something went wrong', {position: 'bottom-right'});
      }
    });
  }
}

  return (
    <Authenticated>
          <Head title="Overlays" />
          <div className="main-content app-content">
            <div className="container-fluid">
             <Breadcrumb
             items={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Choose Overlay', active: true }
              ]}
              />
        
    
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
        <Suspense fallback={<Loader className="align-middle animate-spin"/>}>
              
                 {overlays?.data?.map((overlay: any) => ( 
                  <UserOverLayCard 
                    isAdmin={isAdmin}
                    key={overlay.id}
                    setModalOpen={setModalOpen}
                    overlay={overlay}
                    isActive={activeOverlay?.id === overlay.id}
                    onSelect={handleOverlaySelect}
                  />
               ))}

              {/* <UserOverLayModal 
              data={data}
                 setData={setData}
                  open={modalOpen} 
                  setOpen={setModalOpen} 
                  overlay={overlay}
                  handleSubmit={handleSubmit}
                  processing={processing}
                  
                /> */}

              </Suspense>
      </div>
              {!adminOverlays.data?.length && <div className="text-center">No overlays found.</div>}
            </div>
          </div>
        </Authenticated>
  )
}
