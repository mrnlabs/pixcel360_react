import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Breadcrumb } from '@/Shared/Breadcrumb'
import { Head, Link } from '@inertiajs/react'
import { Loader, SquarePlus } from 'lucide-react'
import React, { lazy, Suspense, useState } from 'react';
import VideoCard from './VideoCard';
import { Event, EventProps } from '@/types';

export default function Index({event} : EventProps) {

  return (
    <Authenticated>
          <Head title="Dashboard" />
          <div className="main-content app-content">
            <div className="container-fluid">
             <Breadcrumb
             items={[
                { label: 'Home', href: '/' },
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
                 <div> Event nr: <span className='font-bold'>#{event?.id}</span></div>
                  </div>
                  <div className="flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search Project" aria-label="Search"/>
                    <button className="ti-btn bg-light !m-0" type="submit">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
              <Suspense fallback={<Loader className="align-middle animate-spin"/>}>
                <VideoCard event={event}/>
              </Suspense>

            </div>
          </div>
        </Authenticated>
  )
}
