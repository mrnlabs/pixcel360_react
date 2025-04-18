
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { useForm } from "@inertiajs/react";
import { Loader } from "lucide-react";
import { useEffect } from "react";


function DuplicateModal({
    open,
    setDuplicateModalOpen,
    event
}: {
    open: boolean
    setDuplicateModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    event: any
}) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    useEffect(() => {
        setData('name', event?.name + ' (copy)')
    }, [event])

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        post(route('duplicate_event', event?.slug), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setDuplicateModalOpen(false);
            },
        });
    };
    return (
        <Dialog open={open} onOpenChange={setDuplicateModalOpen}>
            <DialogContent className="sm:max-w-[425px] top-[15%] translate-y-0">
                <DialogHeader className="border-b">
                    <DialogTitle className="card-title">Duplicate Event</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="flex justify-center items-center">
                <div className="w-full">
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm mb-1">New event name <span className='text-red-500'>*</span></label>
                                  <Input
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    type="text"
                                    placeholder="New event name"
                                    className="w-full px-3 py-2 border rounded-lg"
                                  />
                                  <InputError message={errors.name} />
                                </div>
                              </div>
                            </div>
                </div>
                <Button 
                disabled={processing} 
                onClick={handleSubmit} className=" ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white btn-wave  waves-effect waves-light">
                    {processing && <Loader className="animate-spin mr-1" />}Continue</Button>
            </DialogContent>
        </Dialog>
    );
}

export default DuplicateModal
