import { format, formatDistanceToNow, isAfter, parseISO } from 'date-fns';

export default function SubscriptionCard({subscription}: any) {

    const startDate = parseISO(subscription?.started_at);
    const expiryDate = parseISO(subscription?.expires_at);
    const today = new Date();
  
    // Check if subscription is expired
    const isExpired = !isAfter(expiryDate, today);
  
    // Calculate remaining days or days since expiration
    const timeDistance = formatDistanceToNow(expiryDate, { addSuffix: true });
  
    // Format the expiry date
    const formattedExpiryDate = format(expiryDate, 'd,MMMM yyyy');

  return (
    <div className="xxl:col-span-3 lg:col-span-6 col-span-12">
    <div className="box">
 
  <div className="box-body">
    <div className="grid grid-cols-12 gap-y-3">
    <div className="xl:col-span-12 col-span-12">
      <p className="text-[14px] font-medium mb-4">{subscription?.plan.name}</p>
      {/* <p className="mb-4">
        <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">Name On Card :</span> Henry Milo
      </p> */}
      <p className="mb-4">
        <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">Total :</span>
        <span className="text-success font-medium text-[14px]">
          ${subscription?.plan.price} <span className='text-textmuted'> / {subscription?.plan.price_per}</span>
        </span>
      </p>
      <p className="mb-4">
        <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">Next Payment Date :</span> {formattedExpiryDate} - 
        <span className={`text-xs font-medium ${isExpired ? 'text-danger' : 'text-warning'}`}>
          {timeDistance}
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
     
      <button type="submit" className="ti-btn ti-btn-primary w-full">View</button>
     
    </div>
    </div>
  </div>
</div>
                </div>
  )
}
