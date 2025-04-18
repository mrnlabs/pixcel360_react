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

function AdminOverLayModal({
    open,
    setOpen,
    overlay,
    handleSubmit,
    data,
    setData,
    processing
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    overlay?: Plan | null,
    handleSubmit: () => void,
    data: any,
    setData: (field: string, value: any) => void,
    processing: boolean
}) {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    
    const isPngFile = (file: File) => {
        return file.type === 'image/png';
    };

    const handleFileSelect = (files: File[]) => {
        if (!files[0]) { 
            showToast('error', 'Please select a png file.', {position: 'bottom-right'});
            return;
        }
    
        const file = files[0];
    
        // First check if it's a PNG file
        if (!isPngFile(file)) { 
            showToast('error', 'Please select a valid PNG file.', {position: 'bottom-right'});
            return;
        }
    
        // Create an image object to get dimensions
        const img = new Image();
        const url = URL.createObjectURL(file);
        
        img.onload = () => {
            // Get width and height here
            const width = img.width;
            const height = img.height;
            setDimensions({ width, height });
            
            // You can use these dimensions as needed
            // For example, store them in state or validate them
            
            // Now check transparency
            checkPNGTransparency(file).then((hasTransparency) => {
                if (!hasTransparency) {
                    showToast('error', 'Please select a png file with transparency.', {position: 'bottom-right'});
                    setData('pngFile', null);
                    setSelectedFile(null);
                    return;
                }
                
                // If everything is okay, set the file
                setData('pngFile', file);
                setData('dimensions', { width, height });
                setSelectedFile(file);
            });
            
            // Clean up the object URL
            URL.revokeObjectURL(url);
        };
        
        img.onerror = () => {
            showToast('error', 'Failed to load image.', {position: 'bottom-right'});
            URL.revokeObjectURL(url);
        };
        
        img.src = url;
    };

    const handleFileRemove = () => {
        setData('pngFile', null);
        setSelectedFile(null);
    };
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
                                    <input
                                        type="text"
                                        placeholder="Overlay Name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="form-control mb-3"
                                        />
                                <FileUpload
                                   iconType="image"
                                   dropzoneText="Drag and drop a PNG file here or click to browse"
                                    onFilesSelected={handleFileSelect}
                                    onFileRemove={handleFileRemove}
                                    multiple={false}
                                    acceptedTypes={['image/png']}
                                    maxSize={2 * 1024 * 1024} // 2MB
                                    showPreview={false} 
                                />
                                <div className="flex-1 mt-1">
                                    <span className="text-sm flex font-medium">{selectedFile?.name}
                                        <CustomTooltip content="Remove">
                                        <span>
                                            {selectedFile?.name && <Trash2 onClick={handleFileRemove} className='ml-2 text-danger cursor-pointer' size={16}/>}
                                            
                                            </span>
                                            
                                        </CustomTooltip>
                                     </span>
                                     <div>Dimensions: {dimensions ? dimensions.width + ' x ' + dimensions.height : ''}</div>
                                </div>
                                </div>
                                <Button onClick={handleSubmit} disabled={processing} className="w-full ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white btn-wave waves-effect waves-light">
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

export default AdminOverLayModal