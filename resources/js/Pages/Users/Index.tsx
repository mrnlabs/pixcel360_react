import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head, router } from '@inertiajs/react'
import React, { Suspense, useState } from 'react'
import { Filters, QueryParams, User } from '@/types'
// @ts-expect-error
import { debounce } from 'lodash';
import showToast from '@/utils/showToast'
import Paginator from '@/Shared/Paginator'
import { Input } from '@/Components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select'
import UserCard from './UserCard'

export default function Index({users} : any) {
    const totalItems = users?.total;
    const itemsPerPage = users?.per_page;
    const currentPage = users?.current_page;

  const [filters, setFilters] = useState({
    search: '',
    sort: ''
});

 const handlePageChange  = (page: number) => {
   router.get(route('users'), {page}, {
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

const handleDelete = (plan: User) => {
  router.delete(route('plans.destroy', plan?.slug), { 
    preserveScroll: true, 
    onSuccess: () => {
      showToast('success', 'Plan deleted successfully!', {position: 'bottom-right'});
     },
     onError: () => {
      showToast('error', 'Something went wrong', {position: 'bottom-right'});
     }
 });
}

  return (
    <Authenticated>
          <Head title="Plans" />
          <div className="main-content app-content">
            <div className="container-fluid">
             <Breadcrumb
             items={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Users', href: '/users' },
                { label: 'All', active: true }
              ]}
              />
             
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-12 col-span-12">
                  <div className="box">
                    <div className="box-header justify-between">
                      <div className="box-title"> All Users </div>
                      <div className="flex flex-wrap gap-2">
                        
                         <div>
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

                        </div> 
                      </div>
                    </div>
                    <div className="box-body">

                    <div className="grid grid-cols-12 gap-x-6">
                       {users?.data?.map((user: any) => (
                        <UserCard key={user.id} 
                        user={user} 
                        />
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
                        {/* <ConfirmDialog 
                          message="Are you sure you want to remove this plan ?"
                          dialogOpen={dialogOpen} 
                          setDialogOpen={setDialogOpen}
                          onContinue={handleDelete}
                      /> */}
        </Suspense>
            
            </div>
          </div>
        </Authenticated>
  )
}
