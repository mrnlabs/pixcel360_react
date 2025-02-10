
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
                        <a aria-label="anchor" href="javascript:void(0);" className="me-2">
                        <span className="avatar avatar-lg bg-primary/10 !text-primary">UD</span>
                        </a>
                        <div className="flex-auto truncate">
                        <a href="javascript:void(0);" className="font-medium text-[14px] w-75 truncate block"> Event Name</a>
                        <p className="text-textmuted dark:text-textmuted/50 mb-0 text-xs w-75 truncate">Event: <span className="text-success">NR</span>
                        </p>
                        </div>
                        <div className=" text-end ms-auto">
                        <div className="text-textmuted dark:text-textmuted/50 opacity-70 text-xs">{QRData?.name}</div>
                        <div className="font-medium">#{QRData?.id}</div>
                        </div>
                    </div>
                    </li>
                </ul>
                </div>
                <Button onClick={() => setOpen(false)} className=" ti-btn ti-btn-primary btn-wave  waves-effect waves-light">Dismiss</Button>
            </DialogContent>
        </Dialog>
    );
}

export default QRModal
