import React from 'react'

export default function SecuritySettings() {
  return (
    <div className="tab-pane show overflow-hidden p-0 border-0 " id="notification-tab-pane" role="tabpanel">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-1">
            <div className="font-semibold block text-[15px]">Notifications Settings:</div>
            <div className="ti-btn ti-btn-primary ti-btn-sm">
              <i className="ri-loop-left-line leading-none me-2"></i>Restore Changes
            </div>
          </div>
          <div className="grid grid-cols-12 sm:gap-x-6 gx-5 gap-y-3">
            <div className="xl:col-span-12 col-span-12">
              <p className="text-[14px] mb-1 font-medium">Configure Notifications</p>
              <p className="text-xs mb-0 text-textmuted dark:text-textmuted/50">Users can tailor their experience to receive alerts for the types of events that matter to them.</p>
            </div>
            <div className="xl:col-span-12 col-span-12">
              <div className="flex items-top justify-between mt-3">
                <div className="mail-notification-settings">
                  <p className="text-[14px] mb-1 font-medium">Push Notifications</p>
                  <p className="text-xs mb-0 text-textmuted dark:text-textmuted/50">Alerts sent to the user's mobile device or desktop.</p>
                </div>
                <div className="toggle on toggle-success mb-0 float-sm-end" id="push-notifications">
                  <span></span>
                </div>
              </div>
              <div className="flex items-top justify-between mt-3">
                <div className="mail-notification-settings">
                  <p className="text-[14px] mb-1 font-medium">Email Notifications</p>
                  <p className="text-xs mb-0 text-textmuted dark:text-textmuted/50">Messages sent to the user's email address.</p>
                </div>
                <div className="toggle toggle-success mb-0 float-sm-end" id="email-notifications">
                  <span></span>
                </div>
              </div>
              <div className="flex items-top justify-between mt-3">
                <div className="mail-notification-settings">
                  <p className="text-[14px] mb-1 font-medium">In-App Notifications</p>
                  <p className="text-xs mb-0 text-textmuted dark:text-textmuted/50">Alerts that appear within the application interface.</p>
                </div>
                <div className="toggle toggle-success mb-0 float-sm-end" id="in-app-notifications">
                  <span></span>
                </div>
              </div>
              <div className="flex items-top justify-between mt-3">
                <div className="mail-notification-settings">
                  <p className="text-[14px] mb-1 font-medium">SMS Notifications</p>
                  <p className="text-xs mb-0 text-textmuted dark:text-textmuted/50">Text messages sent to the user's mobile phone.</p>
                </div>
                <div className="toggle toggle-success on mb-0 float-sm-end" id="sms-notifications">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}
