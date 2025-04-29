
import { router, usePage } from '@inertiajs/react';

const UpgradeCard = ({diffDays}:{diffDays:number}) => {

  // @ts-ignore
  const current_subscription = usePage().props.auth.current_subscription;
    const handleSubscribe = () => {
        router.get(route('plans'));
    }
  return (
    <div className=" p-4 rounded-md w-64">
        {(diffDays < 0 && !current_subscription)  && (
           <button type='button' onClick={handleSubscribe}
           className="w-full bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white font-medium py-2 px-4 rounded-xs mb-3 hover:bg-amber-400 transition-colors">
            Upgrade
          </button>
        )}
      
      {diffDays > 0 && (
        <button className="w-full bg-gray-700 flex items-center justify-center gap-2 border border-gray-600 text-gray-300 py-2 px-4 rounded-xs hover:bg-gray-700 transition-colors">
         You have {diffDays} day(s) left in your free trial.
        </button> 
      )}
       
    </div>
  );
};

export default UpgradeCard;
