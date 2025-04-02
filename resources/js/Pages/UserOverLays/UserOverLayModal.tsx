import CustomTooltip from "@/Components/CustomTooltip";
import FileUpload from "@/Components/FileUpload";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Plan, PlanCardProps } from "@/types";
import { checkPNGTransparency } from "@/utils/checkPNGTransparency";
import showToast from "@/utils/showToast";
import { Loader, Trash2 } from "lucide-react";
import { useState } from "react";

function UserOverLayModal({
    open,
    setOpen,
    overlay,
    handleSubmit,
    data,
    setData,
    processing,
    handleFileSelect,
    handleFileRemove,
    selectedFile
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    overlay?: Plan | null,
    handleSubmit: () => void,
    data: any,
    setData: (field: string, value: any) => void,
    processing: boolean,
    handleFileSelect: (files: File[]) => void,
    handleFileRemove: () => void,
    selectedFile: File | null
}) {

 
    

    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto top-[5%] sm:top-[10%]  translate-y-0" style={{ maxWidth: "50rem" }}>
                <DialogHeader className="border-b sticky top-0  dark:bg-gray-900 z-10">
                    <DialogTitle className="card-title">Upload Overlay</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="box-body">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-12 col-span-12">
                            <div className="box">
                                <div className="box-body">
                                <FileUpload
                                   dropzoneText="Drag and drop a PNG file here or click to browse"
                                    onFilesSelected={handleFileSelect}
                                    onFileRemove={handleFileRemove}
                                    multiple={false}
                                    acceptedTypes={['image/png']}
                                    maxSize={2 * 1024 * 1024} // 10MB
                                    showPreview={false} 
                                />
                                <div className="flex-1 mt-1">
                                    <span className="text-sm flex font-medium">{selectedFile?.name}
                                        <CustomTooltip content="Remove">
                                        <span>
                                            {selectedFile?.name && <Trash2 onClick={handleFileRemove} className='ml-2 text-danger cursor-pointer' size={16}/>}</span>
                                        </CustomTooltip>
                                     </span>
                                </div>
                                </div>
                                <Button onClick={handleSubmit} disabled={processing} className="w-full ti-btn ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white btn-wave waves-effect waves-light">
                        {processing && <Loader className="mr-2 h-4 w-4 animate-spin" />} Submit
                        </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default UserOverLayModal