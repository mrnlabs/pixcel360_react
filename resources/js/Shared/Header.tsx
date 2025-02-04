import React from 'react'
import { ToggleNav } from './ToggleNav'
import HeaderProfile from './HeaderProfile'

export default function Header() {
  return (
    <header className="app-header sticky" id="header">
          {/* <!-- Start::main-header-container --> */}
          <div className="main-header-container container-fluid">
            {/* <!-- Start::header-content-left --> */}
            <div className="header-content-left">
              {/* <!-- Start::header-element --> */}
              <div className="header-element">
                <div className="horizontal-logo">
                  <a href="index.html" className="header-logo">
                    <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="desktop-logo"/>
                    <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="toggle-dark"/>
                    <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="desktop-dark"/>
                    <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="toggle-logo"/>
                    <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="toggle-white"/>
                    <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="desktop-white"/>
                  </a>
                </div>
              </div>
              {/* <!-- End::header-element --> */}
              {/* <!-- Start::header-element --> */}
              <ToggleNav />
              {/* <!-- End::header-element --> */}
              {/* <!-- Start::header-element --> */}
              <div className="header-element header-search md:!block !hidden my-auto auto-complete-search">
                {/* <!-- Start::header-link --> */}
                <div className="autoComplete_wrapper" role="combobox" aria-owns="autoComplete_list_1" aria-haspopup="true" aria-expanded="false">
                  <input type="text" className="header-search-bar form-control" id="header-search" placeholder="Search anything here ..." 
                  autoComplete="off" />
                  <ul id="autoComplete_list_1" role="listbox" hidden={false}></ul>
                </div>
                <a aria-label="anchor" href="javascript:void(0);" className="header-search-icon border-0">
                  <i className="ri-search-line"></i>
                </a>
                {/* <!-- End::header-link --> */}
              </div>
              {/* <!-- End::header-element --> */}
            </div>
            {/* <!-- End::header-content-left --> */}
            {/* <!-- Start::header-content-right --> */}
            <ul className="header-content-right">
              {/* <!-- Start::header-element --> */}
              <li className="header-element md:!hidden block">
                <a aria-label="anchor" href="javascript:void(0);" className="header-link" data-bs-toggle="modal" data-hs-overlay="#header-responsive-search">
                  {/* <!-- Start::header-link-icon --> */}
                  <i className="bi bi-search header-link-icon"></i>
                  {/* <!-- End::header-link-icon --> */}
                </a>
              </li>
            
              <li className="header-element header-theme-mode hidden !items-center sm:block md:!px-[0.5rem] px-2">
                <a aria-label="anchor" className="hs-dark-mode-active:hidden flex hs-dark-mode group flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 text-textmuted dark:text-textmuted/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10" href="javascript:void(0);" data-hs-theme-click-value="dark">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 header-link-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"></path>
                  </svg>
                </a>
                <a aria-label="anchor" className="hs-dark-mode-active:flex hidden hs-dark-mode group flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium text-defaulttextcolor  transition-all text-xs dark:bg-bodybg dark:bg-bgdark dark:hover:bg-black/20  dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10" href="javascript:void(0);" data-hs-theme-click-value="light">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 header-link-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"></path>
                  </svg>
                </a>
              </li>
            
              {/* <!-- End::header-element --> */}
              {/* <!-- Start::header-element --> */}
              <li className="header-element notifications-dropdown !hidden xl:!block hs-dropdown ti-dropdown [--auto-close:inside]">
                {/* <!-- Start::header-link|dropdown-toggle --> */}
                <a aria-label="anchor" href="javascript:void(0);" className="header-link hs-dropdown-toggle ti-dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" id="messageDropdown" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 header-link-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"></path>
                  </svg>
                  <span className="header-icon-pulse bg-primarytint2color rounded pulse pulse-secondary"></span>
                </a>
                {/* <!-- End::header-link|dropdown-toggle --> */}
                {/* <!-- Start::main-header-dropdown --> */}
                <div className="main-header-dropdown hs-dropdown-menu ti-dropdown-menu hidden" data-popper-placement="none" role="menu">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="mb-0 text-[15px] font-medium">Notifications</p>
                      <span className="badge bg-secondary text-white rounded-sm" id="notifiation-data">5 Unread</span>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <ul className="list-none mb-0" id="header-notification-scroll" data-simplebar="init">
                    <div className="simplebar-wrapper" style={{margin: '0px'}}>
                      <div className="simplebar-height-auto-observer-wrapper">
                        <div className="simplebar-height-auto-observer"></div>
                      </div>
                      <div className="simplebar-mask">
                        <div className="simplebar-offset" style={{right: '0px', bottom: '0px'}}>
                          <div className="simplebar-content-wrapper" tabIndex={0} role="region" aria-label="scrollable content" style={{height: 'auto', overflow: 'hidden'}}>
                            <div className="simplebar-content" style={{padding: '0px'}}>
                              <li className="ti-dropdown-item block">
                                <div className="flex items-center">
                                  <div className="pe-2 leading-none">
                                    <span className="avatar avatar-md avatar-rounded bg-primary">
                                      <img src="../assets/images/faces/1.jpg" alt="user1"/>
                                    </span>
                                  </div>
                                  <div className="grow flex items-center justify-between">
                                    <div>
                                      <p className="mb-0 font-medium">
                                        <a href="chat.html">New Messages</a>
                                      </p>
                                      <div className="text-textmuted dark:text-textmuted/50 font-normal text-xs header-notification-text truncate"> Jane Sam sent you a message.</div>
                                      <div className="font-normal text-[10px] text-textmuted dark:text-textmuted/50 op-8"> Now</div>
                                    </div>
                                    <div>
                                      <a aria-label="anchor" href="javascript:void(0);" className="min-w-fit-content dropdown-item-close1">
                                        <i className="ri-close-line"></i>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li className="ti-dropdown-item block">
                                <div className="flex items-center">
                                  <div className="pe-2 leading-none">
                                    <span className="avatar avatar-md bg-primary avatar-rounded text-xl">
                                      <i className="fe fe-shopping-cart leading-none "></i>
                                    </span>
                                  </div>
                                  <div className="grow flex items-center justify-between">
                                    <div>
                                      <p className="mb-0 font-medium">
                                        <a href="chat.html">Order Updates</a>
                                      </p>
                                      <div className="text-textmuted dark:text-textmuted/50 font-normal text-xs header-notification-text truncate"> Order <span className="text-primarytint1color">#54321</span> has been shipped. </div>
                                      <div className="font-normal text-[10px] text-textmuted dark:text-textmuted/50 op-8"> 2 hours ago</div>
                                    </div>
                                    <div>
                                      <a aria-label="anchor" href="javascript:void(0);" className="min-w-fit-content dropdown-item-close1">
                                        <i className="ri-close-line"></i>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li className="ti-dropdown-item block">
                                <div className="flex items-center">
                                  <div className="pe-2 leading-none">
                                    <span className="avatar avatar-md bg-orange avatar-rounded">
                                      <img src="../assets/images/faces/10.jpg" alt="user1"/>
                                    </span>
                                  </div>
                                  <div className="grow flex items-center justify-between">
                                    <div>
                                      <p className="mb-0 font-medium">
                                        <a href="chat.html">Comment on Post</a>
                                      </p>
                                      <div className="text-textmuted dark:text-textmuted/50 font-normal text-xs header-notification-text truncate"> Reacted: <span className="text-primary3">John Richard</span> on your next purchase! </div>
                                      <div className="font-normal text-[10px] text-textmuted dark:text-textmuted/50 op-8"> 2 hours ago</div>
                                    </div>
                                    <div>
                                      <a aria-label="anchor" href="javascript:void(0);" className="min-w-fit-content dropdown-item-close1">
                                        <i className="ri-close-line"></i>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li className="ti-dropdown-item block">
                                <div className="flex items-center">
                                  <div className="pe-2 leading-none">
                                    <span className="avatar avatar-md bg-success avatar-rounded">
                                      <img src="../assets/images/faces/11.jpg" alt="user1"  />
                                    </span>
                                  </div>
                                  <div className="grow flex items-center justify-between">
                                    <div>
                                      <p className="mb-0 font-medium">
                                        <a href="chat.html">Follow Request</a>
                                      </p>
                                      <div className="text-textmuted dark:text-textmuted/50 font-normal text-xs header-notification-text truncate">
                                        <span className="text-info">Kelin Brown</span> has sent you the request.
                                      </div>
                                      <div className="font-normal text-[10px] text-textmuted dark:text-textmuted/50 op-8"> 1 Day ago</div>
                                    </div>
                                    <div>
                                      <a aria-label="anchor" href="javascript:void(0);" className="min-w-fit-content dropdown-item-close1">
                                        <i className="ri-close-line"></i>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li className="ti-dropdown-item block">
                                <div className="flex items-center">
                                  <div className="pe-2 leading-none">
                                    <span className="avatar avatar-md bg-primarytint2color avatar-rounded">
                                      <i className="ri-gift-line leading-none text-[1rem]"></i>
                                    </span>
                                  </div>
                                  <div className="grow flex items-center justify-between">
                                    <div>
                                      <p className="mb-0 font-medium">
                                        <a href="chat.html">Exclusive Offers</a>
                                      </p>
                                      <div className="text-textmuted dark:text-textmuted/50 font-normal text-xs header-notification-text truncate"> Enjoy <span className="text-success">20% off</span> on your next purchase! </div>
                                      <div className="font-normal text-[10px] text-textmuted dark:text-textmuted/50 op-8"> 5 hours ago</div>
                                    </div>
                                    <div>
                                      <a aria-label="anchor" href="javascript:void(0);" className="min-w-fit-content dropdown-item-close1">
                                        <i className="ri-close-line"></i>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="simplebar-placeholder" style={{width: '0px', height: '0px'}}></div>
                    </div>
                    <div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}>
                      <div className="simplebar-scrollbar" style={{width: '0px', display: 'none'}}></div>
                    </div>
                    <div className="simplebar-track simplebar-vertical" style={{visibility: 'hidden'}}>
                      <div className="simplebar-scrollbar" style={{height: '0px', display: 'none'}}></div>
                    </div>
                  </ul>
                  <div className="p-4 empty-header-item1 border-t">
                    <div className="grid">
                      <a href="javascript:void(0);" className="ti-btn ti-btn-primary btn-wave waves-effect waves-light">View All</a>
                    </div>
                  </div>
                  <div className="p-[3rem] empty-item1 hidden">
                    <div className="text-center">
                      <span className="avatar avatar-xl avatar-rounded bg-secondary/10 !text-secondary">
                        <i className="ri-notification-off-line fs-2"></i>
                      </span>
                      <h6 className="font-medium mt-3">No New Notifications</h6>
                    </div>
                  </div>
                </div>
                {/* <!-- End::main-header-dropdown --> */}
              </li>
              {/* <!-- End::header-element --> */}
              {/* <!-- Start::header-element --> */}
              <li className="header-element header-fullscreen">
                {/* <!-- Start::header-link --> */}
                <a onClick={() => {}} href="javascript:void(0);" className="header-link" aria-label="anchor">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 full-screen-open header-link-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 full-screen-close header-link-icon hidden" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"></path>
                  </svg>
                </a>
                {/* <!-- End::header-link --> */}
              </li>
              
              <HeaderProfile />
             
            </ul>
            {/* <!-- End::header-content-right --> */}
          </div>
          {/* <!-- End::main-header-container --> */}
        </header>
  )
}
