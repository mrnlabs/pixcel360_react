import React, { useEffect } from 'react'
import { Input } from '@/Components/ui/input'
import { Head, useForm } from '@inertiajs/react'
import { useToast } from '@/hooks/use-toast'
import InputError from '@/Components/InputError'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import CountrySelector from '../Profile/CountrySelector'
import QuillEditor from '@/Components/Editors/QuillEditor'

type PlanCategory = {
    planCategories: any;
}

export default function Create({planCategories}: PlanCategory) {
  const { toast } = useToast();

  const [quillValue, setQuillValue] = React.useState('');

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    price: "",
    price_per: "",
    category: "",
    description: "",
});

const handleQuillChange = (value: string) => {
  setQuillValue(value);
  setData('description', value);
};

const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  post(route('plans.store'),{
    preserveScroll: true,
    onSuccess: () => {
      reset();
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
};
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
                                  <label className="block text-sm mb-1">Price</label>
                                  <Input
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    type="text"
                                    placeholder="Enter price"
                                    className="w-full px-3 py-2 border rounded-lg"
                                    style={{ height: 2.7 + 'rem' }}
                                  />
                                  <InputError message={errors.price} />
                                </div>
                                
                              </div>
                    
                              <div className="space-y-4">
                              <div>
                                  <label className="block text-sm mb-1">Category</label>
                                  <select 
                                  value={data.category} 
                                  onChange={(e) => setData('category', e.target.value)} 
                                  className="w-full px-3 py-2 border rounded-lg">
                                    <option value="" selected={true}>Select Category</option>
                                    {planCategories.map((category: any) => (
                                      <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                  </select>
                                </div><div>
                                  <label className="block text-sm mb-1">Price Per</label>
                                  <select 
                                  value={data.price_per} 
                                  onChange={(e) => setData('price_per', e.target.value)} 
                                  className="w-full px-3 py-2 border rounded-lg">
                                      <option value="" selected={true}>Price Per</option>
                                      <option value="Week">Week</option>
                                      <option value="Month">Month</option>
                                      <option value="Year">Year</option>
                                   
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className='mt-6'>
                            <label className="block text-sm mb-1">Plan Description</label>
                            <QuillEditor 
                              quillValue={data.description ?? ''}
                              setQuillValue={handleQuillChange} 
                             />
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
