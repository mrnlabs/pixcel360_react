import React from 'react'
import { LineChartDouble } from './LineChartDouble'

export default function HeaderCard() {
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6">
  <div className="">
    <div className="box crm-card">
      <div className="box-body">
        <div className="">
          <div className="flex justify-between mb-2">
            <div className="p-2 border border-primary/10 bg-primary/10 rounded-full">
              <span className="avatar avatar-md avatar-rounded bg-primary svg-white mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                  <path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z"></path>
                </svg>
              </span>
            </div>
          </div>
          <p className="flex-auto text-textmuted dark:text-textmuted/50 text-[14px] mb-0">Total Events</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <h4 className="mb-0 flex items-center">1,1125</h4>
          <span className="text-success badge bg-success/10 rounded-full flex items-center text-[11px] me-0 ms-2 mb-0">
            <i className="ri-arrow-left-up-line text-[11px]"></i>+2.5% </span>
        </div>
      </div>
    </div>
  </div>
  <div className="">
    <div className="box crm-card">
      <div className="box-body">
        <div className="">
          <div className="flex justify-between mb-2">
            <div className="p-2 border border-primarytint1color/10 bg-primarytint1color/10  rounded-full">
              <span className="avatar avatar-rounded avatar-md bg-primarytint1color svg-white mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                  <path d="M205.66,61.64l-144,144a8,8,0,0,1-11.32-11.32l144-144a8,8,0,0,1,11.32,11.31ZM50.54,101.44a36,36,0,0,1,50.92-50.91h0a36,36,0,0,1-50.92,50.91ZM56,76A20,20,0,1,0,90.14,61.84h0A20,20,0,0,0,56,76ZM216,180a36,36,0,1,1-10.54-25.46h0A35.76,35.76,0,0,1,216,180Zm-16,0a20,20,0,1,0-5.86,14.14A19.87,19.87,0,0,0,200,180Z"></path>
                </svg>
              </span>
            </div>
          </div>
          <p className="flex-auto text-textmuted dark:text-textmuted/50 text-[14px] mb-0">Orders</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <h4 className="mb-0 flex items-center">15.8% </h4>
          <span className="text-danger badge bg-danger/10 rounded-full flex items-center text-[11px] me-0 ms-2 mb-0">
            <i className="ri-arrow-left-down-line text-[11px]"></i>-2.5% </span>
        </div>
      </div>
    </div>
  </div>
  <div className="">
    <div className="box crm-card">
      <div className="box-body">
        <div className="">
          <div className="flex justify-between mb-2">
            <div className="p-2 border border-primarytint2color/10 bg-primarytint2color/10  rounded-full">
              <span className="avatar avatar-rounded avatar-md bg-primarytint2color svg-white mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                  <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                </svg>
              </span>
            </div>
          </div>
          <p className="flex-auto text-textmuted dark:text-textmuted/50 text-[14px] mb-0">Subscriptions</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <h4 className="mb-0 flex items-center">3,132 </h4>
          <span className="text-success badge bg-success/10 rounded-full flex items-center text-[11px] me-0 ms-2 mb-0">
            <i className="ri-arrow-left-up-line text-[11px]"></i>+2.5% </span>
        </div>
      </div>
    </div>
  </div>
  <div className="">
    <div className="box crm-card">
      <div className="box-body">
        <div className="">
          <div className="flex justify-between mb-2">
            <div className="p-2 border border-primarytint3color/10 bg-primarytint3color/10  rounded-full">
              <span className="avatar avatar-rounded avatar-md bg-primarytint3color svg-white mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                  <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V156.69l50.34-50.35a8,8,0,0,1,11.32,0L128,132.69,180.69,80H160a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8v40a8,8,0,0,1-16,0V91.31l-58.34,58.35a8,8,0,0,1-11.32,0L96,123.31l-56,56V200H224A8,8,0,0,1,232,208Z"></path>
                </svg>
              </span>
            </div>
          </div>
          <p className="flex-auto text-textmuted dark:text-textmuted/50 text-[14px] mb-0">Total Users</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <h4 className="mb-0 flex items-center">3,132</h4>
          <span className="text-success badge bg-success/10 rounded-full flex items-center text-[11px] me-0 ms-2 mb-0">
            <i className="ri-arrow-left-up-line text-[11px]"></i>+2.5% </span>
        </div>
      </div>
    </div>
  </div>
  <div className="">
    <div className="box crm-card">
      <div className="box-body">
        <div className="">
          <div className="flex justify-between mb-2">
            <div className="p-2 border border-secondary/10 bg-secondary/10  rounded-full">
              <span className="avatar avatar-rounded avatar-md bg-secondary svg-white mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                  <path d="M256,136a8,8,0,0,1-8,8H232v16a8,8,0,0,1-16,0V144H200a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,256,136Zm-57.87,58.85a8,8,0,0,1-12.26,10.3C165.75,181.19,138.09,168,108,168s-57.75,13.19-77.87,37.15a8,8,0,0,1-12.25-10.3c14.94-17.78,33.52-30.41,54.17-37.17a68,68,0,1,1,71.9,0C164.6,164.44,183.18,177.07,198.13,194.85ZM108,152a52,52,0,1,0-52-52A52.06,52.06,0,0,0,108,152Z"></path>
                </svg>
              </span>
            </div>
          </div>
          <p className="flex-auto text-textmuted dark:text-textmuted/50 text-[14px] mb-0">New Contacts</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <h4 className="mb-0 flex items-center">968</h4>
          <span className="text-danger badge bg-danger/10 rounded-full flex items-center text-[11px] me-0 ms-2 mb-0">
            <i className="ri-arrow-left-down-line text-[11px]"></i>-2.5% </span>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
