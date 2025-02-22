import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head, router, usePage } from '@inertiajs/react'
import { format } from 'date-fns'
import { ArrowDownToLine, FileText, Printer } from 'lucide-react'
import React from 'react'

export default function ViewInvoice({otherSubscriptions}: any) {
    const { current_subscription } = usePage().props.auth;
    console.log(current_subscription);

    const generateInvoice = () => {
      if(!current_subscription) return
      // router.visit(route('invoice.generate', current_subscription.slug));
      //window open the invoice in a new tab
      window.open(route('invoice.generate', current_subscription.slug), '_blank');
    }
  return (
    <Authenticated>
         <Head title="Dashboard" />
          <div className="main-content app-content">
            <div className="container-fluid">
             <Breadcrumb
             items={[
                { label: 'Home', href: '/' },
                { label: 'Subscriptions', href: '/subscriptions' },
                { label: 'View Invoice', active: true }
              ]}
              />
        <div className="grid grid-cols-12 gap-x-6">
  <div className="xl:col-span-9 col-span-12">
    <div className="box">
      <div className="box-header md:flex block">
        <div className="h5 mb-0 sm:flex block items-center">
          <div className="avatar avatar-sm">
            <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt=""/>
          </div>
          <div className="sm:ms-2 ms-0 sm:mt-0 mt-2">
            <div className="h6 font-medium mb-0">SHOPPING INVOICE : <span className="text-primary">#7864-1542</span>
            </div>
          </div>
        </div>
        <div className="ms-auto mt-md-0 mt-2">
          <button className="ti-btn ti-btn-sm bg-primarytint1color text-white me-1" >Print 
            <Printer size={20} className="ms-1 align-middle inline-block" />
          </button>
          <button onClick={generateInvoice} className="ti-btn ti-btn-sm bg-primary text-white">Save As PDF 
            <FileText size={20} className="ms-1 align-middle inline-block" />
          </button>
        </div>
      </div>
      <div className="box-body">
        <div className="grid grid-cols-12 sm:gap-x-6 gap-y-3">
          <div className="xl:col-span-12 col-span-12">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="xl:col-span-4 lg:col-span-4 md:col-span-5 sm:col-span-12 col-span-12">
                <p className="text-textmuted dark:text-textmuted/50 mb-2"> Billing From : </p>
                <p className="font-bold mb-1"> SPRUKO TECHNOLOGIES </p>
                <p className="mb-1 text-textmuted dark:text-textmuted/50"> WNN-A1-1323,Robsons street </p>
                <p className="mb-1 text-textmuted dark:text-textmuted/50"> Ottawa,Canada,100072 </p>
                <p className="mb-1 text-textmuted dark:text-textmuted/50"> sprukotrust.Xintra@gmail.com </p>
                <p className="mb-1 text-textmuted dark:text-textmuted/50"> (222) 142-1245 </p>
                
                <div className="text-[1.5rem] mb-1 font-medium mt-6"> Subscription totals </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-3 col-span-12">
            <p className="font-medium text-textmuted dark:text-textmuted/50 mb-1">Product:</p>
            <p className="text-[15px] mb-1">{current_subscription?.plan?.name}</p>
          </div>
          <div className="xl:col-span-3 col-span-12"></div>
          <div className="xl:col-span-3 col-span-12"></div>
          <div className="xl:col-span-3 col-span-12">
            <p className="font-medium text-textmuted dark:text-textmuted/50 mb-1">Total :</p>
            <p className="text-[1rem] mb-1 font-medium">ZAR {current_subscription?.plan?.price}</p>
          </div>
          <div className="xl:col-span-12 col-span-12">
            <div className="table-responsive">
              <table className="ti-custom-table ti-custom-table-head mt-3 border border-defaultborder dark:border-defaultborder/10">
                <thead>
                  <tr className="border-b !border-defaultborder dark:!border-defaultborder/10">
                    <th>ORDER</th>
                    <th>DATE</th>
                    <th></th>
                    <th>STATUS</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {otherSubscriptions.map((subscription: any) => (
                    <tr className="border-b !border-defaultborder dark:!border-defaultborder/10">
                    <td>
                      <div className="font-medium"> {subscription?.plan?.name} </div>
                    </td>
                    <td>
                      <div className="text-textmuted dark:text-textmuted/50"> {format(subscription?.created_at,'MMMM d, yyyy')} </div>
                    </td>
                    <td className="product-quantity-container"> </td>
                    <td> To BE Determined </td>
                    <td> ${subscription?.plan?.price} </td>
                  </tr>
                  ))}
                  
                  <tr className="border-b !border-defaultborder dark:!border-defaultborder/10">
                    <td colSpan={3}></td>
                    <td colSpan={2}>
                      <table className="table table-sm text-nowrap mb-0 table-borderless">
                        <tbody>
                          <tr className="border-b !border-transparent">
                            <th scope="row">
                              <p className="mb-0">Sub Total :</p>
                            </th>
                            <td>
                              <p className="mb-0 font-medium text-[15px]">$1,784</p>
                            </td>
                          </tr>
                          <tr className="border-b !border-transparent">
                            <th scope="row">
                              <p className="mb-0">Avail Discount :</p>
                            </th>
                            <td>
                              <p className="mb-0 font-medium text-[15px]">$15.58</p>
                            </td>
                          </tr>
                          <tr className="border-b !border-transparent">
                            <th scope="row">
                              <p className="mb-0">Coupon Discount <span className="text-success">(3.5%)</span> : </p>
                            </th>
                            <td>
                              <p className="mb-0 font-medium text-[15px]">$987.56</p>
                            </td>
                          </tr>
                          <tr className="border-b !border-transparent">
                            <th scope="row">
                              <p className="mb-0 text-[14px]">Total :</p>
                            </th>
                            <td>
                              <p className="mb-0 font-medium text-[1rem] text-success">$3,846.53</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        
        </div>
      </div>
      <div className="box-footer text-end">
        <button className="ti-btn ti-btn-primary">Download <ArrowDownToLine className=" ms-1 align-middle"/>
        </button>
      </div>
    </div>
  </div>
  <div className="xl:col-span-3 col-span-12">
    <div className="box">
      <div className="box-header">
        <div className="box-title"> Mode Of Payment </div>
      </div>
      <div className="box-body">
        <div className="grid grid-cols-12 gap-y-3">
          <div className="xl:col-span-12 col-span-12">
            <p className="text-[14px] font-medium mb-4"> Credit/Debit Card </p>
            <p className="mb-4">
              <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">Card Number :</span> 1323 3213 4546 XXXX
            </p>
            <p className="mb-4">
              <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">Name On Card :</span> Henry Milo
            </p>
            <p className="mb-4">
              <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">Total Amount :</span>
              <span className="text-success font-medium text-[14px]">$3,846.53</span>
            </p>
            <p className="mb-4">
              <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">Due Date :</span> 28,June 2024 - <span className="text-danger text-xs font-medium">18 days due</span>
            </p>
            <p className="mb-4">
              <span className="font-medium text-textmuted dark:text-textmuted/50 text-xs">Invoice Status : <span className="badge bg-primarytint3color/10 text-primarytint3color">Processing</span>
              </span>
            </p>
            <div className="alert bg-primarytint2color/10 !text-primarytint2color !border-primarytint2color/10 !text-[0.812rem]" role="alert"> Please Make sure to pay the invoice bill within 120 days. </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</div>
    </Authenticated>
  )
}
