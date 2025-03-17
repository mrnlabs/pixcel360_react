import React from 'react'
import VideoPlayer from './VideoPlayer'
import { Event, EventProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default function VideoCard({videos}: any) {
  return (
    <div className="grid grid-cols-12 gap-x-6">
        {videos?.map((video: any) => (
             <div key={video.id} className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12" id="player">
             <VideoPlayer 
               videoSrc={video.path}
              />
           </div>
        ))}
   
    </div>
  )
}
