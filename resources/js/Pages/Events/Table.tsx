import { Copy, Image, QrCode, SquarePen, Trash2 } from 'lucide-react'
import { format } from "date-fns";
import CustomTooltip from '@/Components/CustomTooltip';
import DuplicateModal from './DuplicateModal';
import { Suspense, useState } from 'react';
import { Toaster } from '@/Components/ui/toaster';
import ConfirmDialog from '@/Components/ConfirmDialog';
import { Link, router } from '@inertiajs/react';
import { useToast } from '@/hooks/use-toast';

export default function Table({events, setModalOpen, setQRData, setDuplicateModalOpen}: any) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [event, setEvent] = useState<{ slug: string } | null>(null);

  const { toast } = useToast();

  const handleDelete = () => {
    if(!event) return;
    router.delete(route('delete_event', event?.slug), {
      preserveScroll: true,
      onSuccess: () => {
        setDialogOpen(false);
        toast({
          title: "Success",
          description: "Event deleted successfully",
          variant: "default",
      })
      },
      onError: () => {
        setDialogOpen(false);
        toast({
          title: "Error",
          description: "Profile image updated successfully",
          variant: "destructive",
      })
      }
    })
  }
  
  return (
    <div className="table-responsive overflow-auto table-bordered-default">
    <table className="ti-custom-table text-nowrap ti-custom-table-hover">
      <thead>
        <tr className="border-b border-defaultborder dark:border-defaultborder/10">
          <th scope="col" className="text-center">NR.</th>
          <th scope="col">Event Name</th>
          <th scope="col">Created</th>
          <th scope="col">Status</th>
          <th scope="col">Expires</th>
          <th scope="col">QR Code</th>
          <th scope="col">Data</th>
          <th scope="col">GALLERY</th>
          <th scope="col">Overlays</th>
          <th scope="col">Manage</th>			
        </tr>
      </thead>
      <tbody>
        {events.length <= 0 && (
          <tr>
            <td colSpan={10} className="text-center">No events found</td>
          </tr>
        ) }
        {events.map((event: any) => (
            <tr key={event.id} className="border-b border-defaultborder dark:border-defaultborder/10">
            <td>
                <span className="text-primary text-[14px]">#{event.id}</span>
              </td>
              <td>
                <div className="flex items-center">
                  <div className="flex-1 flex-between pos-relative ms-2">
                    <div className="">
                      <a href="javascript:void(0);" className="text-[13px] font-medium">{event.name}</a>
                    </div>
                  </div>
                </div>
              </td>
              <td className=""> { format(new Date(event.created_at), 'dd-MM-yyyy')} </td>
              
              
              <td>
                {event.status == 1 ? (
                  <span className="badge bg-success/10 text-success leading-none">Active</span>
                )
                :
                 (
                  <span className="badge bg-warning/10 text-warning leading-none">Inactive</span>
                 )}
              
              </td>
              <td>
                <span className="">{ event.end_date ? format(new Date(event.end_date), 'dd-MM-yyyy') : '-'}</span>
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
              <td>
                <span className="badge bg-success/10 text-success leading-none">Active</span>
              </td>
              <td>
                <Link href={route('gallery',event.slug)}><span><Image/></span></Link>
              </td>
              <td>
                <span className="font-medium">$15,000</span>
              </td>
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
                    }
                    } aria-label="anchor" className="hs-tooltip-toggle ti-btn ti-btn-icon me-2 ti-btn-soft-danger !mb-0">
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
              <Toaster />
              <ConfirmDialog 
                message="Are you sure you want to remove this event ?"
                dialogOpen={dialogOpen} 
                setDialogOpen={setDialogOpen}
                onContinue={handleDelete}
             />
        </Suspense>
  </div>
  )
}
