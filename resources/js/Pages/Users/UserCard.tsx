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

export default function UserCard() {

      // const { data, setData, post, processing } = useForm({slug: plan?.slug});

      // const [modalOpen, setModalOpen] = useState(false);



  return (
    <div className="xxl:col-span-3 lg:col-span-6 col-span-12">
    <div className="box">
      <div className="box-body">
        <div className="text-center">
          <div className="mb-2">
            <span className="avatar avatar-xl avatar-rounded online">
              <img src="../assets/images/faces/9.jpg" alt=""/>
            </span>
          </div>
          <div className="main-profile-info">
            <div className="font-semibold mb-1 h6">Daniel David <div className="hs-tooltip ti-main-tooltip">
                <span className="text-primarytint2color text-[14px]">
                  <i className="bi bi-check-circle-fill"></i>
                </span>
              </div>
            </div>
            <p className="text-textmuted dark:text-textmuted/50 mb-2">Web Designer</p>
            <p className="mb-2">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudan accusant. </p>
          </div>
          <div className="flex gap-1 justify-center mb-2 items-center">
            <i className="ri-facebook-line text-primary border rounded-full align-middle leading-none p-2 border-primary/25 me-1 inline-block text-[17px] bg-primary/10"></i>
            <i className="ri-twitter-x-line text-primarytint1color border rounded-full align-middle leading-none p-2 border-primarytint1color/25 me-1 inline-block text-[17px] bg-primarytint1color/10"></i>
            <i className="ri-linkedin-line text-primarytint2color border rounded-full align-middle leading-none p-2 border-primarytint2color/25 me-1 inline-block text-[17px] bg-primarytint2color/10"></i>
            <i className="ri-github-line text-primarytint3color border rounded-full align-middle leading-none p-2 border-primarytint3color/25 me-1 inline-block text-[17px] bg-primarytint3color/10"></i>
          </div>
          <div className="flex gap-2 mb-0 flex-wrap flex-xxl-nowrap">
            <div className="ti-btn ti-btn-primary ti-btn-sm mb-0 flex-auto"> Message </div>
            <div className="ti-btn ti-btn-secondary ti-btn-sm mb-0 flex-auto"> Follow </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
