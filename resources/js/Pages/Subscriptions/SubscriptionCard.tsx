import { useSubscriptionStatus } from '@/hooks/useSubscriptionStatus';
import { SubscriptionCardProps } from '@/types';
import { getNextPaymentDate } from '@/utils/getNextPaymentDate';
import { Link, usePage } from '@inertiajs/react';

export default function SubscriptionCard({subscription}: SubscriptionCardProps) {

  if (!subscription) {
    return null;
  }

  const { isExpired} = useSubscriptionStatus(subscription);

  // @ts-ignore
    const current_subscription = usePage().props.auth.current_subscription;

    const isActive = () => {
      if (current_subscription) {
        return current_subscription?.id == subscription?.id;
      }
      return isExpired;
    }

  return (
    <div className="xxl:col-span-3 lg:col-span-6 col-span-12">
    <div className="box">
 
  <div className="box-body">
    <div className="grid grid-cols-12 gap-y-3">
    <div className="xl:col-span-12 col-span-12">
      <p className="text-[14px] font-medium mb-4">#{subscription?.transaction_id}</p>
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
        <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">Expires :</span> {
        isActive() ? getNextPaymentDate(subscription) : '-'}
        {/* <span className={`text-xs font-medium ${isExpired ? 'text-danger' : 'text-warning'}`}>
          {timeRemaining}
        </span> */}
      </p>
      {}
      <p className="mb-4">
        <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">
          Status : {' '}
          <span className={`badge ${
            isActive() 
              ? 'bg-success text-white' 
              : 'bg-danger/10 text-danger'
          }`}>
            {isActive() ? 'Active' : 'Expired'}
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
