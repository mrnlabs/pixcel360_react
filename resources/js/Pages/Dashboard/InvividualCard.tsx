import { Link } from '@inertiajs/react'
import React from 'react'

export default function InvividualCard({
    link,
    icon,
    label,
}: {
    link: string;
    icon: React.ReactNode;
    label: string;
}) {
  return (
    <Link href={link} className="box crm-card">
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
        <p className="flex-auto text-textmuted dark:text-textmuted/50 text-[14px] mb-0">{label}</p>
      </div>
      {/* <div className="flex items-center justify-between mt-1">
        <h4 className="mb-0 flex items-center">968</h4>
        <span className="text-danger badge bg-danger/10 rounded-full flex items-center text-[11px] me-0 ms-2 mb-0">
          <i className="ri-arrow-left-down-line text-[11px]"></i>-2.5% </span>
      </div> */}
    </div>
  </Link>
  )
}
