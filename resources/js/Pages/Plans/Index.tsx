import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { SquarePlus, WifiOff } from 'lucide-react'
import React, { Suspense, useState } from 'react'
import { Filters, Plan, QueryParams } from '@/types'
// @ts-expect-error
import { debounce } from 'lodash';
import PlanCard from './PlanCard'
import showToast from '@/utils/showToast'
import Paginator from '@/Shared/Paginator'
import { AuthGuard } from '@/guards/authGuard'
import ViewPlanModal from './ViewPlanModal'
import ConfirmDialog from '@/Components/ConfirmDialog'

export default function Index({plans} : any) {
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const initializationError = usePage().props.error as string;

    const totalItems = plans?.original?.pagination?.total;
    const itemsPerPage = plans?.original?.pagination?.per_page;
    const currentPage = plans?.original?.pagination?.current_page;

    const [plan, setPlan] = useState<Plan | null>(null);

  const [filters, setFilters] = useState({
    search: '',
    sort: ''
});

 const handlePageChange  = (page: number) => {
   router.get(route('plans'), {page}, {
    preserveState: true,
    replace: true
   })
  }


const updateFilters = React.useCallback(
  debounce((newFilters: Partial<Filters>) => {
    const queryParams: QueryParams = {};
    
    // Merge new filters with existing filters
    const updatedFilters = { ...filters, ...newFilters };
    
    // Add non-empty filter values to query params
    Object.keys(updatedFilters).forEach(key => {
      if (updatedFilters[key as keyof Filters]) {
        queryParams[key] = updatedFilters[key as keyof Filters] as string;
      }
    });

    router.get(route('events'), queryParams, {
      preserveState: true,
      replace: true
    });

    // Update local state with merged filters
    setFilters(updatedFilters);
  }, 300),
  [filters]
);

const handleDelete = () => {
  router.delete(route('plans.destroy', plan?.slug), { 
    preserveScroll: true, 
    onSuccess: () => {
      setDialogOpen(false),
      showToast('success', 'Plan deleted successfully!', {position: 'bottom-right'});
     },
     onError: () => {
      showToast('error', 'Something went wrong', {position: 'bottom-right'});
     }
 });
}

const { data, setData, get, processing } = useForm({slug: plan?.slug});

const handleSubscribe = () => {
  if (plan) {
    get(route('payment.checkout', plan?.slug), {
      onSuccess: () => {
          showToast('success', 'You have subscribed successfully!', {position: 'bottom-right'});
          setModalOpen(false);
      },
      onError: () => {
          showToast('error', 'Something went wrong', {position: 'bottom-right'});
      }
  })
}
}

  return (
    <Authenticated>
          <Head title="Plans" />
          <div className="main-content app-content">
            <div className="container-fluid">
             <Breadcrumb
             items={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Plans', href: '/plans' },
                { label: 'All', active: true }
              ]}
              />
             
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-12 col-span-12">
                  <div className="box">
                    <div className="box-header justify-between">
                      <div className="box-title"> Plans </div>
                      {initializationError && (
                        <div className="box-title flex"> 
                          <span className="text-red-500 flex">
                            <WifiOff className="mr-1 animate-pulse" /> {String(initializationError)}
                            </span>
                        </div>
                      )}
                     
                      <div className="flex flex-wrap gap-2">
                      <AuthGuard 
                          roles={["System Admin", "System SuperAdmin"]} 
                          permissions={["*"]}
                          requireAll={true}>
                          <Link href={route('plans.create')} className="ti-btn ti-btn-primary !m-0 btn-wave ti-btn-sm waves-effect waves-light">
                          <SquarePlus className="align-middle" />Create New Plan </Link>
                      </AuthGuard>

                        
                      </div>
                    </div>
                    <div className="box-body">

                    <div className="grid grid-cols-12 gap-x-6">
                      {plans?.original?.data?.map((plan: any) => (
                        <PlanCard key={plan.id} 
                        plan={plan} 
                        setPlan={(e) => setPlan(e)}
                        handleDelete={handleDelete} 
                        dialogOpen={dialogOpen}
                        setDialogOpen={setDialogOpen}
                        setModalOpen={setModalOpen}
                        processing={processing}
                        handleSubscribe={handleSubscribe} />
                      ))}
                      
                   </div>

                    </div>
                    <div className="box-footer">
                    <Paginator
                      totalItems={totalItems}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                      showingText="Displaying"
                      maxVisiblePages={5}
                    />
                    </div>
                  </div>
                </div>
              </div>

              <Suspense fallback={""}>
              <ViewPlanModal 
                  open={modalOpen} 
                  setOpen={setModalOpen} 
                  plan={plan}
                  handleSubscribe={handleSubscribe}
                  processing={processing}
                    />
                        <ConfirmDialog 
                          message="Are you sure you want to remove this plan ?"
                          dialogOpen={dialogOpen} 
                          setDialogOpen={setDialogOpen}
                          onContinue={handleDelete}
                      />
                  </Suspense>

            </div>
          </div>
        </Authenticated>
  )
}
