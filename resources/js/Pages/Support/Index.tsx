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
       router.get(route('events'), {page}, {
        preserveState: true,
        replace: true
       })
      }
    
      const [filters, setFilters] = useState({
        priority: '',
        status: ''
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
const getBadgeClass = (status: string) => {
  switch (status) {
    case 'open':
      return 'bg-outline-primary';
    case 'closed':
      return 'bg-outline-success';
    case 'in_progress':
      return 'bg-outline-warning';
    case 'resolved':
      return 'bg-outline-secondary';
    default:
      return 'bg-outline-dark';
  }

}

const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-outline-success';
      case 'medium':
        return 'bg-outline-warning';
      case 'high':
        return 'bg-outline-danger';
      case 'critical':
        return 'bg-outline-danger';
      default:
        return 'bg-outline-dark';
    }
}

const handleDelete = (issue: any) => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    router.delete(route('issues.destroy', issue?.slug), {
      preserveState: true,
      onSuccess: () => {
       showToast('success', 'Ticket deleted successfully', {position: 'bottom-right'});
      },
      onError: () => {
        showToast('error', 'Something went wrong', {position: 'bottom-right'});
      }
    });
  }
}
  return (
    <Authenticated>
    <Head title="Support Tickets" />
    <div className="main-content app-content">
      <div className="container-fluid">
       <Breadcrumb
       items={[
          { label: 'Home', href: '/dashboard' },
          { label: 'Issues', href: '/issues' },
          { label: 'Details', active: true }
        ]}
        />
       
        <div className="grid grid-cols-12 gap-x-6">
          <div className="xxl:col-span-12 col-span-12">
          <div className="box">
  <div className="box-header justify-between">
    <div className="box-title"> All Tickets </div>
    <div className="box-actions flex space-x-2">
      <input type="search" placeholder="Search..." className="form-control" onChange={(e) => updateFilters({ search: e.target.value })} />
      <Select onValueChange={(value) => updateFilters({ status: value })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort By Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By Status </SelectLabel>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => updateFilters({ priority: value })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort By Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By Priority </SelectLabel>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
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
            <th scope="col">Reported By</th>
            <th scope="col">Priority</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
         {!issues?.data?.length ? (
          <tr>
            <td colSpan={9} className="text-center py-4">No tickets found</td>
          </tr>
         ) : (
          issues?.data?.map((issue: any) => (
            <tr key={issue.id} className="order-list border-b !border-defaultborder dark:!border-defaultborder/10">
            <td>#{issue.id}</td>
            <td>
              <div className="flex items-center">
                <div className="">
                  <p className="font-semibold mb-0 flex items-center hover:underline hover:text-primary">
                    <Link href={route('issues.show', issue.slug)} >{issue.title}</Link>
                  </p>
                </div>
              </div>
            </td>
            <td>
              <div className="flex items-center">{issue.category.name}
              </div>
            </td>
            <td>{issue.user.firstname} {issue.user.lastname}</td>
            <td> 
                <span className={`badge ${getPriorityBadgeClass(issue.priority)}`}>{issue.priority}</span>
            </td>
            <td> {format(new Date(issue.created_at), 'dd-MM-yyyy')} </td>
            <td><span className={`badge ${getBadgeClass(issue.status)}`}>{issue.status}</span></td>
            <td>
              <Link href={route('issues.show', issue.slug)} aria-label="anchor" className="ti-btn ti-btn-sm ti-btn-soft-primary btn-wave waves-effect waves-light !mb-0">
              <Eye size={18} />
              </Link>
              <button onClick={() => handleDelete(issue)} aria-label="anchor" className="order-delete-btn ti-btn ti-btn-sm ti-btn-soft-primary2 btn-wave waves-effect waves-light !mb-0">
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
