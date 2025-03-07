import CustomToggle from '@/Components/Form/CustomToggle'
import { Button } from '@/Components/ui/button'
import showToast from '@/utils/showToast'
import { useForm } from '@inertiajs/react'
import { Loader } from 'lucide-react'
import { useEffect } from 'react'

export default function SharingMethods({event} : any) {

      const { data, setData, patch, processing, errors, reset } = useForm({
            email: event?.sharing_method?.email,
            sms: event?.sharing_method?.sms,
            download: event?.sharing_method?.download,
            airdrop: event?.sharing_method?.airdrop,
            qr: event?.sharing_method?.qr,
            general: event?.sharing_method?.general,
            whatsapp: event?.sharing_method?.whatsapp,
            inappgallery: event?.sharing_method?.inappgallery,
      });

      useEffect(() => {
      setData('email', event?.sharing_method?.email);
      setData('sms', event?.sharing_method?.sms);
      setData('download', event?.sharing_method?.download);
      setData('airdrop', event?.sharing_method?.airdrop);
      setData('qr', event?.sharing_method?.qr);
      setData('general', event?.sharing_method?.general);
      setData('whatsapp', event?.sharing_method?.whatsapp);
      setData('inappgallery', event?.sharing_method?.inappgallery);
      }, [event]);

      const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        patch(route('event.update.vedio.sharing.methods', event.slug),{
          preserveScroll: true,
          onSuccess: () => {
            reset();
            showToast('success', 'Settings updated successfully!', {position: 'bottom-right'});
          },
          onError: () => {
            showToast('error', 'Something went wrong!', {position: 'bottom-right'});
          }
        });
      };

  return (
    <div className=" rounded-lg p-6">
    <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">

    <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12">
     <CustomToggle 
        label="Email" 
        initialValue={data.email} 
        onChange={(value) => setData('email', value ? 1 : 0)} 
        />
  </div>
  <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12">
  <CustomToggle 
        label="SMS" 
        initialValue={data.sms} 
        onChange={(value) => setData('sms', value ? 1 : 0)} 
        />
  </div>
  <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12">
  <CustomToggle 
        label="Download" 
        initialValue={data.download} 
        onChange={(value) => setData('download', value ? 1 : 0)} 
        />
  </div>
  <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12">
  <CustomToggle 
        label="Airdrop" 
        initialValue={data.airdrop} 
        onChange={(value) => setData('airdrop', value ? 1 : 0)} 
        />
  </div>
  <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12">
  <CustomToggle 
        label="QR" 
        initialValue={data.qr} 
        onChange={(value) => setData('qr', value ? 1 : 0)} 
        />
  </div>
   <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12">
  <CustomToggle 
        label="General" 
        initialValue={data.general} 
        onChange={(value) => setData('general', value ? 1 : 0)} 
        />
  </div>
  <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12">
  <CustomToggle 
        label="Whatsapp" 
        initialValue={data.whatsapp} 
        onChange={(value) => setData('whatsapp', value ? 1 : 0)} 
        />
  </div>
  <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-12 col-span-12">
  <CustomToggle 
        label="In-app gallery" 
        initialValue={data.inappgallery} 
        onChange={(value) => setData('inappgallery', value ? 1 : 0)} 
        />
  </div>
  </div>
  <Button onClick={handleSubmit} disabled={processing} 
   className='mt-4 ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white w-full'>
  {processing && <Loader className='mr-2 h-4 w-4 animate-spin'/>}Save</Button>
</div>
  )
}
