import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import HeaderCard from './Dashboard/HeaderCard';
import { Breadcrumb } from '@/Shared/Breadcrumb';
import { DashboardProps } from '@/types';
import DBarChart from './Charts/DBarChart';
import showToast from '@/utils/showToast';
import { Suspense, useEffect } from 'react';
import { Loader } from 'lucide-react';
import EventCard from './Dashboard/EventCard';

export default function Dashboard({ metrics: { metrics, userAnalytics },events }: DashboardProps) {
  // @ts-ignore
  const user = usePage().props.auth.user;

  useEffect(() => {
    // Parse the current URL
    const url = new URL(window.location.href);
    const success = url.searchParams.get('success');
    
    if (success) {
      showToast('success', `Welcome back ${user.firstname } ${user.lastname }`, {position: 'top-right'});
      
      const timeoutId = setTimeout(() => {
        url.searchParams.delete('success');
        
        window.history.replaceState({}, '', url.toString());
      }, 5000);
      
      return () => clearTimeout(timeoutId);
    }
  }, []); 


const sendData = () => {
    // Define your endpoint URL (you'll need to get this from your config in a real implementation)
const videoProcessingEndpoint = 'http://13.247.60.142/process-video-s3'; // Replace with your actual endpoint

// Set request timeout (300 seconds = 5 minutes)
const timeoutDuration = 300 * 1000; // Convert to milliseconds

// Create an AbortController to handle the timeout
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

// Request data
const requestData = {
  trim_start: 0,
  play_to_sec: 3,
  slow_factor: 0.7,
  effect: 'slomo_boomerang',
  video_url: 'https://picxel-bucket.s3.af-south-1.amazonaws.com/video_uploads/VID_20230902_161643.mp4',
  audio_url: 'https://picxel-bucket.s3.af-south-1.amazonaws.com/audios/zZS7hqBit3KFs4IPh1YRp2c7NipIsG720Mo9NYfq.mp3',
  overlay_url: 'https://picxel-bucket.s3.af-south-1.amazonaws.com/logos/112742_slomo_1739267223751.png'
};

// Make the request with fetch
fetch(videoProcessingEndpoint, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
 
  },
  body: JSON.stringify(requestData),
  signal: controller.signal
})
  .then(response => {
    // Clear the timeout since we got a response
    clearTimeout(timeoutId);
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Parse JSON response
    return response.json();
  })
  .then(data => {
    // Handle successful response
    console.log('Processing successful:', data);
    // Do something with the processed video data
  })
  .catch(error => {
    // Handle errors, including timeout
    if (error.name === 'AbortError') {
      console.error('Request timed out after', timeoutDuration / 1000, 'seconds');
    } else {
      console.error('Error processing video:', error.message);
    }
  });
}

    return (
        <AuthenticatedLayout>
          <Head title="Dashboard" />
          <div className="main-content app-content">
            <div className="container-fluid">
            <button onClick={sendData} className="btn bg-success">Click me</button>
              <div className="flex items-center justify-between page-header-breadcrumb flex-wrap gap-2">
              <Breadcrumb
              items={[
                  { label: 'Dashboard', href: '/dashboard' },
                  { label: 'Metrics', active: true }
                ]}
              />
                
              </div>
             
                 <HeaderCard 
                //  @ts-ignore
                   metrics={metrics}
                 />

              <div className="grid grid-cols-12 gap-x-6 col-span-12">
                <div className="xxl:col-span-8 col-span-12">
                <div style={{minHeight: 345 + 'px'}} className="">
                  <Suspense fallback={<Loader className='mr-2 h-4 w-4 animate-spin'/>}>
                        <DBarChart 
                        // @ts-ignore
                        userAnalytics={userAnalytics}/>
                        </Suspense>
                </div>
                </div>
                <Suspense fallback={<Loader className='mr-2 h-4 w-4 animate-spin'/>}>
                    <EventCard events={events} />
                 </Suspense>
                
              </div>
          
            
            </div>
          </div>
        </AuthenticatedLayout>
        
    );
}
