import React from 'react'
import { router } from '@inertiajs/react';
import showToast from '@/utils/showToast';

export default function UserOverLayCard({
  overlay, 
  setModalOpen, 
  isAdmin,
  isActive = false,
  onSelect
}: {
  overlay: any,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  isActive?: boolean;
  onSelect?: (overlay: any) => void;
}) {

  const setAsTemplate = () => {
    if (overlay) {
      router.post(route('user.overlays.addOverlayToEvent', overlay.id), {
        overlayId: overlay.id,
        eventSlug: window.location.href.split('/').pop(),
      }, {
        onSuccess: () => {
          showToast('success', 'Template set successfully', {position: 'bottom-right'});
        },
        onError: () => {
          showToast('error', 'Something went wrong', {position: 'bottom-right'});
        }
      })
    }
  }
  
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(overlay);
    }
  };
  
  return (
    <div 
      className={`col hover:scale-105 transition duration-300 ${isActive ? 'ring-2 ring-primary ring-offset-2' : ''}`}
      onClick={handleCardClick}
    >
      <div className={`box ${isActive ? 'bg-gray-50' : ''}`}>
        <div className="relative">
          <img 
            src={overlay?.path} 
            className="object-fill h-80 card-img-top cursor-pointer" 
            alt={overlay?.name}
          />
          {isActive && (
            <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <div className="box-body">
          <h6 className="font-medium mb-3 text-center">{overlay?.name}</h6>
          <div className='text-center'>
            {isAdmin ? (
              <button className="ti-btn ti-btn-outline-danger ti-btn-wave w-full btn-wave font-medium waves-effect waves-light table-icon">
              Delete
              </button>
            ) : (
              <button 
                onClick={setAsTemplate} 
                className={`ti-btn ${isActive ? 'ti-btn-primary' : 'ti-btn-outline-primary'} ti-btn-wave w-full btn-wave font-medium waves-effect waves-light table-icon`}
              >
                {isActive ? 'Add to event' : 'Choose this template'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}