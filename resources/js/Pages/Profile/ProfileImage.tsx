import React from 'react'

export default function ProfileImage() {
  return (
    <div className="xl:col-span-12 col-span-12">
    <div className="flex items-start flex-wrap gap-4">
      <div>
        <span className="avatar avatar-xxl">
          <img src="profile_placeholder.jpg" alt=""/>
        </span>
      </div>
      <div>
        <span className="font-medium block mb-2">Profile Picture</span>
        <div className="btn-list mb-1">
          <button type="button" className="ti-btn ti-btn-sm ti-btn-primary btn-wave waves-effect waves-light">
            <i className="ri-upload-2-line me-1"></i>Change Image </button>
          <button type="button" className="ti-btn ti-btn-sm ti-btn-soft-primary1 btn-wave waves-effect waves-light">
            <i className="ri-delete-bin-line me-1"></i>Remove </button>
        </div>
        <span className="block text-xs text-textmuted dark:text-textmuted/50">Use JPEG, PNG, or GIF. Best size: 200x200 pixels. Keep it under 5MB</span>
      </div>
    </div>
  </div>
  )
}
