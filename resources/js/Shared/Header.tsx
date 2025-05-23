import React, { useEffect, useState } from 'react'
import HeaderProfile from './HeaderProfile'
import FullScreen from './FullScreen'
import { Search, WifiOff } from 'lucide-react'
import { HeaderSearch } from './HeaderSearch'
import NotificationBell from './NotificationBell'
import { AuthGuard } from '@/guards/authGuard'

export default function Header() {

  /**
 * React hook that tracks whether the user is currently online or offline
 * @returns {boolean} - Returns true if the user is online, false if offline
 */
const useOnlineStatus = () => {
  // Initialize with the current online status
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' 
      ? navigator.onLine 
      : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

  const isOnline = useOnlineStatus();
  return (
    <header className="app-header sticky" id="header">
          
          <div className="main-header-container container-fluid">
            <div className="header-content-left">
              <HeaderSearch/>
            </div>
          
            <ul className="header-content-right">
            
              {/* <li className="header-element header-theme-mode hidden !items-center sm:block md:!px-[0.5rem] px-2">
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
              </li> */}
            
              <AuthGuard 
              roles={["System Admin", "System SuperAdmin"]} 
              permissions={["*"]}
              requireAll={true}>
                <li className="header-element header-theme-mode hidden !items-center sm:block md:!px-[0.5rem] [--auto-close:inside]">
                  <NotificationBell/>
                </li>
              </AuthGuard>
              {!isOnline && (
                <li className="header-element">
                <WifiOff className='animate-pulse text-danger' />
              </li>
              )}
              
              <FullScreen />
              
              
              <HeaderProfile />
             
            </ul>
          
          </div>
        </header>
  )
}
