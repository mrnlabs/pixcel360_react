import React, { useEffect, useState } from 'react'
import { Input } from '@/Components/ui/input'
import { Head, Link, useForm } from '@inertiajs/react'
import InputError from '@/Components/InputError'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import CountrySelector from '../Profile/CountrySelector'
import QuillEditor from '@/Components/Editors/QuillEditor'
import showToast from '@/utils/showToast'
import CustomToggle from '@/Components/Form/CustomToggle'
import { Loader } from 'lucide-react'


export default function Create() {

  const [quillValue, setQuillValue] = React.useState('');

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    terms_and_conditions: "",
    start_date: "",
    end_date: "",
    country: "South Africa",
    language: "English",
    description: "",
    enable_start_end_date: 0
});

const handleQuillChange = (value: string) => {
  setQuillValue(value);
  setData('description', value);
};

const [validationErrors, setValidationErrors] = useState<{ start_date?: string; end_date?: string }>({});

    const validateForm = () => {
            const errors: { [key: string]: string } = {};

        // Validate start_date
        if (data.start_date) {
            const startDate = new Date(data.start_date);
            const now = new Date();

            if (startDate < now) {
                errors.start_date = 'The start date cannot be in the past.';
            }
        }

        // Validate end_date
        if (data.end_date && data.start_date) {
            const startDate = new Date(data.start_date);
            const endDate = new Date(data.end_date);

            if (endDate <= startDate) {
                errors.end_date = 'The end date must be later than the start date.';
            }
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };

const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  if (validateForm()) {
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
}
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

                                <div className="space-y-4 flex">
                                  <CustomToggle 
                                    label="Enable Start and End Time" 
                                    initialValue={data.enable_start_end_date} 
                                    onChange={(value) => setData('enable_start_end_date', value ? 1 : 0)} 
                                    />
                                  </div>
                               {data.enable_start_end_date ? (
                                 <>
                                 <div>
                                 <label className="block text-sm mb-1">Set the start time of the event</label>
                                 <Input
                                  value={data.start_date}
                                  onChange={(e) => setData('start_date', e.target.value)}
                                   type="datetime-local"
                                   className="w-full px-3 py-2 border rounded-lg"
                                 />
                                 {validationErrors.start_date && (
                                       <p className="text-red-500 text-sm mt-1">{validationErrors.start_date}</p>
                                   )}
                                   <InputError message={errors.start_date} />
                               </div>

                               <div>
                                 <label className="block text-sm mb-1">Set the end time of the event</label>
                                 <Input
                                   value={data.end_date}
                                   onChange={(e) => setData('end_date', e.target.value)}
                                   type="datetime-local"
                                   className="w-full px-3 py-2 border rounded-lg"
                                 />
                                 {validationErrors.end_date && (
                                       <p className="text-red-500 text-sm mt-1">{validationErrors.end_date}</p>
                                   )}
                                   <InputError message={errors.end_date} />
                               </div>
                               </>
                               ): ''}
                                
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
                               
                              </div>
                            </div>

                            <div className='mt-6'>
                            <label className="block text-sm mb-1">Event Description</label>
                            <QuillEditor 
                              quillValue={data.description ?? ''}
                              setQuillValue={handleQuillChange} 
                             />
                            </div>
                            <div className="form-check flex items-center gap-2 mt-4">
                              <input 
                              onChange={(e) => setData('terms_and_conditions', e.target.checked ? '1' : '0')} 
                              required={true} 
                              className="form-check-input" 
                              type="checkbox" 
                              id="flexCheckChecked" /> 
                            <label className="form-check-label" htmlFor="flexCheckChecked"> I agree to the 
                            Privacy Policy and the General <Link target='_blank' href='#!' className='underline text-primary'>Terms and Conditions<span className='text-red-500'> *</span>
                            </Link>
                            </label>
                           
                            </div> 
                            <InputError message={errors.terms_and_conditions} className='ml-8' />
                    
                            <div className="flex justify-between mt-6">
                              <button disabled={processing} onClick={handleSubmit} type="button" className="ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white w-full">
                                {processing && <Loader className='animate-spin mr-2'/>}Create Event</button>
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
