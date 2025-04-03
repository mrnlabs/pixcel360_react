import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head, useForm } from '@inertiajs/react'
import React, { Suspense, useState } from 'react'
import UserOverLayModal from './UserOverLayModal'
import showToast from '@/utils/showToast'
import { checkPNGTransparency } from '@/utils/checkPNGTransparency'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/ui/command'
import { cn } from '@/lib/utils'
import { Button } from '@/Components/ui/button'

import ConfirmOverlayUploadDialog from './ConfirmOverlayUploadDialog'

export default function SelectedOverlay({ overlayPreset, events, overlaysLength }: any) {
  const { data, setData, post, processing, errors, reset } = useForm({
    pngFile: null as File | string | null,
    event_id: null as string | null,
    apply_to_all: false
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [userOverlay, setUserOverlay] = useState<string | null>(null);
  const [presetDimensions, setPresetDimensions] = useState<{width: number, height: number}>(
    { width: JSON.parse(overlayPreset.dimensions).width || 0,
      height: JSON.parse(overlayPreset.dimensions).height || 0 
    });

 const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
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
    // dismiss modal
    setModalOpen(false)
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
        });
        
    };
    
    img.onerror = () => {
        showToast('error', 'Failed to load image.', {position: 'bottom-right'});
        URL.revokeObjectURL(url);
    };
    
    img.src = url;
};
  


  const handleSubmit = () => {
    if (!overlayPreset) {
      showToast('error', 'Please select an overlay preset.', {position: 'bottom-right'});
      return;
    }
    if(!selectedFile) {
      showToast('error', 'Please select an overlay image.', {position: 'bottom-right'});
      return;
    }
    if (!value) {
      showToast('error', 'Please select an event.', {position: 'bottom-right'});
      return;
    }
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
                <div className="box-body ticky top-0 z-20 bg-white dark:bg-gray-900">
                  <div className="flex items-center flex-wrap gap-2 justify-between">
                    <div className="flex items-center space-x-3">
                    <Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className=" sm:w-[200px] justify-between rounded-md border border-[#ecf3fb]"
    >
      {value
        ? events.find((event: any) => event.name === value)?.name
        : "Select event..."}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="sm:w-[200px] p-0">
    <Command>
      <CommandInput placeholder="Search events..." />
      <CommandList>
        <CommandEmpty>No events found.</CommandEmpty>
        <CommandGroup>
          {events.map((event: any) => (
            <CommandItem
              key={event.slug}
              value={event.name}
              onSelect={(currentValue) => {
                //get event by curent value
                const event = events.find((event: any) => event.name === currentValue);
                setData('event_id', event.slug);
                setValue(currentValue === value ? "" : currentValue)
                setOpen(false)
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === event.name ? "opacity-100" : "opacity-0"
                )}
              />
              {event.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>
                      {overlayPreset && (
                  <div className="w-full sm:w-auto text-sm text-gray-500 text-center">
                    <Button disabled={!data.pngFile || !value || processing}
                       onClick={overlaysLength > 0 ? () => setDialogOpen(true) : handleSubmit}
                     className='w-full ti-btn ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white ti-btn-lg'>
                      Add to Event</Button>
                  </div>
                )}
                    </div>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-3 sm:mt-0">
                      <button 
                        onClick={() => setModalOpen(true)} 
                        aria-label="button" 
                        type="button" 
                        className="w-full ti-btn ti-btn-primary ti-btn-sm"
                      >
                        Upload Overlay
                      </button>
                      
                      
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-6">
                {/* Display area for the preset and user overlay */}
                <div className="relative inline-block" onClick={() => setModalOpen(true)}>
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
         
          <ConfirmOverlayUploadDialog
            setData={setData}
            message="Checking this option will preserve your existing overlays, allowing for selecting multiple overlays during the event."
            dialogOpen={dialogOpen} 
            setDialogOpen={setDialogOpen}
            onContinue={handleSubmit}
          />
          </Suspense>
        </div>
      </div>
    </Authenticated>
  )
}