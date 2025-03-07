import React, { useState, useRef, Suspense } from 'react';
import { Trash2, Upload } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import ConfirmDialog from '@/Components/ConfirmDialog';
import InputError from '@/Components/InputError';
import showToast from '@/utils/showToast';

export default function ProfileImage() {
  const {errors } = usePage().props;
  // @ts-ignore
  const user = usePage().props.auth.user;

  const [dialogOpen, setDialogOpen] = useState(false);

  const [preview, setPreview] = useState(user?.photo ? user?.photo : 'https://picxel-bucket.s3.af-south-1.amazonaws.com/placeholders/profile_placeholder.jpg');
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
    formData.append('photo', file);

    setUploading(true);
    
    router.post('/update-profile-picture', formData, {
      forceFormData: true,
      onSuccess: () => {
        setUploading(false);
        showToast('success', 'Profile image updated successfully!', {position: 'bottom-right'});
      },
      onError: () => {
        setUploading(false);
        showToast('error', 'Something went wrong!', {position: 'bottom-right'});
        setPreview('https://picxel-bucket.s3.af-south-1.amazonaws.com/placeholders/profile_placeholder.jpg');
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
    setPreview('https://picxel-bucket.s3.af-south-1.amazonaws.com/placeholders/profile_placeholder.jpg');
    
    router.delete('/remove-profile-image', {
      onSuccess: () => {
        setUploading(false);
        showToast('success', 'Profile removed successfully!', {position: 'bottom-right'});
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
          <span className="font-medium block mb-2">Profile Picture</span>
          <div className="btn-list mb-1">
            <label 
              htmlFor="profile-image" 
              className={`ti-btn ti-btn-sm bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white btn-wave waves-effect waves-light ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Upload size={16} className="me-1" />
              Change Image 
              <input
                type="file"
                name="profile-image"
                id="profile-image"
                hidden
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/jpeg,image/png,image/gif"
                disabled={uploading || !preview}
              />
            </label>
            <button 
              type="button" 
              className={`ti-btn ti-btn-sm ti-btn-soft-primary1 btn-wave waves-effect waves-light ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => setDialogOpen(true)}
              disabled={uploading}
            >
              <Trash2 size={16} className="me-1"/>
              Remove 
            </button>
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