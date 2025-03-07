import { Input } from '@/Components/ui/input'
import Logo from './Logo'
import { Button } from '@/Components/ui/button'
import { EventProps } from '@/types';
import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Loader } from 'lucide-react';
import showToast from '@/utils/showToast';
export default function Branding({event} : EventProps) {

   useEffect(() => {
     setData('gallery_name', event?.setting?.gallery_name ?? '');
     setData('text_button_color', event?.setting?.text_button_color ?? '');
   }, [event]);
 
   const { data, setData, patch, processing, errors, reset } = useForm({
     gallery_name: "",
     text_button_color: "",
 });

 const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
   e.preventDefault();
   patch(route('event.update.vedio.branding', event?.slug),{
     preserveScroll: true,
     onSuccess: () => {
       reset();
       showToast('success', 'Event updated successfully!', {position: 'bottom-right'});
     },
     onError: () => {
       showToast('error', 'Something went wrong!', {position: 'bottom-right'});
     }
   });
 };

  return (
    <div className=" rounded-lg p-6">
    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
   <Logo/>
    <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="gallery-name">Gallery Name</label>
     <Input value={data.gallery_name} type="text" id='gallery-name' className="w-full px-3 py-2 border rounded-lg" placeholder="Enter gallery name"
        onChange={(e) => setData('gallery_name',e.target.value)} 
        />
     </div>
     <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="def-email-subject">Text and button color</label>
      <Input value={data.text_button_color} onChange={(e) => setData('text_button_color',e.target.value)} 
       type='color' className='p-1 h-10 w-10 block bg-white dark:bg-bodybg border border-gray-200 cursor-pointer rounded-sm'/>
     </div>
  </div>
     <Button onClick={handleSubmit} disabled={processing} className='mt-4 ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white w-full'>
     {processing && <Loader className="animate-spin mr-2" /> }Save</Button>
    
</div>
  )
}
