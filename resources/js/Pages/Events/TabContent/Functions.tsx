import CustomToggle from '@/Components/Form/CustomToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/Components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { Toaster } from '@/Components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { useForm } from '@inertiajs/react'
import { Loader } from 'lucide-react'
import React, { useEffect } from 'react'

export default function Functions({event} : any) {

  const { toast } = useToast();
  const { data, setData, post, processing, errors, reset } = useForm({
    boomerang: event?.video_setting?.boomerang,
    slomo: event?.video_setting?.slomo,
    videos: parseInt(event?.video_setting?.videos),
    boomerang_repeats: event?.video_setting?.boomerang_repeats,
    boomerang_speed: event?.video_setting?.boomerang_speed,
    boomerang_bounce: event?.video_setting?.boomerang_bounce,
    slomo_recording_time: event?.video_setting?.slomo_recording_time,
    slomo_boomerang: event?.video_setting?.slomo_boomerang,
    speed: event?.video_setting?.speed,
});

useEffect(() => {
  setData('boomerang', event?.video_setting?.boomerang);
  setData('slomo', event?.video_setting?.slomo);
  setData('videos', event?.video_setting?.videos);
  setData('boomerang_repeats', event?.video_setting?.boomerang_repeats);
  setData('boomerang_speed', event?.video_setting?.boomerang_speed);
  setData('boomerang_bounce', event?.video_setting?.boomerang_bounce);
  setData('slomo_recording_time', event?.video_setting?.slomo_recording_time);
  setData('slomo_boomerang', event?.video_setting?.slomo_boomerang);
  setData('speed', event?.video_setting?.speed);
}, [event]);

const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  post(route('event.update.vedio.functions', event.slug),{
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
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <CustomToggle 
            label="Boomerang" 
            initialValue={data.boomerang} 
            onChange={(value) => setData('boomerang', value)} 
            />
        </div>
        <CustomToggle 
        label="Slomo" 
        initialValue={data.slomo} 
        onChange={(value) => setData('slomo', value)} 
        />
      </div>
      

      <div className="space-y-4">
      <CustomToggle 
        label="Videos" 
        initialValue={data.videos} 
        onChange={(value) => setData('videos', value ? 1 : 0)} 
        />
      </div>
    </div>

    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">

    <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
  <label className="block text-sm mb-1">Boomerang repeats</label>
        <Select value={data.boomerang_repeats} onValueChange={(value) => setData('boomerang_repeats', value)}>
      <SelectTrigger className="w-[180px] form-control border rounded-lg">
        <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className='form-control'>
            <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
  </div>
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label className="block text-sm mb-1">Boomerang speeds</label>
    <Input 
    value={data.boomerang_speed}
    onChange={(e) => setData('boomerang_speed', e.target.value)}
     type="number" min={0} className="form-control" id="input-text" />
  </div>



  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
  <label className="block text-sm mb-1"> Bounce duration</label>
  <Input 
  value={data.boomerang_bounce}
  onChange={(e) => setData('boomerang_bounce', e.target.value)}
  type="number" min={0} className="form-control" id="input-text" />
  </div>
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <label className="block text-sm mb-1">Slomo recording time</label>
    <Input 
    value={data.slomo_recording_time}
    onChange={(e) => setData('slomo_recording_time', e.target.value)}
    type="number" min={0} className="form-control" id="input-text" />
  </div>
  
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
  <label className="block text-sm mb-1">Slomo Boomerang</label>
        <Select value={data.slomo_boomerang} onValueChange={(value) => setData('slomo_boomerang', value)}>
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
    <Input 
    value={data.speed}
    onChange={(e) => setData('speed', e.target.value)}
    type="number" min={0} className="form-control" id="input-text" />
  </div>

  </div>
  <Button onClick={handleSubmit} disabled={processing}className='mt-4 ti-btn ti-btn-primary w-full'>
    {processing && <Loader className='mr-2 h-4 w-4 animate-spin'/>}Save</Button>
    <Toaster />
</div>
  )
}
