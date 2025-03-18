import { Copy, Image, Layers, QrCode, SquarePen, Trash2 } from 'lucide-react'
import { format } from "date-fns";
import CustomTooltip from '@/Components/CustomTooltip';
import React, { Suspense, useState, useEffect } from 'react';
import ConfirmDialog from '@/Components/ConfirmDialog';
import { Link, router } from '@inertiajs/react';
import { useToast } from '@/hooks/use-toast';
import showToast from '@/utils/showToast';
import { AuthGuard } from '@/guards/authGuard';

export default function Table({events, setModalOpen, setQRData, setDuplicateModalOpen}: any) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [event, setEvent] = useState<{ slug: string } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 1024); // Consider tablet and mobile (<1024px)
    };
    
    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);
    
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  const handleDelete = () => {
    if(!event) return;
    router.delete(route('delete_event', event?.slug), {
      preserveScroll: true,
      onSuccess: () => {
        setDialogOpen(false);
        showToast('success', 'Event deleted successfully!', {position: 'bottom-right'});
      },
      onError: () => {
        setDialogOpen(false);
        showToast('error', 'Something went wrong!', {position: 'bottom-right'});
      }
    })
  }

  // Mobile/Tablet card view
  if (isMobile) {
    return (
      <div className="grid grid-cols-1 gap-4 px-2">
        {events.length <= 0 && (
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            No events found
          </div>
        )}
        
        {events.map((event: any) => (
          <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-defaultborder dark:border-defaultborder/10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-primary text-[14px] font-medium">#{event.id}</span>
              <div className="flex space-x-2">
                {event.status == 1 ? (
                  <span className="badge bg-success/10 text-success leading-none px-2 py-1 text-xs">Active</span>
                ) : (
                  <span className="badge bg-warning/10 text-warning leading-none px-2 py-1 text-xs">Inactive</span>
                )}
              </div>
            </div>
            
            <h3 className="text-[15px] font-semibold mb-2">{event.name}</h3>
            
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Created</p>
                <p>{format(new Date(event.created_at), 'dd-MM-yyyy')}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">Expires</p>
                <p>{event.end_date ? format(new Date(event.end_date), 'dd-MM-yyyy') : '-'}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <div className="flex space-x-4">
                <div 
                  onClick={() => {
                    setModalOpen(true)
                    setQRData(event)
                  }} 
                  className="flex flex-col items-center cursor-pointer">
                  <QrCode size={18} />
                  <span className="text-xs mt-1">QR Code</span>
                </div>
                
                <Link href={route('gallery', event.slug)} className="flex flex-col items-center">
                  <Image size={18} />
                  <span className="text-xs mt-1">Gallery</span>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100 dark:border-gray-700">
              <Link 
                href={route('event.edit', event.slug)} 
                className="ti-btn ti-btn-icon ti-btn-soft-primary !mb-0"
              >
                <SquarePen size={16} />
              </Link>
              
              <div 
                onClick={() => {
                  setDuplicateModalOpen(true)
                  setQRData(event)
                }} 
                className="ti-btn ti-btn-icon ti-btn-soft-primary !mb-0"
              >
                <Copy size={16} />
              </div>
              
              <div 
                onClick={() => {
                  setDialogOpen(true)
                  setEvent(event)
                }}
                className="ti-btn ti-btn-icon ti-btn-soft-danger !mb-0"
              >
                <Trash2 size={16} />
              </div>
            </div>
          </div>
        ))}
        
        <Suspense fallback={""}>
          <ConfirmDialog 
            message="Are you sure you want to remove this event?"
            dialogOpen={dialogOpen} 
            setDialogOpen={setDialogOpen}
            onContinue={handleDelete}
          />
        </Suspense>
      </div>
    );
  }

  // Desktop table view
  return (
    <div className="table-responsive overflow-auto table-bordered-default">
      <table className="ti-custom-table text-nowrap ti-custom-table-hover">
        <thead>
          <tr className="border-b border-defaultborder dark:border-defaultborder/10">
            <th scope="col" className="text-center">NR.</th>
            <th scope="col">Event Name</th>
            <th scope="col">Start Date</th>
            <th scope="col">Status</th>
            <th scope="col">Expires</th>
            <th scope="col">QR Code</th>
            {/* <th scope="col">Data</th> */}
            <th scope="col">GALLERY</th>
            <AuthGuard 
                roles={["Account Owner"]} permissions={["*"]}
                requireAll={true}>
                <th scope="col">Overlays</th>
           </AuthGuard>
            
            <th scope="col">Manage</th>			
          </tr>
        </thead>
        <tbody>
          {events.length <= 0 && (
            <tr>
              <td colSpan={10} className="text-center">No events found</td>
            </tr>
          )}
          {events.map((event: any) => (
            <tr key={event.id} className="border-b border-defaultborder dark:border-defaultborder/10">
              <td>
                <span className="text-primary text-[14px]">#{event.id}</span>
              </td>
              <td>
                <div className="flex items-center">
                  <div className="flex-1 flex-between pos-relative ms-2">
                    <div className="">
                      <a href="#!" className="text-[13px] font-medium">{event.name}</a>
                    </div>
                  </div>
                </div>
              </td>
              <td className=""> {event.start_date ? format(new Date(event.start_date), 'dd-MM-yyyy') : '-'} </td>
              <td>
                {event.status == 1 ? (
                  <span className="badge bg-success text-white leading-none">Active</span>
                ) : (
                  <span className="badge bg-danger text-white leading-none">Inactive</span>
                )}
              </td>
              <td>
                <span className="">{event.end_date ? format(new Date(event.end_date), 'dd-MM-yyyy') : '-'}</span>
              </td>
              <td>
                <div 
                  onClick={() => {
                    setModalOpen(true)
                    setQRData(event)
                  }} 
                  className="cursor-pointer">
                  <QrCode />
                </div>
              </td>
              {/* <td>
                <span className="badge bg-success/10 text-success leading-none">Active</span>
              </td> */}
              <td>
                <Link href={route('gallery',event.slug)}><span><Image/></span></Link>
              </td>
              
                <AuthGuard roles={["Account Owner"]} permissions={["*"]}>
                <td>
                  <Link href={route('user.overlays',event.slug)}><span className="font-medium cursor-pointer"><Layers /></span></Link>
                  </td>
                </AuthGuard>
              
              
              <td>
                <div className="btn-list">
                  <div className="hs-tooltip ti-main-tooltip">
                    <CustomTooltip content="Edit">
                      <Link href={route('event.edit', event.slug)} aria-label="anchor" className="hs-tooltip-toggle ti-btn ti-btn-icon me-2 ti-btn-soft-primary !mb-0">
                        <SquarePen className="text-[14px]" />
                      </Link>
                    </CustomTooltip>
                  </div>
                  <div className="hs-tooltip ti-main-tooltip">
                    <CustomTooltip content="Duplicate">
                      <div 
                        onClick={() => {
                          setDuplicateModalOpen(true)
                          setQRData(event)
                        }} 
                        aria-label="anchor" className="hs-tooltip-toggle ti-btn ti-btn-icon me-2 ti-btn-soft-primary !mb-0">
                        <Copy className="text-[14px]" />
                      </div>
                    </CustomTooltip>
                  </div>
                  <div className="hs-tooltip ti-main-tooltip">
                    <div onClick={() => {
                      setDialogOpen(true)
                      setEvent(event)
                    }} 
                      aria-label="anchor" className="hs-tooltip-toggle ti-btn ti-btn-icon me-2 ti-btn-soft-danger !mb-0">
                      <Trash2 className="text-[14px]" />
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Suspense fallback={""}>
        <ConfirmDialog 
          message="Are you sure you want to remove this event ?"
          dialogOpen={dialogOpen} 
          setDialogOpen={setDialogOpen}
          onContinue={handleDelete}
        />
      </Suspense>
    </div>
  );
}