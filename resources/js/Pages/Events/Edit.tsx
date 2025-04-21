import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Breadcrumb } from "@/Shared/Breadcrumb";
import { EventProps } from "@/types";
import { Head, Link, router } from "@inertiajs/react";

import React, { useMemo, useRef, useState } from 'react'
import EditDetails from "./TabContent/EditDetails";
import { QRCodeSVG } from "qrcode.react";
import EventSidebar from "./EventSidebar";
import VedioSettings from "./TabContent/VedioSettings";
import { SquarePlus } from "lucide-react";
import Functions from "./TabContent/Functions";
import Audio from "./TabContent/Audio";
import TimeOuts from "./TabContent/TimeOuts";
import SharingMethods from "./TabContent/SharingMethods";
import SharingSubjects from "./TabContent/SharingSubjects";
import Branding from "./TabContent/Branding";
import Overlay from "./TabContent/Overlay";
import showToast from "@/utils/showToast";
import { AuthGuard } from "@/guards/authGuard";

export default function Edit({event} : EventProps) {
  const [activeTab, setActiveTab] = React.useState('event-details');

  const eventDetailsRef = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const scrollToDiv = ({ targetRef }: ScrollToDivProps): void => {
    //targetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  interface ScrollToDivProps {
    targetRef: React.RefObject<HTMLDivElement>;
  }

  switch (activeTab) {
    case 'event-details':
      //scrollToDiv({ targetRef: eventDetailsRef });
      break;
  }
  
  const [refresh, setRefresh] = useState(0)

  const getHeader = () => {
      switch (activeTab) {
          case 'event-details':
              return 'Event details';
          case 'event-settings':
              return 'Vedio settings';
          case 'event-functions':
              return 'Video Functions';
          case 'audio':
               return 'Audio';
          case 'timeouts':
              return 'Timeouts';
          case 'sharing-methods':
              return 'Sharing methods';
          case 'sharing-subjects':
              return 'Sharing subjects';
          case 'branding':
              return 'Gallery Branding';
          case 'overlay':
              return 'Overlays of ' + event?.name;
          default:
              return '';
      }
  }

  const getActiveTabContent = useMemo(() => {
    switch (activeTab) {
        case 'event-details':
            return <EditDetails event={event} scrollToDiv={scrollToDiv} />;
        case 'event-settings':
            return <VedioSettings event={event} scrollToDiv={scrollToDiv} />;
        case 'event-functions':
            return <Functions event={event} scrollToDiv={scrollToDiv} />;
        case 'audio':
            return <Audio event={event} scrollToDiv={scrollToDiv} key={refresh} setRefresh={setRefresh} />;
        case 'timeouts':
            return <TimeOuts event={event} scrollToDiv={scrollToDiv} />;
        case 'sharing-methods':
            return <SharingMethods event={event} scrollToDiv={scrollToDiv} />;
        case 'sharing-subjects':
            return <SharingSubjects event={event} scrollToDiv={scrollToDiv} />;
        case 'branding':
            return <Branding event={event}  />;
        case 'overlay':
          return <Overlay event={event}  />;
        default:
            return null;
    }
}, [activeTab, event, scrollToDiv]);

const handleCloseEvent = () => {
  if (confirm('Are you sure you want to close this event?')) {
    router.post(route('events.close'), {
      'slug': event?.slug,
    }, {
      preserveState: true,
      replace: true,
      onSuccess: () => {
        showToast('success', 'Event closed successfully!', {position: 'bottom-right'});
      },
      onError: () => {
        showToast('error', 'Failed to close event!', {position: 'bottom-right'});
      }
    });
  }
};
const handleActivateEvent = () => {
  if (confirm('Are you sure you want to reopen this event?')) {
    router.post(route('events.close'), {
      'slug': event?.slug,
      'reopen': 'true'
    }, {
      preserveState: true,
      replace: true,
      onSuccess: () => {
        showToast('success', 'Event closed successfully!', {position: 'bottom-right'});
      },
      onError: () => {
        showToast('error', 'Failed to close event!', {position: 'bottom-right'});
      }
    });
  }
};

  return (
    <Authenticated>
<Head title={'Edit Event' + event?.name} />
<div className="main-content app-content">
  <div className="container-fluid">
   <Breadcrumb
   items={[
      { label: 'Home', href: '/dashboard' },
      { label: 'Events', href: '/events' },
      { label: 'Details', active: true }
    ]}
    />
   
   

   <div className="grid grid-cols-12 gap-x-6">
  {event && (
    <EventSidebar event={event}
      setActiveTab={setActiveTab} 
      activeTab={activeTab}
      scrollToDiv={scrollToDiv} />
  )}
  <div className="xxl:col-span-6 col-span-12">
    <div className="box overflow-hidden">
      <div className="box-body p-0">
        <div className="file-manager-folders">
          <div className="flex p-4 flex-wrap gap-2 items-center justify-between border-b border-defaultborder dark:border-defaultborder/10">
            <div className="flex flex-auto ">
              <h6 className="font-medium mb-0">{getHeader()}</h6>
            </div>
            <div className=" gap-2 lg:nowrap justify-end flex-wrap justify-content-sm-end ">
              {activeTab == 'overlay' && (
                <Link href={route('user.overlays',{event: event?.slug})} aria-label="button" type="button" 
                className="ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] float-end text-white !m-0 btn-w-md flex items-center btn-wave waves-light text-nowrap waves-effect waves-light">
                  <SquarePlus className="align-middle" />Designer </Link>
              )}
              
              
            </div>
          </div>
          <div className="p-4 file-folders-container">
            
            <div className="grid  sm:gap-x-6 mb-2">
              { getActiveTabContent }
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="xxl:col-span-3 col-span-12">
    <div className="box overflow-hidden">
      <div className="box-body">
        <div className="flex items-start gap-4">
          <div className="flex-auto">
            <div className=" mb-3"> Scan this code on your device to activate your event.
            </div>
          </div>
        </div>
        <div id="file-manager-storage" style={{minHeight: 142.8+'px'}} className="">
        <div className="flex justify-center items-center">
        <QRCodeSVG
          value={event?.slug ?? ''}
          title={"Scan QR Code"}
          size={128}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"L"}
          minVersion={6}
          />
        </div>
        </div>
      </div>
    
    </div>
    {event?.status !== '2' && (
      <div className="box">
      <div className="box-body">
        <div className="filemanager-upgrade-storage w-full text-center">
          <div className=" grid">
            <button onClick={handleCloseEvent} type="button" className="ti-btn  ti-btn-danger btn-wave waves-effect waves-light">Close Event</button>
          </div>
        </div>
      </div>
    </div>
    )}
    {event?.status == '2' && (
      <div className="box">
      <div className="box-body">
        <div className="filemanager-upgrade-storage w-full text-center">
          <div className=" grid">
          <AuthGuard 
          roles={["System Admin", "System SuperAdmin"]} 
          permissions={["*"]}
          requireAll={true}>
          <button onClick={handleActivateEvent} type="button" className="ti-btn  ti-btn-danger btn-wave waves-effect waves-light"> Event Closed</button>
      </AuthGuard>
      
      <AuthGuard 
          roles={["Account Owner"]} 
          permissions={["*"]}
          requireAll={true}>
          <button disabled type="button" className="ti-btn  ti-btn-danger btn-wave waves-effect waves-light"> Event Closed</button>
      </AuthGuard>
            
          </div>
        </div>
      </div>
    </div>
    )}
  </div>
</div>
  
  </div>
</div>
</Authenticated>
  )
}
