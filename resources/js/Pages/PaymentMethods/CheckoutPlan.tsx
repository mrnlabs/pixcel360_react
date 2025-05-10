import { getPlanInterval } from '@/utils/getPlangetInterval'
import { Link} from '@inertiajs/react';

export default function CheckoutPlan({plan}: any) {
  return (
     <div className="box flex-row">
      <div className="box-body bg-light m-2 rounded-sm">
        <div className="flex flex-wrap items-center gap-4 flex-xl-nowrap align-items-center">
         
          <div>
            <p className="mb-0 ">{plan.name} / {getPlanInterval(plan.interval)}</p>
            <p className="mb-0 font-bold">US$ {plan.price}</p>
           
          </div>
          <div className="ms-auto">
            <Link href={route('plans.show', plan.slug)} className="ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white">View</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
