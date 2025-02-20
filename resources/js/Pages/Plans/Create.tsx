import React, { Suspense, useEffect } from 'react'
import { Input } from '@/Components/ui/input'
import { Head, useForm } from '@inertiajs/react'
import InputError from '@/Components/InputError'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import QuillEditor from '@/Components/Editors/QuillEditor'
import { CircleCheck, Loader } from 'lucide-react'
import FileUpload from '@/Components/FileUpload'
import { Plan } from '@/types'
import showToast from '@/utils/showToast'


export default function Create({
  planCategories = [],
  plan
}: {
  planCategories: any,
  plan: Plan
}) {

  const [quillValue, setQuillValue] = React.useState('');

  const [photo, setPhoto] = React.useState<File | null>(null);
  const [showUploader, setShowUploader] = React.useState(!plan);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    price: "",
    price_per: "",
    category: "",
    photo: null as File | string | null,
    description: "",
});

useEffect(() => {
  if (plan) {
    setData({
      name: plan.name,
      price: plan.price,
      price_per: plan.price_per,
      category: String(plan.category_id),
      photo: '',
      description: plan.description
    });
  }
  console.log(data)
}, [plan]);

const handleQuillChange = (value: string) => {
  setQuillValue(value);
  setData('description', value);
};

  const handleFileSelect = (files: File[]) => {
        // console.log(files);
        setData('photo', null);
        if (files.length > 0) {
            const file = files[0];
            setPhoto(file);
            setData('photo', file);
        }
    };

    const handleFileRemove = () => {
        setData('photo', null);
    };

    const isEditing = !!plan;
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
  
      const config = {
          create: {
              url: route('plans.store'),
              method: post,
              successMessage: "Plan created successfully",
              shouldReset: true
          },
          update: isEditing ? {
            url: route('plans.update', plan.slug), // Now safe to access plan.slug
            method: post,
            successMessage: "Plan updated successfully",
            shouldReset: false
        } : null
      };
  
      const mode = plan ? 'update' : 'create';
      // @ts-ignore
      const { url, method, successMessage, shouldReset } = config[mode];
  
      const formData = new FormData();
      if(data.photo){
          formData.append('photo', data.photo);
      }

      method(url, {
          forceFormData: true,
          preserveScroll: true,
          onSuccess: () => {
              if (shouldReset) {
                  reset();
                  setData('photo', null);
                  setPhoto(null);
              }
              showToast('success', successMessage, {position: 'bottom-right'});
          },
          onError: () => {
            showToast('error', 'Something went wrong', {position: 'bottom-right'});
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
                { label: 'Create', active: true }
              ]}
              />
             
             
        
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-12 col-span-12">
                  <div className="box">
                    <div className="box-body">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl mb-6">Create New Plan</h2>
                            
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm mb-1">Name <span className='text-red-500'>*</span></label>
                                  <Input
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    type="text"
                                    placeholder="Enter plan title"
                                    className="w-full px-3 py-2 border rounded-lg"
                                    style={{ height: 2.7 + 'rem' }}
                                  />
                                  <InputError message={errors.name} />
                                </div>
                                <div>
                                  <label className="block text-sm mb-1">Price <span className='text-red-500'>*</span></label>
                                  <Input
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    type="number"
                                    placeholder="Enter price"
                                    className="w-full px-3 py-2 border rounded-lg"
                                    style={{ height: 2.7 + 'rem' }}
                                  />
                                  <InputError message={errors.price} />
                                </div>
                                
                              </div>
                    
                              <div className="space-y-4">
                              <div>
                                  <label className="block text-sm mb-1">Category <span className='text-red-500'>*</span></label>
                                  <select 
                                  value={data.category} 
                                  onChange={(e) => setData('category', e.target.value)} 
                                  className="w-full px-3 py-2 border rounded-lg">
                                    <option value="" selected={true}>Select Category</option>
                                    {planCategories.map((category: any) => (
                                      <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                  </select>
                                  <InputError message={errors.category} />
                                </div>
                                <div>
                                  <label className="block text-sm mb-1">Price Per <span className='text-red-500'>*</span></label>
                                  <select 
                                  value={data.price_per} 
                                  onChange={(e) => setData('price_per', e.target.value)} 
                                  className="w-full px-3 py-2 border rounded-lg">
                                      <option value="" selected={true}>Price Per</option>
                                      <option value="Week">Week</option>
                                      <option value="Month">Month</option>
                                      <option value="Year">Year</option>
                                  </select>
                                  <InputError message={errors.price_per} />
                                </div>
                              </div>
                            </div>

                            <div className='mt-6'>
                            <label className="block text-sm mb-1">Plan Image <span className='text-red-500'>*</span></label>

                            {plan?.photo && !showUploader ? (
                              <div className="relative group w-fit">
                                <img
                                  src={typeof plan.photo === 'string' ? plan.photo : URL.createObjectURL(plan.photo)}
                                  alt="Selected"
                                  className='max-h-60 min-h-60 rounded-lg'
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
                                  <button 
                                    className="px-4 w-50 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 transition-colors"
                                    onClick={() => setShowUploader(true)}
                                  >
                                    Change Image
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <Suspense fallback={<Loader className="mx-auto" size={20} />}>
                                <FileUpload
                                  onFilesSelected={handleFileSelect}
                                  onFileRemove={handleFileRemove}
                                  multiple={false}
                                  acceptedTypes={['image/*']}
                                  maxSize={10 * 1024 * 1024} // 10MB
                                  showPreview={false} 
                                />
                                {photo && (
                                  <div className="flex items-center mt-2">
                                    <p className="font-medium text-sm flex">
                                      Selected File: <span className='text-primary ml-1'>{photo.name}</span>
                                      <CircleCheck size={18} className='ml-2 text-success mt-[1px]' />
                                    </p>
                                    <button 
                                      className="ml-4 text-sm text-gray-600 hover:text-gray-800"
                                      onClick={() => plan?.photo && setShowUploader(false)}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                )}
                              </Suspense>
                            )}
                            
                            <InputError message={errors.photo} />
                          </div>
                             <div className='mt-6'>
                            <label className="block text-sm mb-1">Plan Description <span className='text-red-500'>*</span></label>
                            <QuillEditor 
                              quillValue={data.description ?? ''}
                              setQuillValue={handleQuillChange} 
                             />
                             <InputError message={errors.description} />
                            </div>
                    
                            <div className="flex justify-between mt-6">
                              <button disabled={processing} onClick={handleSubmit} type="button" className="ti-btn ti-btn-primary w-full">
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
