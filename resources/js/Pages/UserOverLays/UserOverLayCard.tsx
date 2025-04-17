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
      router.get(route('user.overlays.display_selected_overlay', {
        overlay: overlay.id,
        event: window.location.href.split('?')[1].split('=')[1]
      }));
    }
  }
  
  const handleCardClick = () => {
    // if (onSelect) {
    //   onSelect(overlay);
    // }
    if (overlay) {
      router.get(route('user.overlays.display_selected_overlay', {
        overlay: overlay.id,
        event: window.location.href.split('?')[1].split('=')[1]
      }));
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
            className="object-fill h-full card-img-top cursor-pointer" 
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
          <h6 className="font-medium mb-3 text-center">{overlay?.name}({JSON.parse(overlay?.dimensions)?.width} x {JSON.parse(overlay?.dimensions)?.height})</h6>
          <div className='text-center'>
              <button 
                onClick={setAsTemplate} 
                className={`ti-btn ${isActive ? 'ti-btn-primary' : 'ti-btn-outline-primary'} ti-btn-wave w-full btn-wave font-medium waves-effect waves-light table-icon`}
              >
                Select this template
                             </button>
          
          </div>
        </div>
      </div>
    </div>
  )
}