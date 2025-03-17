import VideoPlayerComponent from './VideoPlayerComponent';

export default function VideoCard({videos}: any) {
  return (
    <div className="grid grid-cols-12 gap-x-6">
        {videos?.map((video: any) => (
             <div key={video.id} className="lg:col-span-3 md:col-span-3 mb-3 sm:col-span-6 col-span-12" id="player">
             <VideoPlayerComponent 
               videoSrc={video.path}
              />
           </div>
        ))}
   
    </div>
  )
}
