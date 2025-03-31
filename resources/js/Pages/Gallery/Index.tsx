import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head, router } from '@inertiajs/react'
import { Copy, CopyCheck, Loader, Share2 } from 'lucide-react'
import React, { Suspense, useState } from 'react';
import VideoCard from './VideoCard';
import { Event, EventProps, Filters, QueryParams } from '@/types';
// @ts-expect-error
import { debounce } from 'lodash';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select';
import Paginator from '@/Shared/Paginator';
import CustomTooltip from '@/Components/CustomTooltip';
import showToast from '@/utils/showToast';
import ShareGalleryModal from './ShareGalleryModal';

export default function Index({event, videos} : {
  event: Event,
  videos: any
}) {

  const [filters, setFilters] = useState({
    search: '',
    sort: ''
});
const [modalOpen, setModalOpen] = useState(false);
const [QRData, setQRData] = useState<Event | null>(null);

  const totalItems = videos?.total;
  const itemsPerPage = videos?.per_page;
  const currentPage = videos?.current_page;

const updateFilters = React.useCallback(
  debounce((newFilters: Partial<Filters>) => {
    const queryParams: QueryParams = {};
    
    // Merge new filters with existing filters
    const updatedFilters = { ...filters, ...newFilters };
    
    // Add non-empty filter values to query params
    Object.keys(updatedFilters).forEach(key => {
      if (updatedFilters[key as keyof Filters]) {
        queryParams[key] = updatedFilters[key as keyof Filters] as string;
      }
    });

    router.get(route('gallery',event?.slug), queryParams, {
      preserveState: true,
      replace: true
    });

    // Update local state with merged filters
    setFilters(updatedFilters);
  }, 300),
  [filters]
);

const handlePageChange  = (page: number) => {
   router.get(route('gallery',event?.slug), {page}, {
    preserveState: true,
    replace: true
   })
  }

  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState(route('shared_gallery',event?.slug));



const handleDelete = (videos: any) => {
  
  if(!videos) return;
  if(!window.confirm('Are you sure you want to delete these selected videos?')) return;
  router.delete(route('delete_videos'), {
    data: { ids: videos },
    preserveScroll: true,
    onSuccess: () => {
      showToast('success', 'Video deleted successfully!', {position: 'bottom-right'});
    },
    onError: () => {
      showToast('error', 'Something went wrong!', {position: 'bottom-right'});
    }
  })
}
  return (
    <Authenticated>
          <Head title="Gallery" />
          <div className="main-content app-content">
            <div className="container-fluid">
             <Breadcrumb
             items={[
                { label: 'Home', href: '/dashboard' },
                { label: 'Events', href: '/events' },
                { label: 'Gallery', active: true }
              ]}
              />
        
        <div className="row">
          <div className="col-xl-12">
            <div className="box">
              <div className="box-body p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="avatar-list-stacked">
                 <div> Gallery Name: <span className='font-bold'>{event?.setting?.gallery_name ?? '-'}</span></div>
                 <div> Event nr: <span className='font-bold'><span className='text-primary'>#</span>{event?.id}</span>
                 <span className='ml-3'>Number of files: <span className="badge bg-primary text-white">{totalItems ?? 0 }</span></span></div>


                 {/* <div className="flex items-center"> 
                  <div className="me-0 mt-2" onClick={copyLink}> 
                    <span className="!svg-primary !text-primary"> 
                    <CustomTooltip content="Copy">
                      {copied ? <CopyCheck size={17} color='green'/> : <Copy size={17}/>}
                      </CustomTooltip>
                    </span> 
                    </div> 
                    <div> 
                  <CustomTooltip content="Copy">
                  <button onClick={copyLink} className='ml-2 hover:text-primary'>{link}</button> 
                  </CustomTooltip>
                  </div> 
                  </div> */}



                  </div>
                  <div className="flex" role="search">
                  <CustomTooltip content="Share Link">
                  <button 
                    onClick={() => {
                      setModalOpen(true)
                      setQRData(event)
                    }} 
                  type="button" className="ti-btn ti-btn-sm bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white ">
                    <Share2 />
                    </button>
                  </CustomTooltip>
                  <CustomTooltip content="Public Gallery">
                  <a 
                   href={link}
                   target='_blank'
                  type="button" className="ti-btn ti-btn-sm bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white ">
                    Public Gallery
                    </a>
                  </CustomTooltip>

                    {/* <Input 
                    onChange={(e) => updateFilters({ search: e.target.value })} className="form-control me-2" type="search" placeholder="Search Video"
                     aria-label="Search"/> */}
                     {/* <Select onValueChange={(e) => updateFilters({ sort: e })}>
                          <SelectTrigger className="w-[180px] form-control">
                            <SelectValue placeholder="Sort By"></SelectValue>
                          </SelectTrigger>
                          <SelectContent className='form-control'>
                            <SelectGroup>
                              <SelectLabel>Sort By</SelectLabel>
                              <SelectItem className='cursor-pointer' value="latest">Latest</SelectItem>
                              <SelectItem className='cursor-pointer' value="oldest">Oldest</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select> */}
                  </div>
                </div>
              </div>
            </div>
           
          </div>
          
        </div>
              <Suspense fallback={<Loader className="align-middle animate-spin"/>}>
                <VideoCard 
                videos={videos.data}
                handleDelete={handleDelete}
                />
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

          <Suspense fallback={""}>
                        <ShareGalleryModal 
                        open={modalOpen} 
                        gallery_link={link}
                        setOpen={setModalOpen} 
                        event={event}/>
         </Suspense>
        </Authenticated>
  )
}
