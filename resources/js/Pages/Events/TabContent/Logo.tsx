import React, { useState, useRef, Suspense } from 'react';
import { Trash2, Upload } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import ConfirmDialog from '@/Components/ConfirmDialog';
import InputError from '@/Components/InputError';
import showToast from '@/utils/showToast';
import { EventProps } from '@/types';

export default function Logo({ event }: EventProps ) {
  const {errors } = usePage().props;
  // @ts-ignore
  const user = usePage().props.auth.user;
  const profile_placeholder = usePage().props.profile_placeholder;

  const [dialogOpen, setDialogOpen] = useState(false);

  const [preview, setPreview] = useState(event?.setting?.app_logo ? event?.setting?.app_logo : profile_placeholder);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('error', 'Please select an image file.', {position: 'bottom-right'});
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

   
    const formData = new FormData();
    formData.append('logo', file);

    setUploading(true);
    
    router.post(route('event.update.vedio.logo.image', event?.slug), formData, {
      forceFormData: true,
      onSuccess: () => {
        setUploading(false);
        showToast('success', 'Profile image updated successfully!', {position: 'bottom-right'});
      },
      onError: () => {
        setUploading(false);
        showToast('error', 'Something went wrong!', {position: 'bottom-right'});
        setPreview(profile_placeholder);
      },
      onFinish: () => {
        setUploading(false);
      },
    });
  };

  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setPreview(profile_placeholder);
    
    router.delete(route('remove_logo_image', event?.slug), {
      onSuccess: () => {
        setUploading(false);
        showToast('success', 'Gallery logo removed successfully!', {position: 'bottom-right'});
      },
      onError: () => {
        setUploading(false);
        showToast('error', 'Something went wrong!', {position: 'bottom-right'});
    }
    });
  };

  return (
    <div className="xl:col-span-12 col-span-12">
      <div className="flex items-start flex-wrap gap-4">
        <div>
          <span className="avatar avatar-xxl">
            <img 
            // @ts-ignore
              src={preview} 
              alt="Profile"
              className={uploading ? 'opacity-50' : ''}
            />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            )}
          </span>
        </div>
        <div>
          <span className="font-medium block mb-2">Upload Gallery Logo</span>
          <div className="btn-list mb-1">
            <label 
              htmlFor="logo-image" 
              className={`ti-btn ti-btn-sm bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white btn-wave waves-effect waves-light ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Upload size={16} className="me-1" />
              Change Gallery Logo 
              <input
                type="file"
                name="logo-image"
                id="logo-image"
                hidden
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/jpeg,image/png,image/jpg"
                disabled={uploading || !preview}
              />
            </label>
            {user?.photo && (
             <button 
             type="button" 
             className={`ti-btn ti-btn-sm ti-btn-soft-primary1 btn-wave waves-effect waves-light ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
             onClick={() => setDialogOpen(true)}
             disabled={uploading || !event?.setting?.app_logo}
           >
             <Trash2 size={16} className="me-1"/>
             Remove 
           </button>
            )}
          </div>
          <span className="block text-xs text-textmuted dark:text-textmuted/50">
            Use JPEG, PNG, or JPG. Best size: 200x200 pixels. Keep it under 5MB
            </span>
            <InputError message={errors.photo} className="mt-2" />
        </div>
      </div>
      
      <Suspense fallback={""}>
              <ConfirmDialog 
                message="Are you sure you want to remove your profile photo ?"
                dialogOpen={dialogOpen} 
                setDialogOpen={setDialogOpen}
                onContinue={handleRemove}
             />
        </Suspense>
    </div>
  );
}