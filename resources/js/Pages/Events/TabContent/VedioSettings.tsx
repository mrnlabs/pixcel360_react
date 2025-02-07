import CustomToggle from '@/Components/Form/CustomToggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/Components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { Toaster } from '@/Components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { useForm } from '@inertiajs/react'
import { Loader } from 'lucide-react'
import React, { useEffect } from 'react'

export default function VedioSettings({event} : any) {
    const { toast } = useToast();
    const { data, setData, patch, processing, errors, reset } = useForm({
      count_down: event?.setting?.count_down,
      mirror_overlay: event?.setting?.mirror_overlay,
      beep_sounds: event?.setting?.beep_sounds,
      camera_exposure: event?.setting?.camera_exposure,
      qr_app_protection: event?.setting?.qr_app_protection,
      front_rear_camera: event?.setting?.front_rear_camera,
  });

  useEffect(() => {
    setData('count_down', event?.setting?.count_down);
    setData('mirror_overlay', event?.setting?.mirror_overlay);
    setData('beep_sounds', event?.setting?.beep_sounds);
    setData('camera_exposure', event?.setting?.camera_exposure);
    setData('qr_app_protection', event?.setting?.qr_app_protection);
    setData('front_rear_camera', event?.setting?.front_rear_camera);
  }, [event]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(data);
    patch(route('event.update.vedio.settings', event.slug),{
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
          <label className="block text-sm mb-1">Countdown</label>
          <Input
            value={data.count_down}
            onChange={(e) => setData('count_down', e.target.value)}
            type="number"
            min={0}
            className="w-full px-3 py-2 border rounded-lg"
        />
        </div>
        <CustomToggle 
        label="Mirror overlay preview" 
        initialValue={data.mirror_overlay} 
        onChange={(value) => setData('mirror_overlay', value ? 1 : 0)} 
        />
      </div>

      <div className="space-y-4">
        <CustomToggle 
        label="Beep sounds" 
        initialValue={data.beep_sounds} 
        onChange={(value) => setData('beep_sounds', value ? 1 : 0)} 
        />
      </div>
    </div>

    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <CustomToggle 
        label="Camera exposure menu" 
        initialValue={data.camera_exposure} 
        onChange={(value) => setData('camera_exposure', value ? 1 : 0)} 
        />
  </div>
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
     <CustomToggle 
        label="QR app protection" 
        initialValue={data.qr_app_protection} 
        onChange={(value) => setData('qr_app_protection', value ? 1 : 0)} 
        />
  </div>
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
  <label className="block text-sm mb-1">Front or rear camera</label>
        <Select value={data.front_rear_camera} onValueChange={(value) => setData('front_rear_camera', value)}>
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
    <Toaster />
  </div>
  <Button onClick={handleSubmit} disabled={processing} className='mt-4 ti-btn ti-btn-primary w-full'>
    {processing && <Loader className='mr-2 h-4 w-4 animate-spin'/>}Save</Button>
</div>
  )
}
