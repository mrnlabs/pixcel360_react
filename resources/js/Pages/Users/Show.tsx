

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Breadcrumb } from "@/Shared/Breadcrumb";
import { User } from "@/types";
import { Head } from "@inertiajs/react";
import UserInfoSidebar from "./UserInfoSidebar";
import { format, formatDistanceToNow } from "date-fns";

export default function Show({user}: {user: User | null}) {

  const getCityCountry = `${user?.city}, ${user?.country}`;
    
    return (
        <Authenticated>
        <Head title={`User Details - ${user?.firstname} ${user?.lastname}`} />
        <div className="main-content app-content">
          <div className="container-fluid">
           <Breadcrumb
           items={[
              { label: 'Home', href: '/dashboard' },
              { label: 'Users', href: '/users' },
              { label: 'View Details', active: true }
            ]}
            />
           
           <div className="grid grid-cols-12 gap-x-6 " >
  <div className="xl:col-span-12 col-span-12" >
    <div className="box profile-card" >
      <div className="box-body pb-0 relative">
        <div className="grid grid-cols-12 sm:gap-x-6 profile-content">
          <UserInfoSidebar user={user} />
          <div className="xl:col-span-9 col-span-12">
            <div className="box overflow-hidden border border-defaultborder dark:border-defaultborder/10">
              <div className="box-body">
                <div className="tab-content pt-2" id="profile-tabs" style={{marginTop: 3 +'rem'}}>
                  <div className="tab-pane show active p-0 border-0" id="profile-about-tab-pane" role="tabpanel">
                    <ul className="ti-list-group list-group-flush border rounded-3">
                      <ul className="ti-list-group list-group-flush border rounded-3">
                      <li className="ti-list-group-item p-4">
                        <span className="font-medium text-[15px] block mb-3">Personal Info :</span>
                        <div className="grid grid-cols-12 sm:gap-x-6 gap-y-3 items-center">
                          <div className="xl:col-span-3 col-span-12">
                            <div className="leading-none">
                              <span className="font-medium">First Name :</span>
                            </div>
                          </div>
                          <div className="xl:col-span-9 col-span-12">
                            <input type="text" className="form-control" value={user?.firstname || ""}/>
                          </div>
                          <div className="xl:col-span-3 col-span-12">
                            <div className="leading-none">
                              <span className="font-medium">Last Name :</span>
                            </div>
                          </div>
                          <div className="xl:col-span-9 col-span-12">
                            <input type="text" className="form-control" value={user?.lastname || ""} />
                          </div>
                          
                          <div className="xl:col-span-3 col-span-12">
                            <div className="leading-none">
                              <span className="font-medium">Last Login :</span>
                            </div>
                          </div>
                          <div className="xl:col-span-9 col-span-12">
                            <input type="text" className="form-control" value={user?.last_login_at ? formatDistanceToNow(user?.last_login_at,{ addSuffix: true }) : ''}/>
                          </div>
                        </div>
                      </li>
                      <li className="ti-list-group-item p-4">
                        <span className="font-medium text-[15px] block mb-3">Contact Info :</span>
                        <div className="grid grid-cols-12 sm:gap-x-6 gap-y-3 items-center">
                          <div className="xl:col-span-3 col-span-12">
                            <div className="leading-none">
                              <span className="font-medium">Email :</span>
                            </div>
                          </div>
                          <div className="xl:col-span-9 col-span-12">
                            <input type="email" className="form-control" value={user?.email || ""}/>
                          </div>
                          <div className="xl:col-span-3 col-span-12">
                            <div className="leading-none">
                              <span className="font-medium">Phone :</span>
                            </div>
                          </div>
                          <div className="xl:col-span-9 col-span-12">
                            <input type="text" className="form-control" value={user?.phone || ""}/>
                          </div>
                          <div className="xl:col-span-3 col-span-12">
                            <div className="leading-none">
                              <span className="font-medium">Province :</span>
                            </div>
                          </div>
                          <div className="xl:col-span-9 col-span-12">
                            <input type="text" className="form-control" value={user?.province || ""}/>
                          </div>
                          <div className="xl:col-span-3 col-span-12">
                            <div className="leading-none">
                              <span className="font-medium">Location :</span>
                            </div>
                          </div>
                          <div className="xl:col-span-9 col-span-12">
                            <input type="text" className="form-control" value={getCityCountry || '' } />
                          </div>
                        </div>
                      </li>
                  
                      
                    </ul>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
          
          </div>
        </div>
      </Authenticated>
    );
}

