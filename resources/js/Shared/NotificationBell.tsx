
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { Notification } from '@/types';
import showToast from '@/utils/showToast';
import { router } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'
import { formatDistanceToNow } from 'date-fns';

export default function NotificationBell() {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        fetch('/notifications')
          .then(res => res.json())
          .then(data => {
            setUnreadCount(data.unreadCount),
            setNotifications(data.notifications)
          });
      }, 5000);
  
      return () => clearInterval(interval);
    }, []);
    

    const viewAllNotifications = () => {
       router.get(route('notifications.viewAll'));
    };

    // const clearAllNotifications = () => {
    //     router.post(route('notifications.markAllAsRead'), undefined,{
    //         onSuccess: () => {
    //             showToast('success', 'Notifications marked as read.', {position: 'top-right'})
    //         },
    //         onError: () => {
    //             showToast('error', 'An error occurred. Please try again.', {position: 'top-right'})
    //         }
    //     });
    // };
  
    const redirectToModel = (notification: Notification) => {
      router.visit(route(notification.data.model_route, notification.data.model_slug) + `?ref=${notification.id}`);
  }

  return (

    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <button aria-label="anchor" className="header-link hs-dropdown-toggle ti-dropdown-toggle">
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 header-link-icon" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"></path>
  </svg>
  <span className="badge bg-[#FF4F84] rounded-full header-icon-badge text-white" id="cart-icon-badge">{unreadCount}</span>
</button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className=" mt-4">
      <DropdownMenuLabel> 
        <div className="flex items-center justify-between">
                      <p className="mb-0 text-[15px] font-medium">Notifications</p>
                      {unreadCount > 0 && (<span className="badge bg-secondary text-white rounded-sm" id="notifiation-data">{unreadCount} Unread</span>)}
                      
          </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem className='cursor-pointer'>
        <ul className="list-none mb-0" id="header-notification-scroll" data-simplebar="init">

        {notifications.length ? notifications.map((notification: Notification) => (
             <li key={notification.id} onClick={() => redirectToModel(notification)} className="ti-dropdown-item block">
             <div className="flex items-center">
               <div className="grow flex items-center justify-between">
                 <div>
                   <p className="mb-0 font-medium">
                     {notification.data.title}
                   </p>
                   <div className="text-textmuted dark:text-textmuted/50 font-normal text-xs header-notification-text truncate"> {notification.data.message}</div>
                   <div className="font-normal text-[10px] text-textmuted dark:text-textmuted/50 op-8"> {formatDistanceToNow(notification.created_at,{ addSuffix: true })}</div>
                 </div>
               </div>
             </div>
           </li>
          )) : (
            <p className='text-center text-xs text-textmuted'>You have no notifications</p>
          )}
       
        </ul>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer'>
            <button onClick={viewAllNotifications} className="ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white w-full ">View All</button>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
