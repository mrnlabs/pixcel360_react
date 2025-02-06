import React, { useEffect } from 'react'
import { Input } from '@/Components/ui/input'
import { Head, useForm } from '@inertiajs/react'
import { useToast } from '@/hooks/use-toast'
import InputError from '@/Components/InputError'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import CountrySelector from '../../Profile/CountrySelector'
import QuillEditor from '@/Components/Editors/QuillEditor'
import { Loader } from 'lucide-react'
import { Toaster } from '@/Components/ui/toaster'


export default function EditDetails({event} : any) {
  const { toast } = useToast();

  useEffect(() => {
    setData('name', event.name);
    setData('start_date', event.start_date);
    setData('end_date', event.end_date);
    setData('country', event.country);
    setData('language', event.language);
    setData('description', event.description);
  }, [event]);

  const [quillValue, setQuillValue] = React.useState('');

  const { data, setData, patch, processing, errors, reset } = useForm({
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
  console.log(data);
  patch(route('event.update', event.slug),{
    preserveScroll: true,
    onSuccess: () => {
      reset();
      toast({
        title: "Success",
        description: "Event updated successfully",
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
   
   
    <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-2 gap-6">
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
            <QuillEditor 
              quillValue={data.description ?? ''}
              setQuillValue={handleQuillChange} 
             />
            </div>
    
            <div className="flex justify-between mt-6">
              <button disabled={processing} onClick={handleSubmit} type="button" className="ti-btn ti-btn-primary w-full">
                {processing && <Loader className="animate-spin mr-2" /> }Save</button>
            </div>
            <Toaster />
          </div>
  )
}
