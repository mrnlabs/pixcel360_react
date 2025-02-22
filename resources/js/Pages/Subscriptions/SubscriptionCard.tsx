import { useSubscriptionStatus } from '@/hooks/useSubscriptionStatus';
import { SubscriptionCardProps } from '@/types';
import { Link } from '@inertiajs/react';
import { format, formatDistanceToNow, isAfter, parseISO } from 'date-fns';

export default function SubscriptionCard({subscription}: SubscriptionCardProps) {

  if (!subscription) {
    return null;
  }

  const { isExpired, timeRemaining, formattedExpiryDate } = useSubscriptionStatus(subscription);
  
  return (
    <div className="xxl:col-span-3 lg:col-span-6 col-span-12">
    <div className="box">
 
  <div className="box-body">
    <div className="grid grid-cols-12 gap-y-3">
    <div className="xl:col-span-12 col-span-12">
      <p className="text-[14px] font-medium mb-4">{subscription?.plan?.name}</p>
      {/* <p className="mb-4">
        <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">Name On Card :</span> Henry Milo
      </p> */}
      <p className="mb-4">
        <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">Total :</span>
        <span className="text-success font-medium text-[14px]">
          ${subscription?.plan?.price} <span className='text-textmuted'> / {subscription?.plan?.interval}</span>
        </span>
      </p>
      <p className="mb-4">
        <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">Next Payment Date :</span> {formattedExpiryDate} - 
        <span className={`text-xs font-medium ${isExpired ? 'text-danger' : 'text-warning'}`}>
          {timeRemaining}
        </span>
      </p>
      <p className="mb-4">
        <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">
          Status : {' '}
          <span className={`badge ${
            isExpired 
              ? 'bg-danger/10 text-danger' 
              : 'bg-primarytint3color/10 text-primarytint3color'
          }`}>
            {isExpired ? 'Expired' : 'Active'}
          </span>
        </span>
      </p>
     
      <Link href={route('subscriptions.show', subscription?.slug)} className="ti-btn ti-btn-primary w-full">View</Link>
     
    </div>
    </div>
  </div>
</div>
                </div>
  )
}
