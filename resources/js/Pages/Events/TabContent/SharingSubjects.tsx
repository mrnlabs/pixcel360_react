import { Button } from '@/Components/ui/button'
import showToast from '@/utils/showToast';
import { Head, useForm } from '@inertiajs/react';
import { Loader } from 'lucide-react';
import { useEffect } from 'react';
export default function SharingSubjects({event} : any) {

   const { data, setData, patch, processing, errors, reset } = useForm({
               text_message: event?.sharing_subject?.text_message,
               email_subject: event?.sharing_subject?.email_subject,
               default_text_email: event?.sharing_subject?.default_text_email,
               webgallery_email_subject: event?.sharing_subject?.webgallery_email_subject,
               webgallery_email_message: event?.sharing_subject?.webgallery_email_message,
               social_share_description: event?.sharing_subject?.social_share_description,
         });
   
         useEffect(() => {
         setData('text_message', event?.sharing_subject?.text_message);
         setData('email_subject', event?.sharing_subject?.email_subject);
         setData('default_text_email', event?.sharing_subject?.default_text_email);
         setData('webgallery_email_subject', event?.sharing_subject?.webgallery_email_subject);
         setData('webgallery_email_message', event?.sharing_subject?.webgallery_email_message);
         setData('social_share_description', event?.sharing_subject?.social_share_description);
         }, [event]);

         const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            patch(route('event.update.vedio.subjects', event.slug),{
              preserveScroll: true,
              onSuccess: () => {
                reset();
                showToast('success', 'Settings updated successfully!', {position: 'bottom-right'});
              },
              onError: () => {
                showToast('error', 'Something went wrong', {position: 'bottom-right'});
              }
            });
          };

  return (
    <div className=" rounded-lg p-6">
      <Head title="Sharing Subjects" />
    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">

    <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="email-subject">Email Subject</label>
     <textarea value={data.email_subject} rows={2} id='email-subject' className="w-full px-3 py-2 border rounded-lg" placeholder="Enter subject"
        onChange={(e) => setData('email_subject', e.target.value)} 
        ></textarea>
     </div>
     <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="def-email-subject">Default Text (email)</label>
     <textarea value={data.default_text_email} rows={2} id='def-email-subject' className="w-full px-3 py-2 border rounded-lg" placeholder="Enter default text email"
         onChange={(e) => setData('default_text_email', e.target.value)} 
        ></textarea>
     </div>
     <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="def-message">Text message (SMS)</label>
     <textarea value={data.text_message} rows={2} id='def-message' className="w-full px-3 py-2 border rounded-lg" placeholder="Enter sms text message"
         onChange={(e) => setData('text_message', e.target.value)} 
        ></textarea>
     </div>
     <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="web-gallery">Web Gallery Email Subject</label>
     <textarea value={data.webgallery_email_subject} rows={2} id='web-gallery' className="w-full px-3 py-2 border rounded-lg" placeholder="Enter subject"
         onChange={(e) => setData('webgallery_email_subject', e.target.value)} 
        ></textarea>
     </div>
     <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="web-gallery-message">Web Gallery Email Message</label>
     <textarea value={data.webgallery_email_message} rows={2} id='web-gallery-message' className="w-full px-3 py-2 border rounded-lg" placeholder="Enter message"
         onChange={(e) => setData('webgallery_email_message', e.target.value)} 
        ></textarea>
     </div>
     <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="web-gallery-message">Social Share description</label>
     <textarea value={data.social_share_description} rows={2} id='web-gallery-message' className="w-full px-3 py-2 border rounded-lg" placeholder="Enter description"
         onChange={(e) => setData('social_share_description', e.target.value)} 
        ></textarea>
     </div>
  </div>
  <Button onClick={handleSubmit} disabled={processing} className='mt-4 ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white w-full'>
  {processing && <Loader className='mr-2 h-4 w-4 animate-spin'/>}Save</Button>
</div>
  )
}
