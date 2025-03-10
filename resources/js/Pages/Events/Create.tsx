import React, { useEffect } from 'react'
import { Input } from '@/Components/ui/input'
import { Head, useForm } from '@inertiajs/react'
import InputError from '@/Components/InputError'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import CountrySelector from '../Profile/CountrySelector'
import QuillEditor from '@/Components/Editors/QuillEditor'
import showToast from '@/utils/showToast'


export default function Create() {

  const [quillValue, setQuillValue] = React.useState('');

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    start_date: "",
    end_date: "",
    country: "South Africa",
    language: "English",
    description: "",
});

const handleQuillChange = (value: string) => {
  setQuillValue(value);
  setData('description', value);
};

const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  post(route('events.store'),{
    preserveScroll: true,
    onSuccess: () => {
      reset();
      showToast('success', 'Event created successfully!', {position: 'bottom-right'});
    },
    onError: () => {
      showToast('error', 'Something went wrong!', {position: 'bottom-right'});
    }
  });
};
  return (
    <Authenticated>
          <Head title="Dashboard" />
          <div className="main-content app-content">
            <div className="container-fluid">
             <Breadcrumb
             items={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Events', href: '/events' },
                { label: 'Create', active: true }
              ]}
              />
             
             
        
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-12 col-span-12">
                  <div className="box">
                    <div className="box-body">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl mb-6">Create Event</h2>
                            
                            <div className="grid grid-cols-1 w-full md:gap-6 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm mb-1">Name of the event <span className='text-red-500'>*</span></label>
                                  <Input
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    type="text"
                                    placeholder="Name of the event"
                                    className="w-full px-3 py-2 border rounded-lg"
                                  />
                                  <InputError message={errors.name} />
                                </div>
                                <div>
                                  <label className="block text-sm mb-1">Set the start time of the event</label>
                                  <Input
                                   value={data.start_date}
                                   onChange={(e) => setData('start_date', e.target.value)}
                                    type="datetime-local"
                                    className="w-full px-3 py-2 border rounded-lg"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm mb-1">Language</label>
                                  <select 
                                  value={data.language} 
                                  onChange={(e) => setData('language', e.target.value)} 
                                  className="w-full px-3 py-2 border rounded-lg">
                                    <option value="English">English</option>
                                    {/* Add more countries */}
                                  </select>
                                </div>
                              </div>
                    
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm mb-1">Country</label>
                                  <CountrySelector 
                                    value={data.country ?? 'South Africa'} 
                                    setData={setData} 
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm mb-1">Set the end time of the event</label>
                                  <Input
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    type="datetime-local"
                                    className="w-full px-3 py-2 border rounded-lg"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className='mt-6'>
                            <label className="block text-sm mb-1">Event Description</label>
                            <QuillEditor 
                              quillValue={data.description ?? ''}
                              setQuillValue={handleQuillChange} 
                             />
                            </div>
                    
                            <div className="flex justify-between mt-6">
                              <button disabled={processing} onClick={handleSubmit} type="button" className="ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white w-full">
                                {processing ? 'Creating...' : 'Create Event'}</button>
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
