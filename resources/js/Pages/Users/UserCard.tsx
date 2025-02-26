import isMyAccount from "@/utils/isMyAccount";
import isRecentlyLogin from "@/utils/isRecentlyLogin";
import { Link } from "@inertiajs/react";

export default function UserCard({user}:
  {user: any
  }) {


  return (
    <div className="xxl:col-span-3 lg:col-span-6 col-span-12">
    <div className="box">
      <div className="box-body">
        <div className="text-center">
          <div className="mb-2">
            <span className={`avatar avatar-xl avatar-rounded  ${user && isRecentlyLogin(user) ? 'online' : 'offline'}`}>
              <img src={user?.photo ?? 'profile_placeholder.jpg'} alt=""/>
            </span>
          </div>
          <div className="main-profile-info">
            <div className="font-semibold mb-1 h6 align-middle">
              {user?.firstname} {user?.lastname} <span className="text-textmuted">{ isMyAccount(user) ? '(You)' : ''}</span>
            </div>
            <p className="text-textmuted dark:text-textmuted/50 mb-1">
            {user?.email}
            </p>
            <div className="analytics-timeline">
            <p className="text-textmuted dark:text-textmuted/50 mb-2">
            {user?.phone ?? '-'}
            </p>
            </div>
          </div>
        
          <div className="flex gap-2 mb-0 flex-wrap flex-xxl-nowrap">
            <div className="ti-btn ti-btn-primary ti-btn-sm mb-0 flex-auto"> Message </div>
            <Link href={route('users.show',user?.slug)} className="ti-btn ti-btn-secondary ti-btn-sm mb-0 flex-auto"> View More </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
