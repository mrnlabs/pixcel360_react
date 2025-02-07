import CustomToggle from '@/Components/Form/CustomToggle'
import { Button } from '@/components/ui/button'
import { Textarea } from '@headlessui/react'
export default function SharingSubjects({event} : any) {
  return (
    <div className=" rounded-lg p-6">
    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">

    <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="email-subject">Email Subject</label>
     <textarea rows={2} id='email-subject' className="w-full px-3 py-2 border rounded-lg" placeholder="Enter subject"
        onChange={(value) => console.log('Toggle value:', value)} 
        ></textarea>
     </div>
     <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="def-email-subject">Default Text (email)</label>
     <textarea rows={2} id='def-email-subject' className="w-full px-3 py-2 border rounded-lg" placeholder="Enter subject"
        onChange={(value) => console.log('Toggle value:', value)} 
        ></textarea>
     </div>
     <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="def-message">Text message (SMS)</label>
     <textarea rows={2} id='def-message' className="w-full px-3 py-2 border rounded-lg" placeholder="Enter sms text message"
        onChange={(value) => console.log('Toggle value:', value)} 
        ></textarea>
     </div>
     <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="web-gallery">Web Gallery Email Subject</label>
     <textarea rows={2} id='web-gallery' className="w-full px-3 py-2 border rounded-lg" placeholder="Enter subject"
        onChange={(value) => console.log('Toggle value:', value)} 
        ></textarea>
     </div>
     <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="web-gallery-message">Web Gallery Email Message</label>
     <textarea rows={2} id='web-gallery-message' className="w-full px-3 py-2 border rounded-lg" placeholder="Enter message"
        onChange={(value) => console.log('Toggle value:', value)} 
        ></textarea>
     </div>
     <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="web-gallery-message">Social Share description</label>
     <textarea rows={2} id='web-gallery-message' className="w-full px-3 py-2 border rounded-lg" placeholder="Enter description"
        onChange={(value) => console.log('Toggle value:', value)} 
        ></textarea>
     </div>
  </div>
  <Button className='mt-4 ti-btn ti-btn-primary w-full'>Save</Button>
</div>
  )
}
