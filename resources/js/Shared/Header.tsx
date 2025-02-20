import React from 'react'
import { ToggleNav } from './ToggleNav'
import HeaderProfile from './HeaderProfile'
import FullScreen from './FullScreen'
import { Search } from 'lucide-react'
import { HeaderSearch } from './HeaderSearch'
import NotificationBell from './NotificationBell'

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
            
              <ToggleNav />
              <HeaderSearch/>
            </div>
          
            <ul className="header-content-right">
              {/* <!-- Start::header-element --> */}
              <li className="header-element md:!hidden block">
                <a aria-label="anchor" href="#!" className="header-link" data-bs-toggle="modal" data-hs-overlay="#header-responsive-search">
                  {/* <!-- Start::header-link-icon --> */}
                  <i className="bi bi-search header-link-icon"></i>
                  {/* <!-- End::header-link-icon --> */}
                </a>
              </li>
            
              <li className="header-element header-theme-mode hidden !items-center sm:block md:!px-[0.5rem] px-2">
                <a aria-label="anchor" className="hs-dark-mode-active:hidden flex hs-dark-mode group flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 text-textmuted dark:text-textmuted/50 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10" href="#!" data-hs-theme-click-value="dark">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 header-link-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"></path>
                  </svg>
                </a>
                <a aria-label="anchor" className="hs-dark-mode-active:flex hidden hs-dark-mode group flex-shrink-0 justify-center items-center gap-2  rounded-full font-medium text-defaulttextcolor  transition-all text-xs dark:bg-bodybg dark:bg-bgdark dark:hover:bg-black/20  dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10" href="#!" data-hs-theme-click-value="light">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 header-link-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"></path>
                  </svg>
                </a>
              </li>
            
              {/* <!-- End::header-element --> */}
              {/* <!-- Start::header-element --> */}
              <li className="header-element notifications-dropdown !hidden xl:!block hs-dropdown ti-dropdown [--auto-close:inside]">
                <NotificationBell/>
              </li>
              
              <FullScreen />
              
              
              <HeaderProfile />
             
            </ul>
            {/* <!-- End::header-content-right --> */}
          </div>
          {/* <!-- End::main-header-container --> */}
        </header>
  )
}
