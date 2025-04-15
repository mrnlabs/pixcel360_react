import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import Paginator from '@/Shared/Paginator'
import { Head, router } from '@inertiajs/react'
import React, { useState } from 'react'
// @ts-expect-error
import { debounce } from 'lodash';
import { Filters, QueryParams } from '@/types'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select'

export default function Index({ subscriptions }: any) {
    console.log(subscriptions)
    const totalItems = subscriptions?.total;
    const itemsPerPage = subscriptions?.per_page;
    const currentPage = subscriptions?.current_page;

     const handlePageChange  = (page: number) => {
       router.get(route('events'), {page}, {
        preserveState: true,
        replace: true
       })
      }
    
      const [filters, setFilters] = useState({
        search: '',
        sort: ''
    });
    
    const updateFilters = React.useCallback(
      debounce((newFilters: Partial<Filters>) => {
        const queryParams: QueryParams = {};
        
        const updatedFilters = { ...filters, ...newFilters };
        
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

  return (
    <Authenticated>
    <Head title="Admin Subscriptions" />
    <div className="main-content app-content">
      <div className="container-fluid">
       <Breadcrumb
       items={[
          { label: 'Home', href: '/dashboard' },
          { label: 'Admin Subscriptions', href: '/subscriptions' },
          { label: 'All', active: true }
        ]}
        />
       
        <div className="grid grid-cols-12 gap-x-6">
          <div className="xxl:col-span-12 col-span-12">
          <div className="box">
  <div className="box-header justify-between hidden">
    <div className="box-title"> All Subscriptions </div>
    <div className="flex gap-4 items-center flex-wrap">
      <div className="custom-form-group grow">
        <label htmlFor="" className='block text-sm'>From: </label>
        <input type="date" className="form-control !pe-[7rem]" placeholder="Search Orders.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
        <a aria-label="anchor" href="javascript:void(0);" className="text-textmuted dark:text-textmuted/50 custom-form-btn">
          <i className="ti ti-search"></i>
        </a>
      </div>
      <div className="custom-form-group grow">
        <label htmlFor="">To: </label>
        <input type="date" className="form-control !pe-[7rem]" placeholder="Search Orders.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
        <a aria-label="anchor" href="javascript:void(0);" className="text-textmuted dark:text-textmuted/50 custom-form-btn">
          <i className="ti ti-search"></i>
        </a>
      </div>
    </div>
  </div>
  <div className="box-body p-0">
    <div className="table-responsive">
      <table className="ti-custom-table ti-custom-table-hover text-nowrap">
        <thead>
          <tr className="border-b !border-defaultborder dark:!border-defaultborder/10">
            <th scope="col">Order Id</th>
            <th scope="col">Plan</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Subscription Date</th>
            <th scope="col">Status</th>
            <th scope="col">Payment Mode</th>
            <th scope="col">Cost</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="order-list border-b !border-defaultborder dark:!border-defaultborder/10">
            <td>#1172553</td>
            <td>
              <div className="flex items-center">
                <div className="">
                  <p className="font-semibold mb-0 flex items-center">
                    <a href="order-details.html">Lightweight Sneakers</a>
                  </p>
                </div>
              </div>
            </td>
            <td>
              <div className="flex items-center">
                <span className="avatar avatar-sm me-2 avatar-rounded">
                  <img src="../assets/images/faces/4.jpg" alt=""/>
                </span>Violeta Tilly
              </div>
            </td>
            <td>(222) 111 - 57840</td>
            <td> 11 Jan 2024 </td>
            <td>
              <span className="badge bg-success/10 text-success">Shippped</span>
            </td>
            <td>Card</td>
            <td className="font-semibold">$177.00</td>
            <td>
              <a aria-label="anchor" href="order-details.html" className="ti-btn ti-btn-sm ti-btn-soft-primary btn-wave waves-effect waves-light !mb-0">
                <i className="ri-eye-line"></i>
              </a>
              <a aria-label="anchor" href="javascript:void(0);" className="ti-btn ti-btn-sm ti-btn-soft-info btn-wave waves-effect waves-light !mb-0">
                <i className="ri-download-line"></i>
              </a>
              <a aria-label="anchor" href="javascript:void(0);" className="order-delete-btn ti-btn ti-btn-sm ti-btn-soft-primary2 btn-wave waves-effect waves-light !mb-0">
                <i className="ri-delete-bin-line"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
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
      
      </div>
    </div>
  </Authenticated>
  )
}
