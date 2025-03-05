import { toast } from '@/hooks/use-toast';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb';
import { Notification, NotificationsProps } from '@/types'
import showToast from '@/utils/showToast';
import { Head, router } from '@inertiajs/react';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { Check, EllipsisVertical, Loader, Trash, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';




export default function Index({initialNotifications=[]}: NotificationsProps) {

  const [notifications, setNotifications] = useState(initialNotifications || []);
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);
  const [markingAsRead, setMarkingAsRead] = useState(false);

  // Handle individual notification selection
  const handleSelectNotification = (notificationId: number) => {
    setSelectedNotifications(prev => {
      if (prev.includes(notificationId)) {
        return prev.filter(id => id !== notificationId);
      } else {
        return [...prev, notificationId];
      }
    });
  };

  // Handle select all functionality
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(notifications.map(notification => notification.id).filter((id): id is number => id !== undefined));
    }
    setSelectAll(!selectAll);
  };

    const markAllAsRead = () => {
        router.post(route('notifications.markAllAsRead'), undefined,{
            onSuccess: () => {
                showToast('success', 'Notifications marked as read.', {position: 'bottom-right'})
            },
            onError: () => {
                showToast('error', 'An error occurred. Please try again.', {position: 'bottom-right'})
            }
        });
    }

    const redirectToModel = (notification: Notification) => {
        router.visit(route(notification.data.model_route, notification.data.model_slug) + `?ref=${notification.id}`);
    }

    useEffect(() => {
      setSelectAll(selectedNotifications.length === notifications.length && notifications.length > 0);
    }, [selectedNotifications, notifications]);

    const handleBulkDelete = () => {
      if (selectedNotifications.length === 0) return;
        setBulkDeleteLoading(true);
        router.post(route('notifications.deleteSelected'), {notifications: selectedNotifications}, {
          onSuccess: () => {
              // filter out the selected notifications from the list
              setNotifications(prev => prev.filter(notification => notification.id !== undefined && !selectedNotifications.includes(notification.id)));
              setSelectedNotifications([]);
            setBulkDeleteLoading(false)
              showToast('success', 'Notifications deleted successfully!', {position: 'bottom-right'});
          },
          onError: () => {
              setBulkDeleteLoading(false);
              showToast('error', 'An error occurred. Please try again.', {position: 'bottom-right'});
          }
        });
    };
    const handleBulkMarkAsRead = () => {
      if (selectedNotifications.length === 0) return;
      
      setMarkingAsRead(true);
      router.post(route('notifications.markAllAsRead'), {notifications: selectedNotifications}, {
          onSuccess: () => {
            setMarkingAsRead(false);
            // filter out the selected notifications from the list
            setNotifications(prev => prev.filter(notification => notification.id !== undefined && !selectedNotifications.includes(notification.id)));
            setSelectedNotifications([]);
            showToast('success', 'Notifications marked as read successfully!', {position: 'bottom-right'});
          },
          onError: () => {
              setMarkingAsRead(false);
              showToast('error', 'An error occurred. Please try again.', {position: 'bottom-right'});
          }
        });
    };
  return (
    <Authenticated>
          <Head title="Pixcel360 - Notifications" />
          <div className="main-content app-content">
            <div className="container-fluid">
             <Breadcrumb
             items={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Notifications', active: true }
              ]}
              />
             
             <div className="max-w-2xl mx-auto bg-white dark:bg-[#1f2937] shadow-md rounded-lg p-6 mt-4">
        
        <div className="xxl:col-span-4 col-span-12">
        <div className="">
      <div className="box-header justify-between">
        <div className="box-title flex items-center gap-3">
          <div className="form-check">
            <input 
              type="checkbox" 
              className="form-check-input" 
              id="selectAllNotifications"
              checked={selectAll} 
              onChange={handleSelectAll}
            />
            <label className="form-check-label" htmlFor="selectAllNotifications">All Notifications</label>
          </div>
        </div>
        <div className="flex gap-2">
          {selectedNotifications.length > 0 && (
            <>
              <button disabled={markingAsRead}
                className={`ti-btn ti-btn-sm ${markingAsRead ? 'opacity-50 cursor-not-allowed' : ''} bg-primary !text-white`}
                onClick={handleBulkMarkAsRead}
              >
                <Check className="w-4 h-4 mr-1" /> 
                {markingAsRead && <Loader className='animate-spin mr-1' />}Mark as Read
              </button>
              <button disabled={bulkDeleteLoading}
                className={`ti-btn ${bulkDeleteLoading ? 'opacity-50 cursor-not-allowed' : ''} ti-btn-sm bg-danger !text-white`}
                onClick={handleBulkDelete}
              >
                <Trash2 className="w-4 h-4 mr-1" /> 
                {bulkDeleteLoading && <Loader className='animate-spin mr-1'/> }Delete Selected
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="box-body">
        <ul className="list-none timeline-widget1 mb-0">
          {notifications.length > 0 && notifications.map((notification) => (
            <li key={notification.id} onClick={() => redirectToModel(notification)} className="cursor-pointer timeline-widget-list hover:bg-[#f9f9f9] dark:hover:bg-[#171d25] p-4 rounded-md">
              <div className="flex items-center flex-wrap">
                <div className="form-check mr-2">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id={`notification-${notification.id}`}
                    checked={notification.id !== undefined && selectedNotifications.includes(notification.id)}
                    onChange={() => notification.id !== undefined && handleSelectNotification(notification.id)}
                  />
                </div>
                <div className={`avatar avatar-xl !text-primarytint1color me-2 flex-shrink-0 ${notification.read_at ? 'bg-primarytint1color/10' : ''}`}>
                  <div className="text-center">
                    <div className="font-medium leading-none mb-1">{format(parseISO(notification.created_at), 'dd')}</div>
                    <div className="text-xs text-defaulttextcolor font-medium leading-none">{format(parseISO(notification.created_at), 'EEE')}</div>
                  </div>
                </div>
                <div className="flex flex-wrap flex-auto items-top justify-between flex-xl-nowrap">
                  <div className="events-width">
                    <p className="mb-1 timeline-widget-content">{notification.data.message}</p>
                    <p className="mb-0 text-xs leading-none text-textmuted dark:text-textmuted/50">
                      {format(parseISO(notification.created_at), 'HH:mm')}
                      
                      {notification.type === "App\\Notifications\\NewUserRegistered" ? (
                        <span className="badge bg-primary/10 ms-2 text-primary">
                          New User Registered
                        </span>
                      ) : (
                        <span className="badge bg-success text-secondary">
                          Support Ticket
                        </span>
                      )}
                    </p>
                  </div>
                 
                </div>
              </div>
            </li>
          ))}
          {notifications.length === 0 && (
            <p className="text-center text-xs text-textmuted">You have no notifications</p>
          )}
        </ul>
      </div>
    </div>
                        </div>
        </div>
            
            </div>
          </div>
        </Authenticated>
  )
}
