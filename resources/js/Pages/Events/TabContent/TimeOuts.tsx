import CustomToggle from '@/Components/Form/CustomToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/Components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select'
import React from 'react'

export default function TimeOuts({event} : any) {
  return (
    <div className=" rounded-lg p-6">
    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">

    <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
  <label className="block text-sm mb-1">Editing</label>
        <Select>
      <SelectTrigger className="w-[160px] form-control border rounded-lg">
        <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className='form-control'>
            <SelectGroup>           
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
  </div>
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label className="block text-sm mb-1">Sharing</label>
    <Select>
      <SelectTrigger className="w-[160px] form-control border rounded-lg">
        <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className='form-control'>
            <SelectGroup>           
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
  </div>



  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
  <label className="block text-sm mb-1">Thanks</label>
    <Select>
      <SelectTrigger className="w-[160px] form-control border rounded-lg">
        <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className='form-control'>
            <SelectGroup>           
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
  </div>
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
  <label className="block text-sm mb-1">Props</label>
    <Select>
      <SelectTrigger className="w-[160px] form-control border rounded-lg">
        <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className='form-control'>
            <SelectGroup>           
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
  </div>
  
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
  <label className="block text-sm mb-1">Slomo Boomerang</label>
        <Select>
      <SelectTrigger className="w-[180px] form-control border rounded-lg">
        <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className='form-control'>
            <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="0">Yes</SelectItem>
            <SelectItem value="1">No</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
  </div>
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label className="block text-sm mb-1">Slomo Speed</label>
    <Input type="number" min={0} className="form-control" id="input-text" />
  </div>

    
  </div>
  <Button className='mt-4 ti-btn ti-btn-primary w-full'>Save</Button>
</div>
  )
}
