import ConfirmDialog from '@/Components/ConfirmDialog'
import CustomTooltip from '@/Components/CustomTooltip'
import { Plan, PlanCardProps } from '@/types'
import { truncateText } from '@/utils/truncateText'
import { Link } from '@inertiajs/react'
import { SquarePen, Trash2 } from 'lucide-react'
import React, { Suspense, useState } from 'react'

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

export default function PlanCard({plan, handleDelete, dialogOpen, setDialogOpen}: {
    plan: PlanCardProps['plan'] | undefined; 
    handleDelete: () => void; 
    dialogOpen: boolean
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    }
    ) {

  return (
    <div className="xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <div className="box">
      <img src={plan?.photo} className="card-img-top max-h-60 min-h-60" alt="..."/>
      <div className="box-body">
      <div className={`ribbon-2 ${getRibbonColor(plan?.category?.name)} ribbon-right`}>{plan?.category?.name}</div>
        <h6 className="box-title font-medium">
          <CustomTooltip content={plan?.name ?? ''}>
          {truncateText(plan?.name ?? '', 40, '...')}
          </CustomTooltip>
        </h6>
        <div>
            <span className="mb-2 text-[11px] badge leading-none bg-primary font-medium">
                R {plan?.price}/{plan?.price_per}
            </span>
            {/* set dangerous html */}
            <p dangerouslySetInnerHTML={{__html: truncateText(plan?.description ?? '', 100, '...') ?? ''}} className="text-textmuted dark:text-textmuted/50 text-xs mb-4"></p>
            <div className="flex justify-center">
              <Link aria-label="anchor" href={route('plans.edit', plan?.slug )} className="ti-btn ti-btn-icon ti-btn-soft-primary1 btn-wave ti-btn-sm ms-2 waves-effect waves-light">
              <SquarePen />
              </Link>
              <button  onClick={() => setDialogOpen(true)} aria-label="anchor"
              type='button' className="ti-btn ti-btn-icon ti-btn-soft-primary2 btn-wave ti-btn-sm ms-2 waves-effect waves-light">
                <Trash2/>
              </button>
            </div>
          </div>
      </div>
    </div>
    <Suspense fallback={""}>
              <ConfirmDialog 
                message="Are you sure you want to remove this plan ?"
                dialogOpen={dialogOpen} 
                setDialogOpen={setDialogOpen}
                onContinue={handleDelete}
             />
        </Suspense>
  </div>
  )
}
