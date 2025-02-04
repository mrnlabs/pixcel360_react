
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";

function QRModal({
    open,
    setOpen
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
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
                    value={"https://reactjs.org/"}
                    title={"Title for my QR Code"}
                    size={128}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"M"}
                    minVersion={6}
                    />
                </div>
                <Button className="ti-btn ti-btn-primary btn-wave  waves-effect waves-light">Close</Button>
            </DialogContent>
        </Dialog>
    );
}

export default QRModal
