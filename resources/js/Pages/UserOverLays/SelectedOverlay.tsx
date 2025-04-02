import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head, useForm } from '@inertiajs/react'
import React, { Suspense, useState } from 'react'
import UserOverLayModal from './UserOverLayModal'
import showToast from '@/utils/showToast'
import { checkPNGTransparency } from '@/utils/checkPNGTransparency'
import { CropperRef, Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/themes/classic.css';

export default function SelectedOverlay({ overlayPreset }: any) {
  const { data, setData, post, processing, errors, reset } = useForm({
    pngFile: null as File | string | null,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [userOverlay, setUserOverlay] = useState<string | null>(null);
  const [presetDimensions, setPresetDimensions] = useState<{width: number, height: number}>(
    { width: JSON.parse(overlayPreset.dimensions).width || 0,
      height: JSON.parse(overlayPreset.dimensions).height || 0 
    });

  const handleSubmit = () => {
    post(route('user.overlays.store'), {
      preserveState: true,
      onSuccess: (response: any) => {
        // Assuming the response contains the path to the saved overlay
        if (response?.overlay?.path) {
          setUserOverlay(response.overlay.path);
        }
        setModalOpen(false);
        setData('pngFile', null);
        showToast('success', 'Overlay uploaded successfully', {position: 'bottom-right'});
        reset();
      },
      onError: () => {
        showToast('error', 'Something went wrong', {position: 'bottom-right'});
      }
    });
  }

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const isPngFile = (file: File) => {
      return file.type === 'image/png';
  };

  const handleFileRemove = () => {
    setData('pngFile', null);
    setSelectedFile(null);
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
        console.log(`Image dimensions: ${width}x${height}`);
        
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
            setSelectedFile(file);
            setUserOverlay(url);
            console.log('img', img);
        });
        
    };
    
    img.onerror = () => {
        showToast('error', 'Failed to load image.', {position: 'bottom-right'});
        URL.revokeObjectURL(url);
    };
    
    img.src = url;
};
  
const onChange = (cropper: CropperRef) => {
  console.log(cropper.getCoordinates(), cropper.getCanvas());
};
  return (
    <Authenticated>
      <Head title="Manage Overlay" />
      <div className="main-content app-content">
        <div className="container-fluid">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/dashboard' },
              { label: 'Events', href: '/events' },
              { label: 'Overlay', active: true }
            ]}
          />
          
          <div className="grid grid-cols-12 gap-x-6">
            <div className="xl:col-span-12 col-span-12">
              <div className="box">
                <div className="box-body">
                  <div className="flex items-center flex-wrap gap-2 justify-between">
                    <div className="flex items-center">
                      <span className="font-medium text-[1rem] me-2">Overlays</span>
                      {overlayPreset && (
                  <div className="mt-2 text-sm text-gray-500 text-center">
                    Preset dimensions: {presetDimensions.width}px × {presetDimensions.height}px
                  </div>
                )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => setModalOpen(true)} 
                        aria-label="button" 
                        type="button" 
                        className="ti-btn ti-btn-primary ti-btn-sm"
                      >
                        Upload Overlay
                      </button>
                      
                      
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-6">
                {/* Display area for the preset and user overlay */}
                <div className="relative inline-block">
                  {/* Preset frame */}
                  {overlayPreset?.path && (
                    <div className="max-h-[90%] overflow-hidden">
                    <img 
                      src={overlayPreset.path} 
                      className="img-fluid inline-flex" 
                      alt="Preset Frame" 
                      style={{width: presetDimensions.width, height: presetDimensions.height}}
                    />
                    </div>
                  )}
                  
                   {/* User's overlay on top of preset */}
                   {userOverlay && (
                  <img 
                    src={userOverlay} 
                    className="absolute user-overlay top-0 left-0 w-full h-full object-contain z-10" 
                    alt="Your Overlay"
                    onError={(e) => {
                      console.error('Failed to load overlay image', e);
                      setUserOverlay(null);
                    }}
                  />
                )}                         
                    {/* Fallback if no overlay is selected */}
                    {!userOverlay && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 dark:bg-gray-800/50">
                        <p className="text-gray-500">Your overlay will appear here</p>
                      </div>
                    )}
                </div>
                
               
              </div>
              
            </div>
          </div>
          
          <Suspense fallback={""}>
            <UserOverLayModal
              data={data}
              setData={setData}
              open={modalOpen}
              setOpen={setModalOpen}
              overlay={overlayPreset}
              handleSubmit={handleSubmit}
              processing={processing}
              handleFileRemove={handleFileRemove}
              handleFileSelect={handleFileSelect}
              selectedFile={selectedFile}
            />
          </Suspense>
        </div>
      </div>
    </Authenticated>
  )
}