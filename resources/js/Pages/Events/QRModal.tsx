
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Download, Printer } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

function QRModal({
    open,
    setOpen,
    QRData
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    QRData: any
}) {
    const downloadQR = () => {
        const link = document.createElement('a');
        link.download = `${QRData?.slug}.png`;
        link.href = QRData?.path;
        link.click();
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] top-[15%] translate-y-0">
                <DialogHeader className="border-b">
                    <DialogTitle className="card-title">Activate Event</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="flex justify-center items-center">
                <QRCodeSVG
                    value={QRData?.slug}
                    title={"Title for my QR Code"}
                    size={128}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    minVersion={6}
                    />
                </div>
                <div className="box-body">
                <ul className="mb-0 list-none hire-list">
                    <li>
                    <div className="flex items-center">
                        <button onClick={window.print} type="button" aria-label="anchor" className="me-2">
                        <span className="avatar avatar-lg bg-primary/10 !text-primary"><Printer /></span>
                        </button>
                        <div className="flex-auto truncate">
                        <a href="#!" className="font-medium text-[14px] w-75 truncate block"> Event Name</a>
                        <p className="text-textmuted dark:text-textmuted/50 mb-0 text-xs w-75 truncate">Event: <span className="text-success">NR</span>
                        </p>
                        </div>
                        <div className=" text-end ms-auto">
                        <div className="text-textmuted dark:text-textmuted/50 opacity-70 text-xs">{QRData?.name}</div>
                        <div className="font-medium">#{QRData?.id}</div>
                        </div>
                    </div>
                     <p className="text-center mt-2 text-textmuted dark:text-textmuted/50 mb-0 text-xs">Scan this code on your device to activate your event.</p>
                    </li>
                </ul>
                </div>
                <Button onClick={() => setOpen(false)} className=" ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white btn-wave  waves-effect waves-light">Dismiss</Button>
            </DialogContent>
        </Dialog>
    );
}

export default QRModal
