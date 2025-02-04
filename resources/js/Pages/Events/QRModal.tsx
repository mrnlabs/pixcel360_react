
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";

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
                <DialogHeader>
                    <DialogTitle className="card-title">QR Modal</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                QR Modal
            </DialogContent>
        </Dialog>
    );
}

export default QRModal
