import CustomToggle from '@/Components/Form/CustomToggle'
import { Input } from '@/Components/ui/input'
import { Textarea } from '@headlessui/react'
import Logo from './Logo'
import { Button } from '@/components/ui/button'
export default function Branding({event} : any) {
  return (
    <div className=" rounded-lg p-6">
    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
   <Logo/>
    <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="email-subject">Gallery Name</label>
     <Input type="text" id='email-subject' className="w-full px-3 py-2 border rounded-lg" placeholder="Enter gallery name"
        onChange={(value) => console.log('Toggle value:', value)} 
        />
     </div>
     <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="def-email-subject">Text and button color</label>
      <input type='color' className='p-1 h-10 w-10 block bg-white dark:bg-bodybg border border-gray-200 cursor-pointer rounded-sm'/>
     </div>
     <div className="xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12 col-span-12">
      <label className='block text-sm mb-1' htmlFor="def-message">Text message (SMS)</label>
     <textarea rows={2} id='def-message' className="w-full px-3 py-2 border rounded-lg" placeholder="Enter sms text message"
        onChange={(value) => console.log('Toggle value:', value)} 
        ></textarea>
     </div>
  </div>
     <Button className='mt-4 ti-btn ti-btn-primary w-full'>Save</Button>
</div>
  )
}
