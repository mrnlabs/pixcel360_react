import React from 'react'
import VideoPlayer from './VideoPlayer'
import { Event, EventProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default function VideoCard({event}: EventProps) {
    const filePath = usePage().props.filePath;
  return (
    <div className="grid grid-cols-12 gap-x-6">
        {event?.videos?.map((video: any) => (
             <div key={video.id} className="lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12" id="player">
             <VideoPlayer 
             videoSrc={`${filePath}/${video.path}`}
              />
           </div>
        ))}
   
    </div>
  )
}
