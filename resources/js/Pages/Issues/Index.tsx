import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import Paginator from '@/Shared/Paginator'
import { Head, Link, router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
// @ts-expect-error
import { debounce } from 'lodash';
import { Filters, QueryParams } from '@/types'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { DatePickerWithRange } from '@/Components/DatePickerWithRange'
import { Download, Eye, Trash2 } from 'lucide-react'
import showToast from '@/utils/showToast'
import { format } from 'date-fns'
import { truncateText } from '@/utils/truncateText'

export default function Index({ issues }: any) {
    
    const totalItems = issues?.total;
    const itemsPerPage = issues?.per_page;
    const currentPage = issues?.current_page;

    const { success } = usePage().props;

    React.useEffect(() => {
        if (success) {
            showToast('success', String(success), { position: 'bottom-right' });
        }
    }, [success]);

     const handlePageChange  = (page: number) => {
       router.get(route('issues.index'), {page}, {
        preserveState: true,
        replace: true
       })
      }
    
      const [filters, setFilters] = useState({
        range: '',
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
    
        router.get(route('issues.index'), queryParams, {
          preserveState: true,
          replace: true
        });
    
        // Update local state with merged filters
        setFilters(updatedFilters);
      }, 300),
      [filters]
    );

    const handleDelete = (issue: any) => {
      if (confirm('Are you sure you want to delete this ticket?')) {
        router.delete(route('issues.destroy', issue?.slug), {
          preserveState: true,
          onSuccess: () => {
            //showToast('success', 'Ticket deleted successfully', {position: 'bottom-right'});
          },
          onError: () => {
            showToast('error', 'Something went wrong', {position: 'bottom-right'});
          }
        });
      }
          }
  return (
    <Authenticated>
    <Head title="Issues" />
    <div className="main-content app-content">
      <div className="container-fluid">
       <Breadcrumb
       items={[
          { label: 'Home', href: '/dashboard' },
          { label: 'Issues', href: '/issues' },
          { label: 'All', active: true }
        ]}
        />
       
        <div className="grid grid-cols-12 gap-x-6">
          <div className="xxl:col-span-12 col-span-12">
          <div className="box">
  <div className="box-header justify-between">
    <div className="box-title"> All Issues </div>
    <div className="flex gap-4 items-center flex-wrap">
      <div className="custom-form-group grow">
        {/* <DatePickerWithRange className="form-control !pe-[7rem]" range={filters.range} onChange={(value) => updateFilters({ range: value })} /> */}
        <Link href={route('issues.create')} className="ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white">Create Ticket</Link>
      </div>
    </div>
  </div>
  <div className="box-body p-0">
    <div className="table-responsive">
      <table className="ti-custom-table ti-custom-table-hover text-nowrap">
        <thead>
          <tr className="border-b !border-defaultborder dark:!border-defaultborder/10">
            <th scope="col">Request Id</th>
            <th scope="col">Title</th>
            <th scope="col">Issue Type</th>
            <th scope="col">Priority</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
         {!issues?.data?.length ? (
          <tr>
            <td colSpan={9} className="text-center py-4">No issues found</td>
          </tr>
         ) : (
          issues?.data?.map((issue: any) => (
            <tr key={issue.id} className="order-list border-b !border-defaultborder dark:!border-defaultborder/10">
            <td>#{issue.id}</td>
            <td>
              <div className="flex items-center">
                <div className="">
                  <p className="font-semibold mb-0 flex items-center">
                    <a href="order-details.html">{truncateText(issue.title, 70, '...')}</a>
                  </p>
                </div>
              </div>
            </td>
            <td>
              <div className="flex items-center">
                <div className="flex items-center">
                  <span className="badge bg-success/10 text-success">{issue.category.name}</span>
                </div>
              </div>
            </td>
            <td>
              <div className="flex items-center">
                <div className="flex items-center">
                  <span className="badge bg-success/10 text-success">{issue.priority}</span>
                </div>
              </div>
            </td>
            <td> {format(new Date(issue.created_at), 'dd/MM/yyyy')} </td>
            <td className="font-semibold">{issue.status}</td>
            <td>
              <Link href={route('issues.show', issue.slug)} aria-label="anchor" className="ti-btn ti-btn-sm ti-btn-soft-primary btn-wave waves-effect waves-light !mb-0">
              <Eye size={18} />
              </Link>
              <button onClick={() => handleDelete(issue)} type="button" aria-label="anchor" className="cursoer-pointer order-delete-btn ti-btn ti-btn-sm ti-btn-soft-primary2 btn-wave waves-effect waves-light !mb-0">
                <Trash2 size={18}/>
              </button>
            </td>
          </tr>
          ))
         )}
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
