import ConfirmDialog from '@/Components/ConfirmDialog'
import CustomTooltip from '@/Components/CustomTooltip'
import { AuthGuard } from '@/guards/authGuard'
import { Plan, PlanCardProps } from '@/types'
import { truncateText } from '@/utils/truncateText'
import { Link, router, useForm } from '@inertiajs/react'
import { CreditCard, SquarePen, Trash2 } from 'lucide-react'
import React, { Suspense, useState } from 'react'
import ViewPlanModal from './ViewPlanModal'
import toast from 'react-hot-toast'
import showToast from '@/utils/showToast'

const getRibbonColor = (categoryName: string | undefined) => {
    switch (categoryName?.toLowerCase()) {
      case 'duopass':
        return 'bg-duo-pass';
      case 'photopass':
        return 'bg-photo-pass';
      default:
        return 'bg-other-pass';
    }
  };

export default function PlanCard({plan, handleDelete, dialogOpen, setDialogOpen, setModalOpen, handleSubscribe, setPlan}: {
    plan: PlanCardProps['plan'] | undefined; 
    handleDelete: () => void; 
    dialogOpen: boolean
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    handleSubscribe: () => void
    setPlan: (plan: Plan) => void
    }
    ) {

     

  return (
    <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <div className="box">
      <Link className='cursor-pointer' href={route('plans.show', plan?.slug )}
      >
        <img src={plan?.photo} className="card-img-top max-h-60 min-h-60" alt="..."/>
        </Link>
      <div className="box-body">
      <div className={`ribbon-2 ${getRibbonColor(plan?.category?.name)} ribbon-right`}>{plan?.category?.name}</div>
        <h6 onClick={() => {
          setModalOpen(true);
          if (plan) {
            setPlan(plan);
          }
        } 
      }
        className="box-title font-medium">
          <CustomTooltip content={plan?.name ?? ''}>
          {truncateText(plan?.name ?? '', 40, '...')}
          </CustomTooltip>
        </h6>
        <div>
            <span className="mb-2 text-[11px] badge leading-none bg-primary font-medium">
                $ {plan?.price}/{plan?.interval}
            </span>
            {/* set dangerous html */}
            <p dangerouslySetInnerHTML={{__html: truncateText(plan?.description ?? '', 100, '...') ?? ''}} className="text-textmuted dark:text-textmuted/50 text-xs mb-4"></p>
            <div className="flex justify-center">

            <AuthGuard 
              roles={["System Admin", "System SuperAdmin"]} 
              permissions={["*"]}
              requireAll={true}>
              <Link aria-label="anchor" href={route('plans.edit', plan?.slug )} className="ti-btn ti-btn-icon ti-btn-soft-primary1 btn-wave ti-btn-sm ms-2 waves-effect waves-light">
              <SquarePen />
              </Link>
              <button onClick={() => {if (plan) { setPlan(plan); setDialogOpen(true); }}} aria-label="anchor"
              type='button' className="ti-btn ti-btn-icon ti-btn-soft-primary2 btn-wave ti-btn-sm ms-2 waves-effect waves-light">
                <Trash2/>
              </button>
              <Link href={route('payment.checkout', plan?.slug )}  className="ti-btn ti-btn-icon ti-btn-soft-primary1 btn-wave ti-btn-sm ms-2 waves-effect waves-light">
              <CreditCard />
              </Link>
            </AuthGuard>


             </div>

             
      
      <AuthGuard 
          roles={["Account Owner"]} 
          permissions={["*"]}
          requireAll={true}>
          <button onClick={handleSubscribe} aria-label="anchor" type='button' className="w-full ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white btn-wave mt-4 waves-effect waves-light">Subscribe</button>
      </AuthGuard>

             
          </div>
      </div>
    </div>
    
  </div>
  )
}
