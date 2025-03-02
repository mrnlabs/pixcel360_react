import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Breadcrumb } from "@/Shared/Breadcrumb";
import { EventProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

import React, { useMemo, useRef } from 'react'
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
              return 'Branding';
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
            return <Audio event={event} scrollToDiv={scrollToDiv} />;
        case 'timeouts':
            return <TimeOuts event={event} scrollToDiv={scrollToDiv} />;
        case 'sharing-methods':
            return <SharingMethods event={event} scrollToDiv={scrollToDiv} />;
        case 'sharing-subjects':
            return <SharingSubjects event={event} scrollToDiv={scrollToDiv} />;
        case 'branding':
            return <Branding event={event}  />;
        default:
            return null;
    }
}, [activeTab, event, scrollToDiv]);
  return (
    <Authenticated>
<Head title={'Edit Event' + event?.name} />
<div className="main-content app-content">
  <div className="container-fluid">
   <Breadcrumb
   items={[
      { label: 'Home', href: '/dashboard' },
      { label: 'Events', href: '/events' },
      { label: 'Create', active: true }
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
            <div className="flex-auto">
              <h6 className="font-medium mb-0">{getHeader()}</h6>
            </div>
            <div className=" gap-2 lg:nowrap justify-end flex-wrap justify-content-sm-end sm:w-[80%] hidden">
              
              <Link href={route('event.create')} aria-label="button" type="button" className="ti-btn ti-btn-primary !m-0 btn-w-md flex items-center  btn-wave waves-light text-nowrap waves-effect waves-light">
                <SquarePlus className="align-middle" />Create New Event </Link>
              
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
          title={"Title for my QR Code"}
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
    {/* <div className="box">
      <div className="box-body">
        <div className="filemanager-upgrade-storage w-full text-center">
          <span className="text-[1rem] font-semibold text-defaulttextcolor">Danger Zone.</span>
          <span className="block text-textmuted dark:text-textmuted/50 mt-2">.</span>
          <div className=" grid">
            <button type="button" className="ti-btn ti-btn-lg ti-btn-danger btn-wave waves-effect waves-light">Delete Event</button>
          </div>
        </div>
      </div>
    </div> */}
  </div>
</div>
  
  </div>
</div>
</Authenticated>
  )
}
