import { Event } from '@/types';
import { ClockAlert, Dice5, FileMusic, Layers, NotepadTextDashed, Settings, Share2, SquareFunction, SquarePen } from 'lucide-react'

export default function EventSidebar({activeTab,setActiveTab, scrollToDiv,event} : {
  activeTab: string,setActiveTab: (tab: string) => void,
  scrollToDiv: (divElement: any) => void,
  event: Event}) {


  return (
    <div className="xxl:col-span-3 col-span-12">
    <div className="grid grid-cols-12 gap-x-6">
      <div className="xl:col-span-12 col-span-12">
        <div className="box">
          <div className="flex p-4 flex-wrap gap-2 items-center justify-between border-b border-defaultborder dark:border-defaultborder/10">
            <div className="flex-auto">
              <h6 className="font-medium mb-0">{event.name}</h6>
            </div>
          </div>
          <div className="box-body !pt-0 !p-3">
          <ul className="list-none files-main-nav" id="files-main-nav">
             
              <li className={`${activeTab === 'event-details' ? 'active' : ''} files-type`}> 
                <div className="cursor-pointer" onClick={() => {
                  scrollToDiv('event-details');
                  setActiveTab('event-details')
                }}>
                  <div className="flex items-center">
                    <div className="me-2">
                      <SquarePen size={16} />
                    </div>
                    <span className="flex-auto text-nowrap"> Edit Event </span>
                  </div>
                </div>
              </li>
              <li className={`${activeTab === 'event-settings' ? 'active' : ''} files-type`}>
                <div className="cursor-pointer" onClick={() => setActiveTab('event-settings')}>
                  <div className="flex items-center">
                    <div className="me-2">
                    <Settings size={16} />
                    </div>
                    <span className="flex-auto text-nowrap"> Video Settings </span>
                  </div>
                </div>
              </li>
              <li className={`${activeTab === 'event-functions' ? 'active' : ''} files-type`}>
                <div onClick={() => setActiveTab('event-functions')} className='cursor-pointer'>
                  <div className="flex items-center">
                    <div className="me-2">
                      <SquareFunction size={16} className="ri-share-forward-line text-[1rem]"/>
                    </div>
                    <span className="flex-auto text-nowrap"> Video Functions </span>
                  </div>
                </div>
              </li>
              <li  className={`${activeTab === 'audio' ? 'active' : ''} files-type`}>
                <div onClick={() => setActiveTab('audio')} className='cursor-pointer'>
                  <div className="flex items-center">
                    <div className="me-2">
                    <Layers size={16} />
                    </div>
                    <span className="flex-auto text-nowrap"> Overlays </span>
                  </div>
                </div>
              </li>
              <li  className={`${activeTab === 'audio' ? 'active' : ''} files-type`}>
                <div onClick={() => setActiveTab('audio')} className='cursor-pointer'>
                  <div className="flex items-center">
                    <div className="me-2">
                    <FileMusic size={16} />
                    </div>
                    <span className="flex-auto text-nowrap"> Audio </span>
                  </div>
                </div>
              </li>
              <li className={`${activeTab === 'timeouts' ? 'active' : ''} files-type hidden`} >
                <div onClick={() => setActiveTab('timeouts')} className="cursor-pointer">
                  <div className="flex items-center">
                    <div className="me-2">
                    <ClockAlert size={16} />
                    </div>
                    <span className="flex-auto text-nowrap"> Time Outs </span>
                  </div>
                </div>
              </li>
              <li className={`${activeTab === 'sharing-methods' ? 'active' : ''} files-type`}>
                <div onClick={() => {
                  scrollToDiv('sharing-methods')
                  setActiveTab('sharing-methods')
                   }
                } className="cursor-pointer">
                  <div className="flex items-center">
                    <div className="me-2">
                    <Share2 size={16} />
                    </div>
                    <span className="flex-auto text-nowrap"> Sharing Methods </span>
                  </div>
                </div>
              </li>
              <li className={`${activeTab === 'sharing-subjects' ? 'active' : ''} files-type hidden`}>
                <div onClick={() => setActiveTab('sharing-subjects')} className="cursor-pointer">
                  <div className="flex items-center">
                    <div className="me-2">
                    <NotepadTextDashed size={16} />
                    </div>
                    <span className="flex-auto text-nowrap"> Sharing Subjects </span>
                  </div>
                </div>
              </li>
              <li className={`${activeTab === 'branding' ? 'active' : ''} files-type`}>
                <div onClick={() => setActiveTab('branding')} className="cursor-pointer">
                  <div className="flex items-center">
                    <div className="me-2">
                    <Dice5 size={16} />
                    </div>
                    <span className="flex-auto text-nowrap"> Branding </span>
                  </div>
                </div>
              </li>
             
            </ul>
          </div>
        </div>
      </div>
      <div className="xl:col-span-12 col-span-12"></div>
    </div>
  </div>
  )
}
