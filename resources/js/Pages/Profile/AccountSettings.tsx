import React from 'react'
import ProfileImage from './ProfileImage'
import { Input } from '@/Components/ui/input'

export default function AccountSettings() {
  return (
    <div className="tab-pane show active overflow-hidden p-0 border-0" id="account-pane" role="tabpanel">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-1">
            <div className="font-semibold block text-[15px]">Account Settings :</div>
            <div className="ti-btn ti-btn-primary ti-btn-sm">
              <i className="ri-loop-left-line leading-none me-2"></i>Restore Changes
            </div>
          </div>
          <div className="grid grid-cols-12 sm:gap-x-6 gap-y-3">
              <ProfileImage/>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="firstname" className="form-label">First Name :</label>
              <Input type="text" className="form-control" id="firstname" value="" placeholder="Enter Name"/>
            </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="firstname" className="form-label">First Name :</label>
              <Input type="text" className="form-control" id="firstname" value="" placeholder="Enter Name"/>
            </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="profile-email" className="form-label">Email :</label>
              <input type="email" className="form-control" id="profile-email" value="" placeholder="Enter Email"/>
            </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="profile-designation" className="form-label">Designation :</label>
              <input type="text" className="form-control" id="profile-designation" value="" placeholder="Enter Designation"/>
            </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="profile-language" className="form-label">Language :</label>
              <div className="choices" data-type="select-one" tabIndex={0} role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false">
                <div className="choices__inner">
                  <select className="form-control choices__input" data-trigger="" id="profile-language" tabIndex={-1} data-choice="active">
                    <option value="Us English" data-custom-properties="[object Object]">Us English</option>
                  </select>
                  <div className="choices__list choices__list--single">
                    <div className="choices__item choices__item--selectable" data-item="" data-id="1" data-value="Us English" data-custom-properties="[object Object]" aria-selected="true">Us English</div>
                  </div>
                </div>
             
              </div>
            </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="profile-phn-no" className="form-label">Phone No :</label>
              <input type="text" className="form-control" id="profile-phn-no" value="" placeholder="Enter Number" />
            </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="website" className="form-label">Website :</label>
              <input type="text" className="form-control !bg-light dark:!bg-light" id="website" placeholder="https://" value="https://www.website.com" />
            </div>
            <div className="xl:col-span-12 col-span-12">
              <label htmlFor="profile-address" className="form-label">Address :</label>
              <textarea className="form-control" id="profile-address" rows={3} placeholder="Address"></textarea>
            </div>
          </div>
        </div>
  )
}
