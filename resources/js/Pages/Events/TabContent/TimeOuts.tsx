import CustomToggle from '@/Components/Form/CustomToggle'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { Toaster } from '@/Components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { useForm } from '@inertiajs/react'
import { Loader } from 'lucide-react'
import React, { useEffect } from 'react'

export default function TimeOuts({event} : any) {

  const { toast } = useToast();
  const { data, setData, patch, processing, errors, reset } = useForm({
    editing: event?.boomerang_setting?.editing ?? 0,
    sharing: event?.boomerang_setting?.sharing ?? 0,
    props: event?.boomerang_setting?.props ?? 0,
    thanks: event?.boomerang_setting?.thanks ?? 0,
    slomo_boomerang: event?.boomerang_setting?.slomo_boomerang ?? 0,
    boomerang_speed: event?.boomerang_setting?.boomerang_speed ?? 0,
});

useEffect(() => {
  setData('editing', event?.boomerang_setting?.editing);
  setData('sharing', event?.boomerang_setting?.sharing);
  setData('props', event?.boomerang_setting?.props);
  setData('thanks', event?.boomerang_setting?.thanks);
  setData('slomo_boomerang', event?.boomerang_setting?.slomo_boomerang);
  setData('boomerang_speed', event?.boomerang_setting?.boomerang_speed);
}, [event]);

 const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
   
    patch(route('event.update.vedio.timeouts', event.slug),{
      preserveScroll: true,
      onSuccess: () => {
        reset();
        toast({
          title: "Success",
          description: "Settings updated successfully",
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
    <div className=" rounded-lg p-6">
    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">

    <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
  <label className="block text-sm mb-1">Editing</label>
        <Select value={data.editing} onValueChange={(value) => setData('editing', value)}>
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
    <Select value={String(data.sharing)} onValueChange={(value) => setData('sharing', value)}>
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
    <Select value={String(data.thanks)} onValueChange={(value) => setData('thanks', value)}>
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
    <Select value={String(data.props)} onValueChange={(value) => setData('props', value)}>
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
        <Select value={data.slomo_boomerang} onValueChange={(value) => setData('slomo_boomerang', value)}>
      <SelectTrigger className="w-[180px] form-control border rounded-lg">
        <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className='form-control'>
            <SelectGroup>
            <SelectLabel>Slomo Boomerang</SelectLabel>
            <SelectItem value="1">Yes</SelectItem>
            <SelectItem value="0">No</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
  </div>
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label className="block text-sm mb-1">Slomo Speed</label>
    <Input value={data.boomerang_speed} onChange={(e) => setData('boomerang_speed', e.target.value)} type="number" min={0} className="form-control" id="input-text" />
  </div>
<Toaster/>
    
  </div>
  <Button onClick={handleSubmit} disabled={processing} className='mt-4 ti-btn ti-btn-primary w-full'>
  {processing && <Loader className='mr-2 h-4 w-4 animate-spin'/>}Save</Button>
</div>
  )
}
