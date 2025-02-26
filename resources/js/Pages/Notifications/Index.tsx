import { toast } from '@/hooks/use-toast';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb';
import { Notification, NotificationsProps } from '@/types'
import showToast from '@/utils/showToast';
import { Head, router } from '@inertiajs/react';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { EllipsisVertical } from 'lucide-react';




export default function Index({notifications=[]}: NotificationsProps) {

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
        if(notification.type = "App\\Notifications\\DocumentSubmittedNotification"){
                router.post(route('notifications.markAsReadRoute', notification.id));
                router.visit(notification.data.model_route);
        }
        router.visit(route(notification.data.model_route, notification.data.model_slug) + `?ref=${notification.id}`);
    }

 

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
                              <div className="box-title">All Notifications</div>
                              <a aria-label="anchor" href="#!" className="ti-btn ti-btn-sm bg-danger !text-white"> Delete All </a>
                            </div>
                            <div className="box-body">
                              <ul className="list-none timeline-widget1 mb-0">
                              {notifications.length > 0 && notifications.map((notification) => (
                                <li key={notification.id} className="timeline-widget-list">
                                  <div className="flex items-center flex-wrap">
                                    <div className={`avatar avatar-xl !text-primarytint1color me-2 flex-shrink-0 ${notification.read_at ? 'bg-primarytint1color/10' : ''}`}>
                                      <div className="text-center">
                                        <div className=" font-medium leading-none mb-1">{format(parseISO(notification.created_at), 'dd')}</div>
                                        <div className="text-xs text-defaulttextcolor font-medium leading-none">{format(parseISO(notification.created_at), 'EEE')}</div>
                                      </div>
                                    </div>
                                    <div className="flex flex-wrap flex-auto items-top justify-between flex-xl-nowrap">
                                      <div className="events-width">
                                        <p className="mb-1 timeline-widget-content">{notification.data.message}</p>
                                        <p className="mb-0 text-xs leading-none text-textmuted dark:text-textmuted/50">{format(parseISO(notification.created_at), 'HH:mm')}
                                        
                                        {notification.type == "App\\Notifications\\NewUserRegistered" ? (
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
                                      <div className="ti-dropdown hs-dropdown">
                                        <a  aria-label="anchor" href="#!" className="ti-btn ti-btn-light ti-btn-icon" data-bs-toggle="dropdown">
                                        <EllipsisVertical />
                                        </a>
                                        <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                          <li>
                                            <a className="ti-dropdown-item" href="#!">Action</a>
                                          </li>
                                          <li>
                                            <a className="ti-dropdown-item" href="#!">Another action</a>
                                          </li>
                                          <li>
                                            <a className="ti-dropdown-item" href="#!">Something else here</a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                ))}
                                {notifications.length == 0 && (
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
