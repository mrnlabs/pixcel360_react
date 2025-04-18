import { Input } from '@/Components/ui/input'
import Logo from './Logo'
import { Button } from '@/Components/ui/button'
import { EventProps } from '@/types';
import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Loader } from 'lucide-react';
import showToast from '@/utils/showToast';

// Helper function to ensure color is in correct format
const ensureHexColor = (color: string | undefined, defaultColor: string = '#000000') => {
  if (!color) return defaultColor;
  // Check if it's a valid hex color (3 or 6 digits, with or without #)
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) {
    return color;
  }
  // If it's a valid hex without #
  if (/^([A-Fa-f0-9]{3}){1,2}$/.test(color)) {
    return `#${color}`;
  }
  return defaultColor;
};

export default function Branding({event} : EventProps) {
  const { data, setData, patch, processing, errors, reset } = useForm({
    gallery_name: "",
    text_button_color: "#000000", // Default black
    gallery_contact: "",
    webgallery_background: "#FFFFFF", // Default white
  });

  useEffect(() => {
    if (event?.setting) {
      setData({
        gallery_name: event.setting.gallery_name || '',
        text_button_color: ensureHexColor(event.setting.text_button_color ?? undefined, '#000000'),
        gallery_contact: event.setting.gallery_contact || '',
        webgallery_background: ensureHexColor(event.setting.webgallery_background ?? undefined, '#FFFFFF')
      });
    }
  }, [event]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    patch(route('event.update.vedio.branding', event?.slug), {
      preserveScroll: true,
      onSuccess: () => {
        showToast('success', 'Event updated successfully!', {position: 'bottom-right'});
      },
      onError: () => {
        showToast('error', 'Something went wrong!', {position: 'bottom-right'});
      }
    });
  };

  return (
    <div className="rounded-lg p-6">
      <div className="grid grid-cols-12 sm:gap-x-6 gap-y-6">
        <Logo event={event} />
        <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
          <label className='block text-sm mb-1' htmlFor="gallery-name">Gallery Name</label>
          <Input 
            value={data.gallery_name} 
            type="text" 
            id='gallery-name' 
            className="w-full px-3 py-2 border rounded-lg" 
            placeholder="Enter gallery name"
            onChange={(e) => setData('gallery_name', e.target.value)} 
          />
        </div>
        <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
          <label className='block text-sm mb-1' htmlFor="gallery-contact">Gallery Contact</label>
          <Input 
            value={data.gallery_contact} 
            type="number" 
            id='gallery-contact' 
            className="w-full px-3 py-2 border rounded-lg" 
            placeholder="Enter gallery contact"
            onChange={(e) => setData('gallery_contact', e.target.value)} 
          />
        </div>
        <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
          <label className='block text-sm mb-1' htmlFor="text_button_color">Text And Button Color</label>
          <div className="flex items-center gap-2">
            <input 
              id="text_button_color"
              value={data.text_button_color} 
              onChange={(e) => setData('text_button_color', e.target.value)} 
              type='color' 
              className='p-1 h-10 w-10 block bg-white dark:bg-bodybg border border-gray-200 cursor-pointer rounded-sm'
            />
          </div>
        </div>
        <div className="xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
          <label className='block text-sm mb-1' htmlFor="webgallery_background">Web Gallery Background</label>
          <div className="flex items-center gap-2">
            <Input 
              id='webgallery_background'
              value={data.webgallery_background} 
              onChange={(e) => setData('webgallery_background', e.target.value)} 
              type='color' 
              className='p-1 h-10 w-10 block bg-white dark:bg-bodybg border border-gray-200 cursor-pointer rounded-sm'
            />
          </div>
        </div>
      </div>
      <Button 
        onClick={handleSubmit} 
        disabled={processing} 
        className='mt-4 ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white w-full'>
        {processing && <Loader className="animate-spin mr-2" /> }
        Save
      </Button>
    </div>
  )
}