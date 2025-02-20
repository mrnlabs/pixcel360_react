
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { router, usePage } from '@inertiajs/react'
import { CreditCard, Keyboard, Settings, User } from 'lucide-react'
import React, { useState } from 'react'

export default function NotificationBell() {
  const filePath = usePage().props.filePath;
  const user = usePage().props.auth.user;
  const [preview, setPreview] = useState(user?.photo ? filePath+user?.photo : 'profile_placeholder.jpg');
    const goToProfile = () => {
        router.get('/profile')
    }
  return (

    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 header-link-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"></path>
  </svg>
    </DropdownMenuTrigger>
    <DropdownMenuContent className=" mt-4">
      <DropdownMenuLabel> 
        <div className="flex items-center justify-between">
                      <p className="mb-0 text-[15px] font-medium">Notifications</p>
                      <span className="badge bg-secondary text-white rounded-sm" id="notifiation-data">5 Unread</span>
          </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={goToProfile} className='cursor-pointer'>
        <ul className="list-none mb-0" id="header-notification-scroll" data-simplebar="init">
        <li className="ti-dropdown-item block">
          <div className="flex items-center">
            <div className="grow flex items-center justify-between">
              <div>
                <p className="mb-0 font-medium">
                  <a href="chat.html">New Messages</a>
                </p>
                <div className="text-textmuted dark:text-textmuted/50 font-normal text-xs header-notification-text truncate"> Jane Sam sent you a message.</div>
                <div className="font-normal text-[10px] text-textmuted dark:text-textmuted/50 op-8"> Now</div>
              </div>
            </div>
          </div>
        </li>
        </ul>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer'>
            <a href="#!" className="ti-btn ti-btn-primary w-full ">View All</a>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
