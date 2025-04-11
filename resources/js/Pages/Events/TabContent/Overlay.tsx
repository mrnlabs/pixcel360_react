import { EventProps } from '@/types'
import showToast from '@/utils/showToast';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import { Download, DownloadCloud, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'

export default function Overlay({event} : EventProps) {
    const [overlays, setOverlays] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getOverlays();
    }, [event]);

    const getOverlays = () => {
        setLoading(true);
        axios.get(route('user.overlays.get_event_overlays', event?.slug), { params: { eventId: event?.id } })
            .then(response => {
                console.log(response.data);
                setOverlays(response.data.overlays);
                setLoading(false);
            })
            .catch(error => {

                setLoading(false);
            });
    }
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
                    setOverlays(overlays);
                     showToast('success', 'Overlay deleted successfully!', {position: 'bottom-right'});
                },
                onError: () => {
                    showToast('error', 'Error deleting overlay', {position: 'bottom-right'});
                }
            });
        }
    }
  return (
    
    <div className="grid grid-cols-12 gap-x-6">
        <Head title="Event Overlays" />
       {
        overlays?.length > 0 ? (
            overlays?.map((overlay: any) => (
                <div key={overlay.id} className="xl:col-span-6 lg:col-span-6 md:col-span-6 col-span-12">
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
  )
}
