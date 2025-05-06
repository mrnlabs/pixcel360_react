import { useSubscriptionStatus } from '@/hooks/useSubscriptionStatus';
import { SubscriptionCardProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { isBefore, isAfter, isEqual, parseISO, format } from 'date-fns';

export default function SubscriptionCard({subscription}: SubscriptionCardProps) {

  if (!subscription) {
    return null;
  }

  const { isExpired} = useSubscriptionStatus(subscription);

  // @ts-ignore
    const current_subscription = usePage().props.auth.current_subscription;

    

    const getSubscriptionStatus = (subscription: any, current_subscription: any) => {
      if (!subscription?.expires_at) return "Unknown";
    
      const now = new Date();
      const subscriptionEndDate = parseISO(subscription.expires_at);
    
      if (current_subscription?.id === subscription?.id) {
        return "Active";
      }
    
      if (isBefore(subscriptionEndDate, now)) {
        return "Expired";
      }
    
      if (isAfter(subscriptionEndDate, now)) {
        return "Not yet Started";
      }
    
      // Optionally, handle exact equality
      if (isEqual(subscriptionEndDate, now)) {
        return "Expired"; // Or "Active" depending on your business rule
      }
    
      return "Unknown";
    };
    
    const getInterval = (interval: string) => {
      switch (interval) {
        case 'week':
          return 'Week';
        case 'month':
          return 'Month';
        case 'semi_annual':
          return '6 Months';
        case 'year':
          return 'Yearl';
        default:
          return interval;
      }
    }

  return (
    <div className="xxl:col-span-3 lg:col-span-6 col-span-12">
    <div className="box">
 
  <div className={`box-body ${getSubscriptionStatus(subscription, current_subscription) === 'Active' ? 'bg-green-100' : ''}`}>
    <div className="grid grid-cols-12 gap-y-3">
    <div className="xl:col-span-12 col-span-12">
      <p className="text-[14px] font-medium mb-4">#{subscription?.transaction_id}</p>
      {/* <p className="mb-4">
        <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">Name On Card :</span> Henry Milo
      </p> */}
      <p className="mb-4">
        <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">Total :</span>
        <span className="text-success font-medium text-[14px]">
          ${subscription?.plan?.price} <span className='text-textmuted'> / {getInterval(subscription?.plan?.interval || '')}</span>
        </span>
      </p>
      <p className="mb-4">
        <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">Expires :</span> 
        {' '}{format(new Date(subscription?.expires_at), 'MMM dd, yyyy')}
      </p>
      {}
      <p className="mb-4">
        <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">
          Status : {' '}
          <span className={`badge ${getSubscriptionStatus(subscription, current_subscription) === 'Active' ? 'bg-success text-white' : 'bg-danger/10 text-danger'}`}>
            {getSubscriptionStatus(subscription, current_subscription)}
          </span>
        </span>
      </p>
     
      <Link href={route('subscriptions.show', subscription?.slug)} 
      className="ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white font-bold py-2 px-4 rounded w-full">View</Link>
     
    </div>
    </div>
  </div>
</div>
                </div>
  )
}
