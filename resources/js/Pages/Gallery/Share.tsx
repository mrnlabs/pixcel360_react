import Guest from '@/Layouts/GuestLayout';
import { Event } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Download, Loader, Mail, QrCode } from 'lucide-react';
import React, { Suspense, useState } from 'react'
import VideoPlayerComponent from './VideoPlayerComponent';
import Paginator from '@/Shared/Paginator';
import CustomTooltip from '@/Components/CustomTooltip';
import JSZip from 'jszip';
// @ts-expect-error
import { saveAs } from 'file-saver';
import ShareGalleryViaEmailModal from './ShareGalleryViaEmailModal';
import showToast from '@/utils/showToast';
import { LoadingOverlay } from './LoadingOverlay';
import axios from 'axios';
import ShareGalleryViaEmailModalSingle from './ShareGalleryViaEmailModalSingle';
import ShareGalleryViaQRModal from './ShareGalleryViaQRModal';

export default function Share({event, videos}: {
        event: Event,
        videos: any
     }) {

    const totalItems = videos?.total;
    const itemsPerPage = videos?.per_page;
    const currentPage = videos?.current_page;

    const [modalOpen, setModalOpen] = useState(false);
    const [openSingleModal, setSingleModalOpen] = useState(false);
    const [video_link, setVideoLink] = useState('');
    const [openQRModal, setQRModalOpen] = useState(false);

    const handlePageChange  = (page: number) => {
       router.get(route('shared_gallery',event?.slug), {page}, {
        preserveState: true,
        replace: true
       })
      }

      const [gallery_link, setLink] = useState(route('shared_gallery',event?.slug));
      const [loading, setLoading] = useState(false);

      const downloadAll = async () => {
        setLoading(true);
        const zip = new JSZip();

        try {
            showToast('info', 'Preparing videos for download...', { position: 'bottom-right' });

            const videoPromises = videos.data.map(async (video: any, index: number) => {
                try {
                    // Show progress to user
                    if (index === 0) {
                        showToast('info', `Downloading videos (1/${videos.data.length})...`, { position: 'bottom-right' });
                    }

                    const response = await axios.get(video.processed_video_path, {
                        responseType: 'blob',
                        headers: {
                            // 'Referer': 'https://app.pixcel360.com/'
                            "Cache-Control": "no-cache" 
                        },
                    });

                    if (response.status !== 200) {
                        throw new Error(`Failed to fetch video: ${response.status} ${response.statusText}`);
                    }

                    const blob = response.data;
                    zip.file(video.name, blob);

                    // Show download progress periodically (for larger collections)
                    if ((index + 1) % 5 === 0 && index + 1 < videos.data.length) {
                        //showToast('info', `Downloading videos (${index + 1}/${videos.data.length})...`, {position: 'bottom-right'});
                    }

                    return true;
                } catch (error: any) {
                    console.error("Error fetching video:", error);
                    showToast('error', `Failed to download ${video.name}`, { position: 'bottom-right' });
                    return false;
                }
            });

            const results = await Promise.all(videoPromises);
            const successfulDownloads = results.filter(Boolean);

            if (successfulDownloads.length === 0) {
                showToast('error', 'Failed to download any videos.', { position: 'bottom-right' });
                setLoading(false);
                return;
            }

            showToast('info', 'Creating zip file...', { position: 'bottom-right' });
            const content = await zip.generateAsync({
                type: "blob",
                streamFiles: true,
                compression: "DEFLATE",
                compressionOptions: {
                    level: 6 // Balanced compression level
                },
                // @ts-expect-error
                onUpdate: (metadata) => {
                    if (metadata.percent % 20 === 0) { // Update every 20%
                        showToast('info', `Creating zip: ${Math.round(metadata.percent)}% complete`, { position: 'bottom-right' });
                    }
                }
            });
            //replace space with underscore + '.zip' 
            const zipFileName = event.setting?.gallery_name 
                ? (event.setting.gallery_name as string).replace(/\s+/g, '_') + '.zip' 
                : (event.name as string).replace(/\s+/g, '_') + '.zip';
            saveAs(content, zipFileName);
            showToast('success', `Successfully downloaded ${successfulDownloads.length} videos!`, { position: 'bottom-right' });

        } catch (error) {
            console.error("Error in download process:", error);
            showToast('error', 'Failed to generate zip file.', { position: 'bottom-right' });
        } finally {
            setLoading(false);
        }
    };
      

  return (
    <Guest>
    <Head title={event?.name} />
    <Head title="Web Gallery" />
          <LoadingOverlay show={loading} />
          <div className="main-content mt-6">
          <div className="container-fluid" style={{ 
            background: `linear-gradient(to right, ${event?.setting?.webgallery_background ?? '#fff'}, ${event?.setting?.webgallery_background ?? '#c0c0c0'})`, 
            color: event?.setting?.text_button_color ?? '#000000' 
          }}>
        
        <div className="row" >
          <div className="col-xl-12">
            <div className="box" style={{ backgroundColor: event?.setting?.webgallery_background  ?? '#fff', color: event?.setting?.text_button_color ?? '#000000' }}>
              <div className="box-body p-4">
              <div className="box-body border-b border-dashed border-defaultborder dark:border-defaultborder/10">
              <div className="text-center">
                <span className="avatar avatar-xxl avatar-rounded  mb-3">
                  <img src={event.setting?.app_logo ?? "https://pixcelcapetown.s3.af-south-1.amazonaws.com/placeholders/128x128.png"} alt=""/>
                  
                </span>
                <h5 style={{ color: event?.setting?.text_button_color ?? '#000000' }} className="font-semibold mb-1">{event.setting?.gallery_name}</h5>
                <span style={{ color: event?.setting?.text_button_color ?? '#000000' }} className="block font-medium mb-2">{event.setting?.gallery_contact}</span>
              </div>
            </div>
              </div>
            </div>
           
          </div>
          
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="box" style={{ backgroundColor: event?.setting?.webgallery_background  ?? '#fff', color: event?.setting?.text_button_color ?? '#000000' }}>
              <div className="box-body p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                <div style={{ color: event?.setting?.text_button_color ?? '#000000' }} className="avatar-list-stacked">
                 <div> Gallery Name: <span className='font-bold'>{event?.name}</span></div>
                 <div> Event nr: <span className='font-bold'><span className='text-primary'>#</span>{event?.id}</span>
                 <span className='ml-3'>Number of files: {totalItems ?? 0 }</span>
                 </div>                
                  </div>

                  <div className="hstack gap-2 text-[15px] "> 


                  {event.sharing_method?.download == 1 ? (
                      <button onClick={downloadAll} aria-label="anchor" 
                        className="ti-btn ti-btn-sm ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white">
                        <CustomTooltip content="Download All">
                      {loading ? <Loader className="animate-spin" size={20} /> : <Download size={20} />}
                      </CustomTooltip> 
                      </button>
                  ) : ( '')
                }


          {event.sharing_method?.email == 1 ? (
                <button onClick={() => setModalOpen(true)} aria-label="anchor" 
                className="ti-btn ti-btn-sm ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white">
                 <CustomTooltip content="Email">
                <Mail size={20} />
                </CustomTooltip> 
                </button>
              ) : ( '')
            }

{event.sharing_method?.qr == 1 ? (
                <button onClick={() => {
                  setQRModalOpen(true)
                  setVideoLink(gallery_link)
                }
                } aria-label="anchor" 
                className="ti-btn ti-btn-sm ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white">
                 <CustomTooltip content="QR Code">
                <QrCode size={20} />
                </CustomTooltip> 
                </button>
              ) : ( '')
            }

  {event.sharing_method?.whatsapp == 1 ? (
                <CustomTooltip content="WhatsApp">
                <a target="_blank" 
                        href={`https://wa.me/?text=${gallery_link}`}
                        rel="noreferrer"  aria-label="anchor" 
                className="ti-btn ti-btn-sm ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height={20} width={17}>
                  <path 
                    fill="#ffff" 
                    d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                  />
                </svg>
                </a>
                </CustomTooltip> 
              ) : ( '')
            }
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


            {event.sharing_method?.download == 1 ? (
                <button onClick={() => window.open(video.processed_video_path, '_blank')} aria-label="anchor" 
                className="ti-btn ti-btn-sm ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white">
                  <CustomTooltip content="Download">
                      <Download size={17} />
                </CustomTooltip> 
                </button>
                  ) : ( '')
                }
                {event.sharing_method?.qr == 1 ? (
                <button onClick={() => {
                  setVideoLink(video.processed_video_path)
                  setQRModalOpen(true)
                }
              } aria-label="anchor" 
                className="ti-btn ti-btn-sm ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white">
                  <CustomTooltip content="QR Code">
                      <QrCode size={17} />
                </CustomTooltip> 
                </button>
                  ) : ( '')
                }

                {event.sharing_method?.email == 1 ? (
                
                <button onClick={() => {
                  setVideoLink(video.processed_video_path)
                  setSingleModalOpen(true)
                }
                } 
                aria-label="anchor" 
                className="ti-btn ti-btn-sm ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white">
                  <CustomTooltip content="Email">
                     <Mail size={17} />
                </CustomTooltip> 
                </button>
                ) : ( '')

                
            }
                
{event.sharing_method?.whatsapp == 1 ? (
   <CustomTooltip content="WhatsApp">
   <a target="_blank" 
           href={`https://wa.me/?text=${video.processed_video_path}`}
           rel="noreferrer"  aria-label="anchor" 
   className="ti-btn ti-btn-sm ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height={17} width={17}>
     <path 
       fill="#ffff" 
       d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
     />
   </svg>
   </a>
   </CustomTooltip> 
) : ( '')
}
               

                </div>
            </div>




        ))}
   
    </div>
      </Suspense>
              {!totalItems && <div className="text-center p-4">No videos found.</div>}
            </div>
            <div className="box-footer">
           <Suspense fallback={<Loader className="align-middle animate-spin"/>}>
           <Paginator
                      totalItems={totalItems}
                      itemsPerPage={itemsPerPage}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                      showingText="Displaying"
                      maxVisiblePages={5}
                    />
                    <ShareGalleryViaEmailModal 
                        open={modalOpen} 
                        setOpen={setModalOpen} 
                        event={event}
                        gallery_link={gallery_link}
                        />

                   <ShareGalleryViaEmailModalSingle 
                        openSingleModal={openSingleModal} 
                        setSingleModalOpen={setSingleModalOpen} 
                        event={event}
                        video_link={video_link}
                        />
                        <ShareGalleryViaQRModal 
                        openQRModal={openQRModal} 
                        setQRModalOpen={setQRModalOpen} 
                        event={event}
                        video_link={video_link}
                        title='Share this video by scanning the QR code.'
                        />
           </Suspense>
                    </div>
          </div>
</Guest>
  )
}
