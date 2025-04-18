import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head, useForm, usePage } from '@inertiajs/react'
import { formatDistanceToNow } from 'date-fns'
import SupportDetails from './SupportDetails'
import showToast from '@/utils/showToast'

export default function Show({ issue, issue_priorities, issue_statuses }: any) {
    
  const { data, setData, post, processing, errors, reset } = useForm({
    priority: issue.priority,
    status: issue.status,
    slug: issue.slug
});


const handleSubmit = () => {
  try {
    post(route('issues.update'), {
     preserveScroll: true,
     onSuccess: () => {
       showToast('success', 'Ticket updated successfully!', {position: 'bottom-right'});
     },
     onError: () => {
       showToast('error', 'Something went wrong!', {position: 'bottom-right'});
     }
   });
 } catch (error) {
   console.error('Update failed:', error);
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
          { label: 'All', active: true }
        ]}
        />
       
       <div className="grid grid-cols-12 gap-x-6 mb-5">
  <div className="xl:col-span-3 col-span-12">
    <div className="box">
      <div className="box-header">
        <div className="box-title">User Details</div>
      </div>
      <div className="box-body">
        <div className="grid grid-cols-12 gap-y-3">
          <div className="xl:col-span-12 col-span-12">
            <label htmlFor="full-name" className="form-label">Full Name :</label>
            <input type="text" className="form-control !bg-light dark:!bg-light" id="full-name" value={`${issue?.user?.firstname} ${issue?.user?.lastname}`}/>
          </div>
          <div className="xl:col-span-12 col-span-12">
            <label htmlFor="email" className="form-label">Email :</label>
            <input type="text" className="form-control !bg-light dark:!bg-light" id="email" value={issue?.user?.email} />
          </div>
          <div className="xl:col-span-12 col-span-12">
            <label htmlFor="country" className="form-label">Country:</label>
            <input type="text" className="form-control !bg-light dark:!bg-light" id="country" value={issue?.user?.country ?? 'Not set'}/>
          </div>
          <div className="xl:col-span-12 col-span-12">
            <label htmlFor="last-login" className="form-label">Last Login :</label>
            <input type="text" className="form-control !bg-light dark:!bg-light" id="last-login" 
            value={issue.user.last_login_at ? formatDistanceToNow(new Date(issue.user.last_login_at), { addSuffix: true }) : 'Never logged in'}/>
          </div>
        </div>
      </div>
    </div>
     <div className="box">
      <div className="box-header">
        <div className="box-title">Actions</div>
      </div>
      
<div className="box-body">
  <div className="grid grid-cols-12 gap-y-3">
    <div className="xl:col-span-12 col-span-12">
      <label htmlFor="full-name" className="form-label block">Priority :</label>
      <select 
        value={data.priority} 
        onChange={(e) => setData('priority', e.target.value)}
        className='form-control'
      >
        {issue_priorities?.map((priority: any) => (
          <option key={priority} value={priority}>{priority}</option>
        ))}
      </select>
    </div>
    <div className="xl:col-span-12 col-span-12">
      <label htmlFor="email" className="form-label">Status :</label>
      <select 
        className='form-control' 
        value={data.status} 
        onChange={(e) => setData('status', e.target.value)}
      >
        {issue_statuses?.map((status: any) => (
          <option key={status} value={status}>{status.replace('_', ' ')}</option>
        ))}
      </select>
    </div>
  </div>
</div>
      <button className='p-3 ti-btn ti-btn-sm text-white bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)]' onClick={handleSubmit}>
        {processing ? 'Updating...' : 'Update'}</button>
    </div>
  </div>
  <div className="xl:col-span-9 col-span-12">
    <div className="box">
      <div className="box-body p-0">
        <div className="tab-content border-0">
         <SupportDetails 
         issue={issue}
          />
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
