import React, { useEffect, useState } from 'react'
import { Input } from '@/Components/ui/input'
import { Head, Link, useForm } from '@inertiajs/react'
import InputError from '@/Components/InputError'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import QuillEditor from '@/Components/Editors/QuillEditor'
import showToast from '@/utils/showToast'
import { Loader } from 'lucide-react'
import FileUpload from '@/Components/FileUpload'
import { browserName, osName } from 'react-device-detect';


export default function Create({issue_categories,issue}: any) {

    useEffect(() => {
        if (issue) {
            setData('title', issue.title);
            setData('category', issue.category);
            setData('description', issue.description);
        }
    }, [issue]);

  const [quillValue, setQuillValue] = React.useState('');

  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    category: "",
    description: "",
    browser: browserName,
    osName: osName,
    screenshots: [] as File[]
});

const handleQuillChange = (value: string) => {
  setQuillValue(value);
  setData('description', value);
};


const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
    post(route('issues.store'),{
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setQuillValue('');
        setData('screenshots', []);
        showToast('success', 'Ticket created successfully!', {position: 'bottom-right'});
      },
      onError: () => {
        showToast('error', 'Something went wrong!', {position: 'bottom-right'});
      }
    });
};

const handleFileSelect = (files: File[]) => {
  if (files.length === 0) { 
      showToast('error', 'Please select at least one file.', {position: 'bottom-right'});
      return;
  }
  setData('screenshots', files);
};

const handleFileRemove = () => {
  setData('screenshots', []);
};

  return (
    <Authenticated>
          <Head title="Dashboard" />
          <div className="main-content app-content">
            <div className="container-fluid">
             <Breadcrumb
             items={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Issues', href: '/issues' },
                { label: 'Create', active: true }
              ]}
              />
             
             
        
              <div className="grid grid-cols-12 gap-x-6">
                <div className="xxl:col-span-12 col-span-12">
                  <div className="box">
                    <div className="box-body">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl mb-6">{issue ? 'Ticket Details' : 'Create New Ticket'}</h2>
                            
                            <div className="grid grid-cols-1 w-full md:gap-6 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm mb-1">Title <span className='text-red-500'>*</span></label>
                                  <Input
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    type="text"
                                    placeholder="Title"
                                    className="w-full px-3 py-2 border rounded-lg"
                                  />
                                  <InputError message={errors.title} />
                                </div>

                                
                                <div>
                                  <label className="block text-sm mb-1">Issue Type</label>
                                  <select 
                                  value={data.category} 
                                  onChange={(e) => setData('category', e.target.value)} 
                                  className="w-full px-3 py-2 border rounded-lg">
                                    <option value="" selected disabled>Select Issue Type</option>
                                    {issue_categories.map((category: any) => (
                                      <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                  </select>
                                    <InputError message={errors.category} />
                                </div>
                              </div>
                            </div>

                            <div className='mt-6'>
                            <label className="block text-sm mb-1"> Describe your issue</label>
                            <QuillEditor 
                              quillValue={data.description ?? ''}
                              setQuillValue={handleQuillChange} 
                             />
                            </div>
                        {!issue && (
                            <>
                            <div className='mt-6'>
                            {/* <label className="block text-sm mb-1"> Describe your issue</label> */}
                            <FileUpload
                                iconType="image"
                                dropzoneText="Drag and drop screenshots or click to browse"
                                    onFilesSelected={handleFileSelect}
                                    onFileRemove={handleFileRemove}
                                    multiple={true}
                                    acceptedTypes={['image/png']}
                                    maxSize={2 * 1024 * 1024} // 2MB
                                    showPreview={false} 
                                />
                                {Array.isArray(data.screenshots) && data.screenshots.length > 0 && (
                                    <span>Uploaded {data.screenshots.length} screenshots</span>
                                )}
                            </div>

                            <div className="flex justify-between mt-6">
                            <button disabled={processing} onClick={handleSubmit} type="button" className="ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white w-full">
                                {processing && <Loader className='animate-spin mr-2'/>} Submit</button>
                            </div>
                            </>
                        )}

                        {issue && issue.screenshots.length > 0 && (
                          <div className="grid grid-cols-12 mt-2">
                            <div>Screenshots</div>
                          {issue.screenshots.map((screenshot: any) => (     
                             <div key={screenshot} className="xl:col-span-3 col-span-12">
                              <div className="box !w-[75%]">
                                <div className="box-header">
                                  <div className="box-title">
                                    <img src={screenshot} alt="screenshot"/>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        )}
                            
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
