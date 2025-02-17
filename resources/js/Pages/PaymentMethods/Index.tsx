import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head, Link, router, usePage } from '@inertiajs/react'
import { SquarePlus } from 'lucide-react'
import React, { lazy, Suspense, useState } from 'react'
import { Filters, Plan, PlanCardProps, QueryParams } from '@/types'
// @ts-expect-error
import { debounce } from 'lodash';
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/Components/ui/toaster'
import { PaymentMethod } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CreateModal from './CreateModal'
// import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';


interface PaymentMethodProps {
    paymentMethods: PaymentMethod[];
    defaultPaymentMethod?: PaymentMethod;
    setupIntent: {
        client_secret: string;
    };
}



export default function Index({ paymentMethods, defaultPaymentMethod, setupIntent }: PaymentMethodProps) {
  
  const [dialogOpen, setDialogOpen] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);
//    const stripePromise = loadStripe(usePage().props.stripeKey);
  const { toast } = useToast();

  const [filters, setFilters] = useState({
    search: '',
    sort: ''
});

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

const handleDelete = (plan: Plan) => {
  router.delete(route('plans.destroy', plan?.slug), { 
    preserveScroll: true, 
    onSuccess: () => {
      setDialogOpen(false),
      toast({
        title: "Success",
        description: "Plan deleted successfully",
        variant: "default",
    })
     },
     onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
    })
     }
 });
}

  return (
    <Authenticated>
          <Head title="Dashboard" />
          <div className="main-content app-content">
            <div className="container-fluid">
             <Breadcrumb
             items={[
                { label: 'Home', href: '/' },
                { label: 'Plans', href: '/plans' },
                { label: 'All', active: true }
              ]}
              />
             
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-12 col-span-12">
                  <div className="box">
                    <div className="box-header justify-between">
                      <div className="box-title"> Payment Methods </div>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => setModalOpen(true)} type="button" className="ti-btn ti-btn-primary !m-0 btn-wave ti-btn-sm waves-effect waves-light">
                          <SquarePlus className="align-middle" />Add Payment Method </button>
                      </div>
                    </div>
                    <div className="box-body">

                    <div className="grid grid-cols-12 gap-x-6">
  <div className="xxl:col-span-3 lg:col-span-6 col-span-12">
    <div className="box">
      <div className="box-header">
        <div className="box-title"> BTC WALLET </div>
      </div>
      <div className="box-body">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="leading-none">
              <span className="avatar avatar-rounded">
                <img src="../assets/images/crypto-currencies/square-color/Bitcoin.svg" alt=""/>
              </span>
            </div>
            <div>
              <span className="block text-textmuted dark:text-textmuted/50 text-xs font-normal">Available BTC</span>
              <span className="font-medium text-[15px]">0.05437 BTC</span>
            </div>
          </div>
          <div>
            <span className="font-medium">$1646.94 USD</span>
            <span className="block text-textmuted dark:text-textmuted/50 text-xs font-normal">In USD</span>
          </div>
        </div>
      </div>
      <div className="box-footer">
        <div className="flex gap-2 flex-wrap">
          <button type="button" className="ti-btn ti-btn-soft-primary !m-0  btn-w-lg btn-wave flex-auto waves-effect waves-light">Deposit</button>
          <button type="button" className="ti-btn ti-btn-soft-primary1 btn-w-lg btn-wave flex-auto !m-0 waves-effect waves-light">Withdraw</button>
        </div>
      </div>
    </div>
  </div>
</div>

                    </div>
                    {/* <div className="box-footer">
                      <div className="flex flex-wrap items-center">
                        <div> Showing 6 Entries <i className="bi bi-arrow-right ms-2 font-medium"></i>
                        </div>
                        <div className="ms-auto">
                          <nav aria-label="Page navigation" className="pagination-style-4">
                            <ul className="ti-pagination mb-0 flex-wrap">
                              <li className="page-item disabled">
                                <a className="page-link" href="javascript:void(0);"> Prev </a>
                              </li>
                              <li className="page-item ">
                                <a className="page-link active" href="javascript:void(0);">1</a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="javascript:void(0);">2</a>
                              </li>
                              <li className="page-item">
                                <a className="page-link !text-primary" href="javascript:void(0);"> next </a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>

              <Suspense fallback={""}>
              <CreateModal open={modalOpen} setOpen={setModalOpen}/>
              <Toaster />
             </Suspense>

            
            
            </div>
          </div>
        </Authenticated>
  )
}
