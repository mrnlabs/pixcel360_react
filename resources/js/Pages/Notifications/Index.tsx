import { toast } from '@/hooks/use-toast';
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Notification, NotificationsProps } from '@/types'
import { router } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';

export default function Index({notifications=[]}: NotificationsProps) {

    const markAllAsRead = () => {
        router.post(route('notifications.markAllAsRead'), undefined,{
            onSuccess: () => {
                toast({
                    title: 'Notifications marked as read.',
                    type: 'success'
                })
            },
            onError: () => {
                toast({
                    title: 'An error occurred. Please try again.',
                    type: 'error'
                })
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
 
    <div className="max-w-2xl mx-auto bg-white dark:bg-[#1f2937] shadow-md rounded-lg p-6 ">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-xl font-semibold">All Notifications</h2>
            <button onClick={markAllAsRead} type="button" className="text-sm text-blue-600 hover:underline">Mark all as read</button>
        </div>
        
       
        <div className="space-y-4">
            
        {notifications.length > 0 && notifications.map((notification, index) => (
    <div onClick={() => redirectToModel(notification)}
        key={index} 
        className={`p-4 border-l-4 rounded-lg flex justify-between items-start cursor-pointer 
            ${notification.read_at ? "bg-white border-gray-300 dark:bg-[#1f2937]" 
                                   : "bg-blue-50 border-blue-500 dark:bg-[#374151]"}`}
    >
        <div>
            <p className="text-gray-800 dark:text-white font-medium">{notification.data.message}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(notification.created_at, { addSuffix: true })}
            </p>
        </div>
        {!notification.read_at && <span className="w-3 h-3 rounded-full bg-blue-500"></span>}
    </div>
))}
      
        {notifications.length === 0 && (
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 dark:bg-[#374151] rounded-lg flex justify-between items-start cursor-pointer">
                <div>
                    <p className="text-gray-800 dark:text-white font-medium">You have no notifications.</p>
                </div>
            </div>
        )}
      
            
            
        </div>
    </div>

    </Authenticated>
  )
}
