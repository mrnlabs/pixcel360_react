import Guest from '@/Layouts/GuestLayout';
import { Event } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Copy, Download, Loader } from 'lucide-react';
import React, { Suspense } from 'react'
import VideoPlayerComponent from './VideoPlayerComponent';
import Paginator from '@/Shared/Paginator';
import CustomTooltip from '@/Components/CustomTooltip';
import showToast from '@/utils/showToast';

export default function Share({event, videos}: {
        event: Event,
        videos: any
     }) {

    const totalItems = videos?.total;
    const itemsPerPage = videos?.per_page;
    const currentPage = videos?.current_page;

    const handlePageChange  = (page: number) => {
       router.get(route('shared_gallery',event?.slug), {page}, {
        preserveState: true,
        replace: true
       })
      }
const handleCopy = (processed_video_path: string) => {
  if(!processed_video_path) return
  navigator.clipboard.writeText(processed_video_path);
  showToast('success','Link copied to clipboard', {position: 'bottom-right'});
}
  return (
    <Guest>
    <Head title={event?.name} />
    <Head title="Web Gallery" />
          <div className="main-content mt-6">
            <div className="container-fluid">
        
        <div className="row">
          <div className="col-xl-12">
            <div className="box">
              <div className="box-body p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="avatar-list-stacked">
                 <div> Gallery Name: <span className='font-bold'>{event?.name}</span></div>
                 <div> Event nr: <span className='font-bold'><span className='text-primary'>#</span>{event?.id}</span>
                 <span className='ml-3'>Number of files: {totalItems ?? 0 }</span></div>

                
                  </div>
                </div>
              </div>
            </div>
           
          </div>
          
        </div>
        <Suspense fallback={<Loader className="align-middle animate-spin"/>}>
        <div className="grid grid-cols-12 gap-x-6">
        {videos?.data?.map((video: any) => (
             <div key={video.id} className="lg:col-span-3 md:col-span-3 mb-3 sm:col-span-6 col-span-12" id="player">
             <VideoPlayerComponent 
               videoSrc={video.processed_video_path}
              />

            <div className="hstack gap-2 text-[15px] text-center"> 
                <CustomTooltip content="Download">
                <button onClick={() => window.open(video.processed_video_path, '_blank')} aria-label="anchor" className="ti-btn ti-btn-sm ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white">
                Download
                </button>
                </CustomTooltip> 
                </div>
            </div>




        ))}
   
    </div>
      </Suspense>
              {!totalItems && <div className="text-center">No videos found.</div>}
            </div>
            <div className="box-footer">
            <Paginator
                      totalItems={totalItems}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                      showingText="Displaying"
                      maxVisiblePages={5}
                    />
                    </div>
          </div>
</Guest>
  )
}
