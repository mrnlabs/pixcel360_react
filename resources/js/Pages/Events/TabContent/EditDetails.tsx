import React, { useEffect } from 'react'
import { Input } from '@/Components/ui/input'
import { useForm } from '@inertiajs/react'
import InputError from '@/Components/InputError'
import CountrySelector from '../../Profile/CountrySelector'
import QuillEditor from '@/Components/Editors/QuillEditor'
import { Loader } from 'lucide-react'
import showToast from '@/utils/showToast'


export default function EditDetails({event} : any) {

  useEffect(() => {
    setData('name', event.name);
    setData('start_date', event.start_date);
    setData('end_date', event.end_date);
    setData('country', event.country);
    setData('language', event.language);
    setData('description', event.description);
    setData('enable_start_end_date',event.enable_start_end_date)
  }, [event]);

  const [quillValue, setQuillValue] = React.useState('');

  const { data, setData, patch, processing, errors, reset } = useForm({
    name: "",
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

const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  console.log(data);
  patch(route('event.update', event.slug),{
    preserveScroll: true,
    onSuccess: () => {
      reset();
      showToast('success', 'Event details updated successfully!', {position: 'bottom-right'});
    },
    onError: () => {
      showToast('error', 'Something went wrong!', {position: 'bottom-right'});
    }
  });
};
  return (
   
   
    <div className="bg-white rounded-lg shadow-sm p-6" id="event-details">
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
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
        {data.enable_start_end_date ? (
        <div>
          <label className="block text-sm mb-1">Set the start time of the event</label>
          <Input
            value={data.start_date}
            onChange={(e) => setData('start_date', e.target.value)}
            type="datetime-local"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
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
        {data.enable_start_end_date ? (
        <div>
          <label className="block text-sm mb-1">Set the end time of the event</label>
          <Input
            value={data.end_date}
            onChange={(e) => setData('end_date', e.target.value)}
            type="datetime-local"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        ): ''}
      </div>
    </div>
  
    <div className='mt-6'>
      <QuillEditor 
        quillValue={data.description ?? ''}
        setQuillValue={handleQuillChange} 
      />
    </div>
  
    <div className="flex justify-between mt-6">
      <button disabled={processing} onClick={handleSubmit} type="button" className="ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white w-full">
        {processing && <Loader className="animate-spin mr-2" />}Save
      </button>
    </div>
  </div>
  )
}
