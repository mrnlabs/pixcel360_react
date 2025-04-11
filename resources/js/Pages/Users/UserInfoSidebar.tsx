import { User } from '@/types'
import isRecentlyLogin from '@/utils/isRecentlyLogin'
import { Building2 } from 'lucide-react'
import React from 'react'

export default function UserInfoSidebar({user} : {user: User | null}) {
  return (
    <div className="xl:col-span-3 col-span-12" style={{marginTop: 4 +'rem'}}>
            <div className="box overflow-hidden border border-defaultborder dark:border-defaultborder/10">
              <div className="box-body border-b border-dashed border-defaultborder dark:border-defaultborder/10">
                <div className="text-center">
                  <span className={`avatar avatar-xxl avatar-rounded online mb-3 ${user && isRecentlyLogin(user) ? 'online' : 'offline'}`}>
                    <img src={user?.photo ?? 'https://picxel-bucket.s3.af-south-1.amazonaws.com/placeholders/128x128.png'} alt=""/>
                  </span>
                  <h5 className="font-semibold mb-1">{user?.firstname} {user?.lastname}</h5>
                  <p className="text-xs mb-0 text-textmuted dark:text-textmuted/50">
                    <span className="me-3">
                      <i className="ri-building-line me-1 align-middle"></i>{user?.city} 
                    </span>
                    <span>
                      <i className="ri-map-pin-line me-1 align-middle"></i>{user?.country} </span>
                  </p>
                </div>
              </div>
             
              <div className="p-4 pb-1 flex flex-wrap justify-between">
                <div className="font-medium text-[15px] text-primarytint1color"> Basic Info : </div>
              </div>
              <div className="box-body border-b border-dashed border-defaultborder dark:border-defaultborder/10 p-0">
                <ul className="ti-list-group list-group-flush !border-0">
                  <li className="ti-list-group-item pt-2 border-0">
                    <div>
                      <span className="font-medium me-2">Name :</span>
                      <span className="text-textmuted dark:text-textmuted/50">{user?.firstname} {user?.lastname}</span>
                    </div>
                  </li>
                  <li className="ti-list-group-item pt-2 border-0">
                    <div>
                      <span className="font-medium me-2">Email :</span>
                      <span className="text-textmuted dark:text-textmuted/50">{user?.email}</span>
                    </div>
                  </li>
                  <li className="ti-list-group-item pt-2 border-0">
                    <div>
                      <span className="font-medium me-2">Phone :</span>
                      <span className="text-textmuted dark:text-textmuted/50">{user?.phone}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
  )
}
