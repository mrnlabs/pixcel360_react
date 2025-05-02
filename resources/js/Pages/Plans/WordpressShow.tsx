import WordPressLayout from '@/Layouts/WordPressLayout';
import WordpressFooter from '@/Shared/WordpressFooter';
import { Plan, PlanCardProps } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
export default function WordpressShow({plan}: {
    plan: Plan
}) {
    // @ts-ignore
    const { user } = usePage().props.auth;

    const handleSubscribe = () => {
      if(user){
       return router.get(route('plans', plan?.slug));
      }
      router.visit('/', {
        method: 'get',
        data: {
            redirectTo: 'plans',
            plan: plan?.slug,
        },
      })
    }

  return (
    <WordPressLayout>
          <Head title="View Plan" />
          <div className="mx-[19rem] mt-3">
            <div className="container-fluid">
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-12 col-span-12">
                  <div className="box">
                    
                    <div className="box-body">
                    <div className="grid grid-cols-12 gap-x-6">
                        <div className="xxl:col-span-5 col-span-12">
                            <div className="bx">
                                <div className="y">
                                   <div className="ecommerce-gallery flex text-center">
                                        {/* <span className="badge bg-primarytint2color tag-badge">{plan?.category?.name}</span> */}
                                        <img src={plan?.photo} alt="image" className="w-full"/>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className="xxl:col-span-7 col-span-12">
                            <div className="">
                                <div className="">
                                    <div>
                                        <p className="text-xl font-semibold mb-4">{plan?.name}</p>
                                        <div className="flex gap-4 items-center mb-3">
                                            <p className="mb-1">
                                                <span className="h2 font-semibold">US${plan?.price}</span>
                                            </p>
                                            <div className="mb-0 text-textmuted dark:text-textmuted/50 text-xs">
                                                <p className="mb-0">
                                                    {plan?.interval == 'semi_annual' ? 'Every' : 'Per'}
                                                </p>
                                                <p className="mb-0 text-info font-medium text-[15px]">{plan?.interval == 'semi_annual' ? '6 months' : plan?.interval}</p>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-[15px] font-semibold mb-1">Description :</p>
                                            <p dangerouslySetInnerHTML={{__html: plan?.description ?? ''}} className="text-textmuted dark:text-textmuted/50 mb-0 text-[13px]"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleSubscribe}
                            className="inline-block px-8 py-3 rounded-sm text-white font-medium bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] w-full shadow-md transition duration-300">
                             Subscribe
                             </button>
                     
                        </div>
                    </div>
                </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
            <WordpressFooter />
        </WordPressLayout>
  )
}
