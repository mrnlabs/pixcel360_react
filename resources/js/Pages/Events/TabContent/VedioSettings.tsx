import CustomToggle from '@/Components/Form/CustomToggle'
import { Input } from '@/Components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select'
import React from 'react'

export default function VedioSettings() {
  return (
    <div className=" rounded-lg p-6">
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Countdown</label>
          <Input
            // value={data.name}
            // onChange={(e) => setData('name', e.target.value)}
            type="number"
            min={0}
            className="w-full px-3 py-2 border rounded-lg"
        />
        </div>
        <CustomToggle 
        label="Mirror overlay preview" 
        initialValue={false} 
        onChange={(value) => console.log('Toggle value:', value)} 
        />
      </div>

      <div className="space-y-4">
      <CustomToggle 
        label="Countdown" 
        initialValue={false} 
        onChange={(value) => console.log('Toggle value:', value)} 
        />
        <CustomToggle 
        label="Beep sounds" 
        initialValue={false} 
        onChange={(value) => console.log('Toggle value:', value)} 
        />
      </div>
    </div>

    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <CustomToggle 
        label="Camera exposure menu" 
        initialValue={false} 
        onChange={(value) => console.log('Toggle value:', value)} 
        />
  </div>
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
     <CustomToggle 
        label="QR app protection" 
        initialValue={false} 
        onChange={(value) => console.log('Toggle value:', value)} 
        />
  </div>
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
  <label className="block text-sm mb-1">Front or rear camera</label>
        <Select>
      <SelectTrigger className="w-[180px] form-control border rounded-lg">
        <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className='form-control'>
            <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="0">Front</SelectItem>
            <SelectItem value="1">Back</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
  </div>
    
  </div>
</div>
  )
}
