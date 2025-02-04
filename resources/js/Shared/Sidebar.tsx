import React from 'react'
import MenuItem from './MenuItem'
import { CalendarDays, CalendarHeart, CalendarPlus2, House, LogOut, SquarePlus, SquareUserRound } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="app-sidebar" id="sidebar">
          {/* <!-- Start::main-sidebar-header --> */}
          <div className="main-sidebar-header">
            <a href="index.html" className="header-logo">
              <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="desktop-logo"/>
              <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="toggle-dark"/>
              <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="desktop-dark"/>
              <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="toggle-logo"/>
              <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="toggle-white"/>
              <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="desktop-white"/>
            </a>
          </div>
          {/* <!-- End::main-sidebar-header --> */}
          {/* <!-- Start::main-sidebar --> */}
          <div className="main-sidebar" id="sidebar-scroll" data-simplebar="init">
            <div className="simplebar-wrapper" style={{margin: '-8px 0px -80px'}}>
              <div className="simplebar-height-auto-observer-wrapper">
                <div className="simplebar-height-auto-observer"></div>
              </div>
              <div className="simplebar-mask">
                <div className="simplebar-offset" style={{right: '0px', bottom: '0px'}}>
                  <div className="simplebar-content-wrapper" tabIndex={0} role="region" aria-label="scrollable content" style={{height: '100%', overflow: 'hidden scroll'}}>
                    <div className="simplebar-content" style={{padding: '8px 0px 80px'}}>
                      {/* <!-- Start::nav --> */}
                      <nav aria-label="nav2" className="main-menu-container nav nav-pills flex-col sub-open open active">
                        <div className="slide-left active hidden" id="slide-left">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                          </svg>
                        </div>
                        <ul className="main-menu" style={{display: 'block', marginLeft: '0px', marginRight: 0 + 'px'}}>
                          {/* <!-- Start::slide__category --> */}
                          <li className="slide__category">
                            <span className="category-name">Main</span>
                          </li>
                          {/* <!-- End::slide__category --> */}
                          {/* <!-- Start::slide --> */}
                          <MenuItem 
                              href="/dashboard" 
                              icon={House} 
                              label="Dashboard"
                              isRoute={false} 
                          />
                          {/* <!-- End::slide --> */}
                          {/* <!-- Start::slide__category --> */}
                          <li className="slide__category">
                            <span className="category-name">Events</span>
                          </li>
                          
                          <MenuItem 
                              href="/events" 
                              icon={CalendarDays } 
                              label="Events"
                              isRoute={false} 
                          />

                          <MenuItem 
                              href="events.create" 
                              icon={CalendarPlus2 } 
                              label="Create Event"
                              isRoute={true} 
                          />
                        
                          <li className="slide__category">
                            <span className="category-name">Subscriptions</span>
                          </li>
                          <MenuItem 
                              href="subscriptions" 
                              icon={CalendarHeart } 
                              label="All Subscriptions"
                              isRoute={true} 
                          />
                          <MenuItem 
                              href="subscriptions" 
                              icon={SquarePlus } 
                              label="Create Subscription"
                              isRoute={true} 
                          />
                          
                        
                          <li className="slide__category">
                            <span className="category-name">Profile</span>
                          </li>
                          {/* <!-- End::slide__category --> */}
                          {/* <!-- Start::slide --> */}
                          <MenuItem 
                              href="subscriptions" 
                              icon={SquareUserRound } 
                              label="My Profile"
                              isRoute={true} 
                          />
                          <MenuItem 
                              href="logout" 
                              icon={LogOut } 
                              label="Logout"
                              isRoute={true} 
                          />
                         
                         
                        </ul>
                        <div className="slide-right hidden" id="slide-right">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                          </svg>
                        </div>
                      </nav>
                      {/* <!-- End::nav --> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="simplebar-placeholder" style={{width: 'auto', height: '1724px'}}></div>
            </div>
            <div className="simplebar-track simplebar-horizontal" style={{visibility: 'hidden'}}>
              <div className="simplebar-scrollbar" style={{width: '0px', display: 'none'}}></div>
            </div>
            <div className="simplebar-track simplebar-vertical" style={{visibility: 'visible'}}>
              <div className="simplebar-scrollbar" style={{height: '145px', transform: 'translate3d(0px, 0px, 0px)', display: 'block'}}></div>
            </div>
          </div>
          {/* <!-- End::main-sidebar --> */}
        </aside>
  )
}
