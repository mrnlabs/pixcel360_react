import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Breadcrumb } from '@/Shared/Breadcrumb';
import showToast from '@/utils/showToast';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';
import { Download, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

export default function AllOverlays({overlays,event}: any) {
    const [loading, setLoading] = useState(false);
    const handleDownload = async (path: string) => {
        try {
            // Request a pre-signed URL from your backend
            const response = await axios.get(route('get.signed.download.url'), { params: { path } });
            
            // Use the pre-signed URL which includes Content-Disposition header
            window.location.href = response.data.download_url;
        } catch (error) {
            console.error('Error generating download URL:', error);
        }
    }

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this overlay?')) {
            router.delete(route('user.overlays.destroy', id), {
                data: {
                    eventId: event?.id
                },
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    overlays.filter((overlay: any) => overlay.id !== id);
                     showToast('success', 'Overlay deleted successfully!', {position: 'bottom-right'});
                },
                onError: () => {
                    showToast('error', 'Error deleting overlay', {position: 'bottom-right'});
                }
            });
        }
    }

  return (
    <Authenticated>
      <Head title="Manage Overlay" />
      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/dashboard' },
              { label: 'Events', href: '/events' },
              { label: 'Overlay', active: true }
            ]}
          />
          
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xl:col-span-12 col-span-12">
              <div className="box">
                <div className="box-body ticky top-0 z-20 bg-white dark:bg-gray-900">
                  <div className="flex items-center flex-wrap gap-2 justify-between">
                    <div className="flex items-center space-x-3">
                   
                  <div className="w-full sm:w-auto text-sm text-gray-500 text-center">
                  </div>
               
                    </div>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-3 sm:mt-0">
                      <Link href={route('user.overlays',{event: event?.slug})} 
                        aria-label="button" 
                        role="link" 
                        className="w-full ti-btn ti-btn-primary ti-btn-sm"
                      >
                        Upload Overlay
                      </Link>
                      
                      
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-x-6">
       {
        overlays?.length > 0 ? (
            overlays?.map((overlay: any) => (
                <div key={overlay.id} className="col-span-12 md:col-span-3">
            <div className="box">
                <div className="box-body">
                <img src={overlay?.path} className="card-img mb-3 max-h-[360px]" alt="..." />
                <div className="flex justify-between">
                <h6 className="box-title font-medium mb-3 mt-1 cursor-pointer">
                  <Download className='text-primary' onClick={() => handleDownload(overlay.path)}/> 
                </h6>
                <h6 className="box-title font-medium mb-3 cursor-pointer" onClick={() => handleDelete(overlay.id)}>
                <span className="badge float-end text-[10px]">
                    <Trash2  className='text-red-500'/>
                </span>
                </h6>
                </div>
                </div>
            </div>
            </div>
            ))
        ) : (
            <div className="xl:col-span-12 lg:col-span-12 md:col-span-12 col-span-12">
                        <div className="text-center">{loading ? 'Loading...' : 'No overlays found'}</div>
          </div>
        )
                    
       }
    </div>
                </div>
              </div>
              
              
              
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  )
}
