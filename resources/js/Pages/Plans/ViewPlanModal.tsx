import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Plan, PlanCardProps } from "@/types";
import { Loader } from "lucide-react";

function ViewPlanModal({
    open,
    setOpen,
    plan,
    handleSubscribe,
    processing
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    plan?: Plan | null,
    handleSubscribe: () => void,
    processing: boolean
}) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto top-[5%] sm:top-[10%]  translate-y-0" style={{ maxWidth: "50rem" }}>
                <DialogHeader className="border-b sticky top-0  dark:bg-gray-900 z-10">
                    <DialogTitle className="card-title">View Plan</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="box-body">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-5 col-span-12">
                            <div className="box">
                                <div className="box-body">
                                    <div className="ecommerce-gallery flex text-center">
                                        {/* <span className="badge bg-primarytint2color tag-badge">{plan?.category?.name}</span> */}
                                        <img src={plan?.photo} alt="image" className="w-full"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-7 col-span-12">
                            <div className="box">
                                <div className="box-body">
                                    <div>
                                        <p className="text-xl font-semibold mb-4">{plan?.name}</p>
                                        <div className="flex gap-4 items-center mb-3">
                                            <p className="mb-1">
                                                <span className="h2 font-semibold">${plan?.price}</span>
                                            </p>
                                            <div className="mb-0 text-textmuted dark:text-textmuted/50 text-xs">
                                                <p className="mb-0">
                                                    {plan?.interval == 'semi_annual' ? 'Every' : 'Per'}
                                                </p>
                                                <p className="mb-0 text-info font-medium text-[15px]">{plan?.interval == 'semi_annual' ? '6 months' : plan?.interval}</p>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-[15px] font-semibold mb-1">Description :</p>
                                            <p dangerouslySetInnerHTML={{__html: plan?.description ?? ''}} className="text-textmuted dark:text-textmuted/50 mb-0 text-[13px]"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" bottom-0 pt-4 pb-2 bg-white dark:bg-gray-900 z-10">
                    <Button onClick={handleSubscribe} disabled={processing} className="w-full ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] btn-wave waves-effect waves-light">
                        {processing && <Loader className="mr-2 h-4 w-4 animate-spin" />} Subscribe
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ViewPlanModal