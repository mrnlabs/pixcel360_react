import { Settings, SquareFunction, SquarePen } from 'lucide-react'

export default function EventSidebar({activeTab,setActiveTab} : {activeTab: string,setActiveTab: (tab: string) => void}) {
  return (
    <div className="xxl:col-span-3 col-span-12">
    <div className="grid grid-cols-12 gap-x-6">
      <div className="xl:col-span-12 col-span-12">
        <div className="box">
          <div className="flex p-4 flex-wrap gap-2 items-center justify-between border-b border-defaultborder dark:border-defaultborder/10">
            <div className="flex-auto">
              <h6 className="font-medium mb-0">File Manager</h6>
            </div>
          </div>
          <div className="box-body !pt-0 !p-3">
            <ul className="list-none files-main-nav" id="files-main-nav">
              <li className="px-0 pt-0">
                <span className="text-xs text-textmuted dark:text-textmuted/50">Event Details</span>
              </li>
              <li className={`${activeTab === 'event-details' ? 'active' : ''} files-type`}> 
                <div className="cursor-pointer" onClick={() => setActiveTab('event-details')}>
                  <div className="flex items-center">
                    <div className="me-2">
                      <SquarePen size={16} />
                    </div>
                    <span className="flex-auto text-nowrap"> Edit </span>
                  </div>
                </div>
              </li>
              <li className={`${activeTab === 'event-settings' ? 'active' : ''} files-type`}>
                <div className="cursor-pointer" onClick={() => setActiveTab('event-settings')}>
                  <div className="flex items-center">
                    <div className="me-2">
                    <Settings size={16} />
                    </div>
                    <span className="flex-auto text-nowrap"> Event Settings </span>
                  </div>
                </div>
              </li>
              <li className={`${activeTab === 'event-functions' ? 'active' : ''} files-type`}>
                <div onClick={() => setActiveTab('event-functions')} className='cursor-pointer'>
                  <div className="flex items-center">
                    <div className="me-2">
                      <SquareFunction size={16} className="ri-share-forward-line text-[1rem]"/>
                    </div>
                    <span className="flex-auto text-nowrap"> Functions </span>
                  </div>
                </div>
              </li>
              <li className="files-type">
                <a href="javascript:void(0)">
                  <div className="flex items-center">
                    <div className="me-2">
                      <i className="ri-star-s-line text-[1rem]"></i>
                    </div>
                    <span className="flex-auto text-nowrap"> favourites </span>
                    <span className="badge bg-primarytint1color">02</span>
                  </div>
                </a>
              </li>
              <li className="files-type">
                <a href="javascript:void(0)">
                  <div className="flex items-center">
                    <div className="me-2">
                      <i className="ri-delete-bin-line text-[1rem]"></i>
                    </div>
                    <span className="flex-auto text-nowrap"> Recycle Bin </span>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <div className="flex items-center">
                    <div className="me-2">
                      <i className="ri-settings-3-line text-[1rem]"></i>
                    </div>
                    <span className="flex-auto text-nowrap"> Settings </span>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <div className="flex items-center">
                    <div className="me-2">
                      <i className="ri-questionnaire-line text-[1rem]"></i>
                    </div>
                    <span className="flex-auto text-nowrap"> Help Center </span>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <div className="flex items-center">
                    <div className="me-2">
                      <i className="ri-folder-line text-[1rem]"></i>
                    </div>
                    <span className="flex-auto text-nowrap"> Version </span>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <div className="flex items-center">
                    <div className="me-2">
                      <i className="ri-logout-box-line text-[1rem]"></i>
                    </div>
                    <span className="flex-auto text-nowrap"> Log out </span>
                  </div>
                </a>
              </li>
              <li className="px-0 pt-0">
                <span className="text-xs text-textmuted dark:text-textmuted/50">Most Recent</span>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <div className="me-0">
                    <span className="avatar avatar-md bg-primary/10 !text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                        <rect width="256" height="256" fill="none"></rect>
                        <path d="M112,175.67V168a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8h56a8,8,0,0,0,8-8v-8.82L144,216V160Z" opacity="0.2"></path>
                        <polyline points="112 175.67 144 160 144 216 112 199.18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
                        <rect x="40" y="160" width="72" height="56" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></rect>
                        <polygon points="152 32 152 88 208 88 152 32" opacity="0.2"></polygon>
                        <polyline points="152 32 152 88 208 88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
                        <path d="M176,224h24a8,8,0,0,0,8-8V88L152,32H56a8,8,0,0,0-8,8v88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
                      </svg>
                    </span>
                  </div>
                  <div>
                    <a href="javascript:void(0);" data-hs-overlay="#offcanvasRight" aria-controls="offcanvasRight">VID-14512223-AKP823.mp4</a>
                  </div>
                  <div className="ms-auto">
                    <span className="font-medium text-textmuted dark:text-textmuted/50">1.2KB</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <div className="me-0">
                    <span className="avatar avatar-md bg-primarytint1color/10 !text-primarytint1color">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                        <rect width="256" height="256" fill="none"></rect>
                        <path d="M112,175.67V168a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8h56a8,8,0,0,0,8-8v-8.82L144,216V160Z" opacity="0.2"></path>
                        <polyline points="112 175.67 144 160 144 216 112 199.18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
                        <rect x="40" y="160" width="72" height="56" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></rect>
                        <polygon points="152 32 152 88 208 88 152 32" opacity="0.2"></polygon>
                        <polyline points="152 32 152 88 208 88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
                        <path d="M176,224h24a8,8,0,0,0,8-8V88L152,32H56a8,8,0,0,0-8,8v88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
                      </svg>
                    </span>
                  </div>
                  <div>
                    <a href="javascript:void(0);" data-hs-overlay="#offcanvasRight" aria-controls="offcanvasRight">AUD-14512223-AKP823.mp3</a>
                  </div>
                  <div className="ms-auto">
                    <span className="font-medium text-textmuted dark:text-textmuted/50">25GB</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <div className="me-0">
                    <span className="avatar avatar-md bg-primarytint2color/10 !text-primarytint2color">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                        <rect width="256" height="256" fill="none"></rect>
                        <path d="M112,175.67V168a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8h56a8,8,0,0,0,8-8v-8.82L144,216V160Z" opacity="0.2"></path>
                        <polyline points="112 175.67 144 160 144 216 112 199.18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
                        <rect x="40" y="160" width="72" height="56" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></rect>
                        <polygon points="152 32 152 88 208 88 152 32" opacity="0.2"></polygon>
                        <polyline points="152 32 152 88 208 88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>
                        <path d="M176,224h24a8,8,0,0,0,8-8V88L152,32H56a8,8,0,0,0-8,8v88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>
                      </svg>
                    </span>
                  </div>
                  <div>
                    <a href="javascript:void(0);" data-hs-overlay="#offcanvasRight" aria-controls="offcanvasRight">VID-14211110-AKP823.mp4</a>
                  </div>
                  <div className="ms-auto">
                    <span className="font-medium text-textmuted dark:text-textmuted/50">36GB</span>
                  </div>
                </div>
              </li>
              <li className="px-0 pt-3">
                <span className="text-xs text-textmuted dark:text-textmuted/50">Upload File</span>
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
