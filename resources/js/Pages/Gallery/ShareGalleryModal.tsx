
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Event } from "@/types";
import { downloadQRCode } from "@/utils/downloadQRCode";
import { QRCodeSVG } from "qrcode.react";

function ShareGalleryModal({
    open,
    setOpen,
    event,
    gallery_link
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    event: Event
    gallery_link: string
}) {
   
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[535px] top-[15%] translate-y-0">
                <DialogHeader className="border-b">
                    <DialogTitle className="card-title">Share gallery: #{event?.id} - {event.setting?.gallery_name}</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="flex justify-center items-center" id="qr-code">
                <QRCodeSVG
                    value={gallery_link}
                    title={event.setting?.gallery_name ?? event.name}
                    size={128}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    minVersion={6}
                    />
                </div>
                <div className="box-body">
                    <a target="_blank" 
                    href={event.sharing_method?.whatsapp == 1 ? 'https://wa.me/?text=' + gallery_link : ''} rel={'noreferrer'} 
                    className={`ti-btn ${event.sharing_method?.whatsapp == 1 ? 'bg-success' : 'bg-[#D3D3D3]'} text-white my-1 me-2`}> 
                     Send Whatsap                     
                    </a>
                    <a target="_blank" 
                    href={event.sharing_method?.email == 1 ?'mailto:?subject=' + event.setting?.gallery_name + '&body=' + gallery_link : ''} 
                    rel={'noreferrer'} 
                    className={`ti-btn ${event.sharing_method?.email == 1 ? 'bg-primary' : 'bg-[#D3D3D3] cursor-not-allowed'} text-white my-1 me-2`}>
                        Send Email 
                    </a>
                    <button onClick={() => downloadQRCode('gallery',event)} 
                    type="button" disabled={event.sharing_method?.download == 1 ? false : true}
                    className={`ti-btn ${event.sharing_method?.download == 1 ? 'bg-secondary' : 'bg-[#D3D3D3] cursor-not-allowed'}  text-white my-1 me-2`}> 
                        Download                       
                    </button>
                </div>
                <Button onClick={() => setOpen(false)} className=" ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white btn-wave  waves-effect waves-light">Close</Button>
            </DialogContent>
        </Dialog>
    );
}

export default ShareGalleryModal
