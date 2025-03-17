import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head, router } from '@inertiajs/react'
import { Loader } from 'lucide-react'
import React, { Suspense, useState } from 'react';
import VideoCard from './VideoCard';
import { Event, EventProps, Filters, QueryParams } from '@/types';
// @ts-expect-error
import { debounce } from 'lodash';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/Components/ui/select';
import Paginator from '@/Shared/Paginator';

export default function Index({event, videos} : {
  event: Event,
  videos: any
}) {

  const [filters, setFilters] = useState({
    search: '',
    sort: ''
});

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


  return (
    <Authenticated>
          <Head title="Dashboard" />
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
                 <div> Gallery Name: <span className='font-bold'>{event?.name}</span></div>
                 <div> Event nr: <span className='font-bold'><span className='text-primary'>#</span>{event?.id}</span>
                 <span className='ml-3'>Number of files: {event?.videos?.length ?? 0 }</span></div>
                  </div>
                  <div className="flex" role="search">
                    <Input 
                    onChange={(e) => updateFilters({ search: e.target.value })} className="form-control me-2" type="search" placeholder="Search Video" aria-label="Search"/>
                     <Select onValueChange={(e) => updateFilters({ sort: e })}>
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
                        </Select>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
          
        </div>
              <Suspense fallback={<Loader className="align-middle animate-spin"/>}>
                <VideoCard 
                videos={videos.data}
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
        </Authenticated>
  )
}
