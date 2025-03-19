import CustomToggle from '@/Components/Form/CustomToggle'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select'
import showToast from '@/utils/showToast'
import { useForm } from '@inertiajs/react'
import { Loader } from 'lucide-react'
import React, { useEffect } from 'react'

export default function VedioSettings({event} : any) {
  
    const { data, setData, patch, processing, errors, reset } = useForm({
      count_down: event?.setting?.count_down,
      mirror_overlay: event?.setting?.mirror_overlay,
      beep_sounds: event?.setting?.beep_sounds,
      flash: event?.setting?.flash,
      camera_exposure: event?.setting?.camera_exposure,
      qr_app_protection: event?.setting?.qr_app_protection,
      front_rear_camera: event?.setting?.front_rear_camera,
  });

  useEffect(() => {
    setData('count_down', event?.setting?.count_down);
    setData('mirror_overlay', event?.setting?.mirror_overlay);
    setData('beep_sounds', event?.setting?.beep_sounds);
    setData('flash', event?.setting?.flash);
    setData('camera_exposure', event?.setting?.camera_exposure);
    setData('qr_app_protection', event?.setting?.qr_app_protection);
    setData('front_rear_camera', event?.setting?.front_rear_camera);
  }, [event]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    patch(route('event.update.vedio.settings', event.slug),{
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <label className="block text-sm mb-1">Countdown Video</label>
              <Select value={String(data.count_down)} onValueChange={(value) => setData('count_down', value)}>
            <SelectTrigger className="w-[180px] form-control border rounded-lg">
              <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className='form-control'>
                  <SelectGroup>
                  <SelectLabel>Select </SelectLabel>
                  {[...Array(11).keys()].map((i) => (
                    <SelectItem key={i} value={String(i + 1)}>{i + 1}s</SelectItem>
                  ))}
                  </SelectGroup>
              </SelectContent>
          </Select>
  </div>
  
       
      </div>

      <div className="space-y-4">
        <CustomToggle 
        label="Enable Beep sounds" 
        initialValue={data.beep_sounds} 
        onChange={(value) => setData('beep_sounds', value ? 1 : 0)} 
        />
      </div>

      

    </div>


    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div className="space-y-4">
        <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
        <CustomToggle 
        label="Mirror overlay preview" 
        initialValue={data.mirror_overlay} 
        onChange={(value) => setData('mirror_overlay', value ? 1 : 0)} 
        />
  </div>
      </div>

      <div className="space-y-4">
        <CustomToggle 
        label="Enable Flash Light" 
        initialValue={data.flash} 
        onChange={(value) => setData('flash', value ? 1 : 0)} 
        />
      </div>

      

    </div>



    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6 mt-4">
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
    <CustomToggle 
        label="Enable Camera exposure menu" 
        initialValue={data.camera_exposure} 
        onChange={(value) => setData('camera_exposure', value ? 1 : 0)} 
        />
  </div>
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
     <CustomToggle 
        label="Enable QR app protection" 
        initialValue={data.qr_app_protection} 
        onChange={(value) => setData('qr_app_protection', value ? 1 : 0)} 
        />
  </div>
  <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
  <label className="block text-sm mb-1">Front or rear camera</label>
        <Select value={String(data.front_rear_camera)} onValueChange={(value) => setData('front_rear_camera', value)}>
      <SelectTrigger className="w-[180px] form-control border rounded-lg">
        <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className='form-control'>
            <SelectGroup>
            <SelectLabel>Camera</SelectLabel>
            <SelectItem value="0">Front</SelectItem>
            <SelectItem value="1">Back</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
  </div>
  </div>
  <Button onClick={handleSubmit} disabled={processing} className='mt-4 ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white w-full'>
    {processing && <Loader className='mr-2 h-4 w-4 animate-spin'/>}Save</Button>
</div>
  )
}
