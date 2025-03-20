import CustomTooltip from '@/Components/CustomTooltip';
import VideoPlayerComponent from './VideoPlayerComponent';
import { Copy, Download, Trash2 } from 'lucide-react';

export default function VideoCard({videos, handleDelete}: any) {
  return (
    <div className="grid grid-cols-12 gap-x-6">
        {videos?.map((video: any) => (
             <div key={video.id} className="lg:col-span-3 md:col-span-3 mb-3 sm:col-span-6 col-span-12" id="player">
             <VideoPlayerComponent 
               videoSrc={video.processed_video_path}
              />
              <div className="hstack gap-2 text-[15px] text-center"> 
                    <CustomTooltip content="Copy link">
                        <button onClick={() => window.open(video.processed_video_path, '_blank')} aria-label="anchor" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-soft-primary3">
                        <Download/>
                        </button> 
                        </CustomTooltip>
                        <CustomTooltip content="Download">
                        <button onClick={() => handleDelete(video)} aria-label="anchor" className="ti-btn ti-btn-icon ti-btn-sm ti-btn-soft-primary2">
                        <Trash2 />
                        </button></CustomTooltip> 
                        </div>
           </div>
        ))}
   
    </div>
  )
}
