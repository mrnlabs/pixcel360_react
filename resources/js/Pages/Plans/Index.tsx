import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head, Link, router } from '@inertiajs/react'
import { SquarePlus } from 'lucide-react'
import React, { lazy, Suspense, useState } from 'react'
import { Filters, Plan, PlanCardProps, QueryParams } from '@/types'
// @ts-expect-error
import { debounce } from 'lodash';
import { Input } from '@/Components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select'
import PlanCard from './PlanCard'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/Components/ui/toaster'

export default function Index({plans} : PlanCardProps) {
  
  const [dialogOpen, setDialogOpen] = useState(false);
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
                      <div className="box-title"> Plans </div>
                      <div className="flex flex-wrap gap-2">
                        <Link href={route('plans.create')} className="ti-btn ti-btn-primary !m-0 btn-wave ti-btn-sm waves-effect waves-light">
                          <SquarePlus className="align-middle" />Create New Plan </Link>
                        {/* <div>
                          <Input 
                          onChange={(e) => updateFilters({ search: e.target.value })}
                          className="form-control form-control-sm" type="search" placeholder="Search" aria-label=".form-control-sm example"/>
                        </div>
                        <div className="ti-dropdown hs-dropdown">
                          <Select onValueChange={(e) => updateFilters({ sort: e })}>
                          <SelectTrigger className="w-[180px] form-control">
                            <SelectValue placeholder="Sort By"></SelectValue>
                          </SelectTrigger>
                          <SelectContent className='form-control'>
                            <SelectGroup>
                              <SelectLabel>Sort By</SelectLabel>
                              <SelectItem className='cursor-pointer' value="latest">Latest</SelectItem>
                              <SelectItem className='cursor-pointer' value="oldest">Oldest</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        </div> */}
                      </div>
                    </div>
                    <div className="box-body">

                    <div className="grid grid-cols-12 gap-x-6">
                      {plans?.map((plan: any) => (
                        <PlanCard key={plan.id} 
                        plan={plan} 
                        handleDelete={() => handleDelete(plan)} 
                        dialogOpen={dialogOpen}
                        setDialogOpen={setDialogOpen} />
                      ))}
                      
                   </div>

                    </div>
                    <div className="box-footer">
                      <div className="flex flex-wrap items-center">
                        <div> Showing 6 Entries <i className="bi bi-arrow-right ms-2 font-medium"></i>
                        </div>
                        <div className="ms-auto">
                          <nav aria-label="Page navigation" className="pagination-style-4">
                            <ul className="ti-pagination mb-0 flex-wrap">
                              <li className="page-item disabled">
                                <a className="page-link" href="#!"> Prev </a>
                              </li>
                              <li className="page-item ">
                                <a className="page-link active" href="#!">1</a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#!">2</a>
                              </li>
                              <li className="page-item">
                                <a className="page-link !text-primary" href="#!"> next </a>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            <Toaster />
            
            </div>
          </div>
        </Authenticated>
  )
}
