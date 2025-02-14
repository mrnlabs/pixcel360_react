import React, { Suspense, useEffect } from 'react'
import { Input } from '@/Components/ui/input'
import { Head, useForm } from '@inertiajs/react'
import { useToast } from '@/hooks/use-toast'
import InputError from '@/Components/InputError'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import CountrySelector from '../Profile/CountrySelector'
import QuillEditor from '@/Components/Editors/QuillEditor'
import { Toaster } from '@/Components/ui/toaster'
import { CircleCheck, Loader } from 'lucide-react'
import FileUpload from '@/Components/FileUpload'

type PlanCategory = {
    planCategories: any;
}

export default function Create({planCategories}: PlanCategory) {
  const { toast } = useToast();

  const [quillValue, setQuillValue] = React.useState('');

  const [photo, setPhoto] = React.useState<File | null>(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    price: "",
    price_per: "",
    category: "",
    photo: null as File | null,
    description: "",
});

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

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      // console.log(data);return
      const formData = new FormData();
      if(data.photo){formData.append('photo', data.photo);}
      post(route('plans.store'), {
          forceFormData: true,
          preserveScroll: true,
          onSuccess: () => {
              reset();
              setData('photo', null);
              setPhoto(null);
              toast({
                  title: "Success",
                  description: "Plan created successfully",
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
                            <Suspense fallback={<Loader className="mx-auto" size={20} />}>
                                <FileUpload
                                    onFilesSelected={handleFileSelect}
                                    onFileRemove={handleFileRemove}
                                    multiple={false}
                                    acceptedTypes={['image/*']}
                                    maxSize={10 * 1024 * 1024} // 10MB
                                    showPreview={false} 
                                />
                                {photo && <p className="font-medium mt-2 text-sm flex">Selected File: <span className='text-primary ml-1'> {photo.name}</span>
                                <CircleCheck size={18} className='ml-2 text-success mt-[1px]' />
                                </p>}
                            </Suspense>
                             <InputError message={errors.description} />
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
          <Toaster/>
        </Authenticated>
  )
}
