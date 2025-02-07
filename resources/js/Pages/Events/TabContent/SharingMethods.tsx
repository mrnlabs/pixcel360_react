import CustomToggle from '@/Components/Form/CustomToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/Components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select'
import React from 'react'

export default function SharingMethods({event} : any) {
  return (
    <div className=" rounded-lg p-6">
    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">

    <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12">
     <CustomToggle 
        label="Email" 
        initialValue={false} 
        onChange={(value) => console.log('Toggle value:', value)} 
        />
  </div>
  <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12">
  <CustomToggle 
        label="SMS" 
        initialValue={false} 
        onChange={(value) => console.log('Toggle value:', value)} 
        />
  </div>
  <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12">
  <CustomToggle 
        label="Download" 
        initialValue={false} 
        onChange={(value) => console.log('Toggle value:', value)} 
        />
  </div>
  <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12">
  <CustomToggle 
        label="Airdrop" 
        initialValue={false} 
        onChange={(value) => console.log('Toggle value:', value)} 
        />
  </div>
  <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12">
  <CustomToggle 
        label="QR" 
        initialValue={false} 
        onChange={(value) => console.log('Toggle value:', value)} 
        />
  </div>
   <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12">
  <CustomToggle 
        label="General" 
        initialValue={false} 
        onChange={(value) => console.log('Toggle value:', value)} 
        />
  </div>
  <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12">
  <CustomToggle 
        label="Whatsapp" 
        initialValue={false} 
        onChange={(value) => console.log('Toggle value:', value)} 
        />
  </div>
  <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12">
  <CustomToggle 
        label="In-app gallery" 
        initialValue={false} 
        onChange={(value) => console.log('Toggle value:', value)} 
        />
  </div>
  </div>
  <Button className='mt-4 ti-btn ti-btn-primary w-full'>Save</Button>
</div>
  )
}
