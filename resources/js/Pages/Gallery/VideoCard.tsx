import { AuthGuard } from '@/guards/authGuard';
import { useState } from 'react';
import VideoPlayerComponent from './VideoPlayerComponent';

export default function VideoCard({ videos, handleDelete }: any) {
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  
  const handleCheckboxChange = (videoId: string) => {
    setSelectedVideos(prev => {
      if (prev.includes(videoId)) {
        return prev.filter(id => id !== videoId);
      } else {
        return [...prev, videoId];
      }
    });
  };
  
  const handleSelectAll = () => {
    if (selectedVideos.length === videos.length) {
      // If all are selected, deselect all
      setSelectedVideos([]);
    } else {
      // Otherwise, select all
      setSelectedVideos(videos.map((video: any) => video.id));
    }
  };
  
  const handleMultipleDelete = () => {
    if (selectedVideos.length > 0) {
      handleDelete(selectedVideos);
      setSelectedVideos([]); // Clear selection after delete
    }
  };

  return (
    <div>
      {videos && videos.length > 0 && (
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <input 
              id='delete-all'
              className="form-check-input mr-2"
              type="checkbox"
              checked={videos.length > 0 && selectedVideos.length === videos.length}
              onChange={handleSelectAll}
              style={{
                height: '1.35rem',
                width: '1.35rem',
              }}
            />
            <label htmlFor='delete-all' className="ml-2 text-sm cursor-pointer">Select All</label>
          </div>
          
          {selectedVideos.length > 0 && (
            <button 
              onClick={handleMultipleDelete}
              className="ti-btn ti-btn-danger btn-wave  waves-effect waves-light"
            >
              Delete Selected ({selectedVideos.length})
            </button>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-12 gap-x-6">
        {videos?.map((video: any) => (
          <div key={video.id} className="lg:col-span-3 md:col-span-3 mb-3 sm:col-span-6 col-span-12" id="player">
            <VideoPlayerComponent 
              videoSrc={video.processed_video_path}
            />
            <div className="mt-2 flex items-center"> 
              <AuthGuard 
                roles={["Account Owner"]} 
                permissions={["*"]}
                requireAll={true}
              >
                <input 
                  id={`select-${video.id}`}
                  className="form-check-input" 
                  type="checkbox" 
                  checked={selectedVideos.includes(video.id)}
                  onChange={() => handleCheckboxChange(video.id)}
                  style={{  
                    height: '1.35rem',
                    width: '1.35rem',
                  }} 
                />
                <label htmlFor={`select-${video.id}`} className="ml-2 text-xs cursor-pointer ">
                  {selectedVideos.includes(video.id) ? 'Selected' : 'Select'}
                </label>
              </AuthGuard>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}