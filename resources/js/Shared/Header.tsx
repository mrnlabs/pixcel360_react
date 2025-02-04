import React from 'react'
import { ToggleNav } from './ToggleNav'

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
              {/* <!-- End::header-element --> */}
              {/* <!-- Start::header-element --> */}
              <li className="header-element country-selector hs-dropdown ti-dropdown  hidden sm:block [--placement:bottom-right] rtl:[--placement:bottom-left]">
                <div className="ti-dropdown-divider divide-y divide-gray-200 dark:divide-white/10"></div>
                {/* <!-- Start::header-link|dropdown-toggle --> */}
                <a aria-label="anchor" href="javascript:void(0);" className="header-link hs-dropdown-toggle ti-dropdown-toggle" data-bs-auto-close="outside" data-bs-toggle="dropdown">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 header-link-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"></path>
                  </svg>
                </a>
                {/* <!-- End::header-link|dropdown-toggle --> */}
                <ul className="main-header-dropdown hs-dropdown-menu ti-dropdown-menu min-w-[10rem] hidden" data-popper-placement="none" role="menu">
                  <li>
                    <a className="ti-dropdown-item flex items-center" href="javascript:void(0);">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="avatar avatar-rounded avatar-xs leading-none me-2">
                            <img src="../assets/images/flags/us_flag.jpg" alt="img"/>
                          </span> English
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a className="ti-dropdown-item flex items-center" href="javascript:void(0);">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="avatar avatar-rounded avatar-xs leading-none me-2">
                            <img src="../assets/images/flags/spain_flag.jpg" alt="img"/>
                          </span> español
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a className="ti-dropdown-item flex items-center" href="javascript:void(0);">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="avatar avatar-rounded avatar-xs leading-none me-2">
                            <img src="../assets/images/flags/french_flag.jpg" alt="img"/>
                          </span> français
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a className="ti-dropdown-item flex items-center" href="javascript:void(0);">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="avatar avatar-rounded avatar-xs leading-none me-2">
                            <img src="../assets/images/flags/uae_flag.jpg" alt="img"/>
                          </span> عربي
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a className="ti-dropdown-item flex items-center" href="javascript:void(0);">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="avatar avatar-rounded avatar-xs leading-none me-2">
                            <img src="../assets/images/flags/germany_flag.jpg" alt="img"/>
                          </span> Deutsch
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a className="ti-dropdown-item flex items-center" href="javascript:void(0);">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="avatar avatar-rounded avatar-xs leading-none me-2">
                            <img src="../assets/images/flags/china_flag.jpg" alt="img"/>
                          </span> 中国人
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a className="ti-dropdown-item flex items-center" href="javascript:void(0);">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="avatar avatar-rounded avatar-xs leading-none me-2">
                            <img src="../assets/images/flags/italy_flag.jpg" alt="img"/>
                          </span> Italiano
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a className="ti-dropdown-item flex items-center" href="javascript:void(0);">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="avatar avatar-rounded avatar-xs leading-none me-2">
                            <img src="../assets/images/flags/russia_flag.jpg" alt="img"/>
                          </span> Русский
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
              {/* <!-- End::header-element --> */}
              {/* <!-- Start::header-element --> */}
              {/* <!-- light and dark theme --> */}
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
              {/* <!-- End light and dark theme --> */}
              {/* <!-- End::header-element --> */}
              {/* <!-- Start::header-element --> */}
              <li className="header-element cart-dropdown hs-dropdown ti-dropdown [--auto-close:inside]">
                {/* <!-- Start::header-link|dropdown-toggle --> */}
                <a aria-label="anchor" href="javascript:void(0);" className="header-link hs-dropdown-toggle ti-dropdown-toggle" data-bs-auto-close="outside" data-bs-toggle="dropdown">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 header-link-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
                  </svg>
                  <span className="badge bg-secondary rounded-full header-icon-badge text-white" id="cart-icon-badge">5</span>
                </a>
                {/* <!-- End::header-link|dropdown-toggle --> */}
                {/* <!-- Start::main-header-dropdown --> */}
                <div className="main-header-dropdown hs-dropdown-menu ti-dropdown-menu hidden" data-popper-placement="none" role="menu">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="mb-0 text-[15px] font-medium">Cart Items <span className="badge bg-primarytint2color text-white ms-1 !py-[0.15rem] rounded-full" id="cart-data">5</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-textmuted dark:text-textmuted/50">Sub Total : </span>
                        <h6 className="mb-0"> $740</h6>
                      </div>
                    </div>
                  </div>
                  <hr className="dropdown-divider"/>
                  <ul className="list-none mb-0" id="header-cart-items-scroll" data-simplebar="init">
                    <div className="simplebar-wrapper" style={{ margin: '0px'}}>
                      <div className="simplebar-height-auto-observer-wrapper">
                        <div className="simplebar-height-auto-observer"></div>
                      </div>
                      <div className="simplebar-mask">
                        <div className="simplebar-offset" style={{ right: '0px', bottom: '0px' }}>
                          <div className="simplebar-content-wrapper" tabIndex={0} role="region" aria-label="scrollable content" style={{ height: 'auto', overflow: 'hidden'}}>
                            <div className="simplebar-content" style={{ padding: '0px'}}>
                              <li className="ti-dropdown-item block">
                                <div className="flex items-center cart-dropdown-item gap-4">
                                  <div className="leading-none">
                                    <span className="avatar avatar-xl bg-primary/10">
                                      <img src="../assets/images/ecommerce/png/30.png" alt="Wireless Headphones"/>
                                    </span>
                                  </div>
                                  <div className="flex-auto">
                                    <div className="flex items-center justify-between mb-0">
                                      <div className="mb-0 text-[14px] font-medium">
                                        <a href="cart.html">Wireless Headphones</a>
                                        <div className="truncate">
                                          <p className="mb-0 header-cart-text truncate text-[11px] text-textmuted dark:text-textmuted/50"> Wireless freedom with crystal-clear sound and comfortable </p>
                                          <h6 className="font-medium mb-0 mt-1">
                                            <span className="text-success font-normal me-1 text-[11px] inline-block">(Qty : 1)</span>$78
                                          </h6>
                                        </div>
                                      </div>
                                      <div className="text-end">
                                        <a href="javascript:void(0);" className="header-cart-remove dropdown-item-close" aria-label="anchor">
                                          <i className="ri-close-line"></i>
                                        </a>
                                        <h6 className="font-medium mb-0 mt-3">
                                          <span className="text-info op-4 font-normal me-1 text-[11px] inline-block">Total :</span>$75
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li className="ti-dropdown-item block">
                                <div className="flex items-center cart-dropdown-item gap-4">
                                  <div className="leading-none">
                                    <span className="avatar avatar-xl bg-primary/10">
                                      <img src="../assets/images/ecommerce/png/29.png" alt="Ladies Hand Bag"/>
                                    </span>
                                  </div>
                                  <div className="flex-auto">
                                    <div className="flex items-center justify-between mb-0">
                                      <div className="mb-0 text-[14px] font-medium">
                                        <a href="cart.html">Ladies Hand Bag</a>
                                        <div className="truncate">
                                          <p className="mb-0 header-cart-text truncate text-[11px] text-textmuted dark:text-textmuted/50"> Both fashion and functionality. </p>
                                          <h6 className="font-medium mb-0 mt-1">
                                            <span className="text-success font-normal me-1 text-[11px] inline-block">(Qty : 2)</span>$15
                                          </h6>
                                        </div>
                                      </div>
                                      <div className="text-end">
                                        <a href="javascript:void(0);" className="header-cart-remove dropdown-item-close" aria-label="anchor">
                                          <i className="ri-close-line"></i>
                                        </a>
                                        <h6 className="font-medium mb-0 mt-3">
                                          <span className="text-info op-4 font-normal me-1 text-[11px] inline-block">Total :</span>$30
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li className="ti-dropdown-item block">
                                <div className="flex items-center cart-dropdown-item gap-4">
                                  <div className="leading-none">
                                    <span className="avatar avatar-xl bg-primary/10">
                                      <img src="../assets/images/ecommerce/png/32.png" alt="Alarm Clock"/>
                                    </span>
                                  </div>
                                  <div className="flex-auto">
                                    <div className="flex items-center justify-between mb-0">
                                      <div className="mb-0 text-[14px] font-medium">
                                        <a href="cart.html">Alarm Clock</a>
                                        <div className="truncate">
                                          <p className="mb-0 header-cart-text truncate text-[11px] text-textmuted dark:text-textmuted/50"> Add natural beauty to your space </p>
                                          <h6 className="font-medium mb-0 mt-1">
                                            <span className="text-success font-normal me-1 text-[11px] inline-block">(Qty : 1)</span>$84
                                          </h6>
                                        </div>
                                      </div>
                                      <div className="text-end">
                                        <a href="javascript:void(0);" className="header-cart-remove dropdown-item-close" aria-label="anchor">
                                          <i className="ri-close-line"></i>
                                        </a>
                                        <h6 className="font-medium mb-0 mt-3">
                                          <span className="text-info op-4 font-normal me-1 text-[11px] inline-block">Total :</span>$84
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li className="ti-dropdown-item block">
                                <div className="flex items-center cart-dropdown-item gap-4">
                                  <div className="leading-none">
                                    <span className="avatar avatar-xl bg-primary/10">
                                      <img src="../assets/images/ecommerce/png/12.png" alt="Kids' Party Wear Frock"/>
                                    </span>
                                  </div>
                                  <div className="flex-auto">
                                    <div className="flex items-center justify-between mb-0">
                                      <div className="mb-0 text-[14px] font-medium">
                                        <a href="cart.html">Kids' Party Wear Frock</a>
                                        <div className="truncate">
                                          <p className="mb-0 header-cart-text truncate text-[11px] text-textmuted dark:text-textmuted/50"> Crafted from soft, breathable fabric and adorned with delightful </p>
                                          <h6 className="font-medium mb-0 mt-1">
                                            <span className="text-success font-normal me-1 text-[11px] inline-block">(Qty : 1)</span>$37
                                          </h6>
                                        </div>
                                      </div>
                                      <div className="text-end">
                                        <a href="javascript:void(0);" className="header-cart-remove dropdown-item-close" aria-label="anchor">
                                          <i className="ri-close-line"></i>
                                        </a>
                                        <h6 className="font-medium mb-0 mt-3">
                                          <span className="text-info op-4 font-normal me-1 text-[11px] inline-block">Total :</span>$37
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li className="ti-dropdown-item block">
                                <div className="flex items-center cart-dropdown-item gap-4">
                                  <div className="leading-none">
                                    <span className="avatar avatar-xl bg-primary/10">
                                      <img src="../assets/images/ecommerce/png/16.png" alt="Smart Watch"/>
                                    </span>
                                  </div>
                                  <div className="flex-auto">
                                    <div className="flex items-center justify-between mb-0">
                                      <div className="mb-0 text-[14px] font-medium">
                                        <a href="cart.html">Advanced Smart Watch</a>
                                        <div className="truncate">
                                          <p className="mb-0 header-cart-text truncate text-[11px] text-textmuted dark:text-textmuted/50"> ultimate in wearable technology,combining cutting-edge </p>
                                          <h6 className="font-medium mb-0 mt-1">
                                            <span className="text-success font-normal me-1 text-[11px] inline-block">(Qty : 2)</span>$29
                                          </h6>
                                        </div>
                                      </div>
                                      <div className="text-end">
                                        <a href="javascript:void(0);" className="header-cart-remove dropdown-item-close" aria-label="anchor">
                                          <i className="ri-close-line"></i>
                                        </a>
                                        <h6 className="font-medium mb-0 mt-3">
                                          <span className="text-info op-4 font-normal me-1 text-[11px] inline-block">Total :</span>$48
                                        </h6>
                                      </div>
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
                    <div className="simplebar-track simplebar-vertical" style={{ visibility: 'hidden'}}>
                      <div className="simplebar-scrollbar" style={{height: '0px', display: 'none'}}></div>
                    </div>
                  </ul>
                  <div className="p-4 empty-header-item border-t grid items-center">
                    <a href="checkout.html" className="ti-btn ti-btn-primary btn-wave text-center waves-effect waves-light">Proceed to checkout</a>
                  </div>
                  <div className="p-[3rem] empty-item hidden">
                    <div className="text-center">
                      <span className="avatar avatar-xl avatar-rounded bg-primary/10 !text-primary">
                        <i className="ri-shopping-cart-2-line fs-2"></i>
                      </span>
                      <h6 className="font-medium mb-1 mt-3">Your Cart is Empty</h6>
                      <span className="mb-3 font-normal text-[13px] block">Add some items to make me happy :)</span>
                      <a href="products.html" className="ti-btn bg-primarytint1color text-white btn-wave ti-btn-sm m-1 waves-effect waves-light" data-abc="true">continue shopping <i className="bi bi-arrow-right ms-1"></i>
                      </a>
                    </div>
                  </div>
                </div>
                {/* <!-- End::main-header-dropdown --> */}
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
              {/* <!-- End::header-element --> */}
              {/* <!-- Start::header-element --> */}
              <li className="header-element ti-dropdown hs-dropdown">
                {/* <!-- Start::header-link|dropdown-toggle --> */}
                <a aria-label="anchor" href="javascript:void(0);" className="header-link hs-dropdown-toggle ti-dropdown-toggle" id="mainHeaderProfile" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                  <div className="flex items-center">
                    <div>
                      <img src="../assets/images/faces/15.jpg" alt="img" className="avatar avatar-sm mb-0"/>
                    </div>
                  </div>
                </a>
                {/* <!-- End::header-link|dropdown-toggle --> */}
                <ul className="main-header-dropdown hs-dropdown-menu ti-dropdown-menu pt-0 overflow-hidden header-profile-dropdown hidden" aria-labelledby="mainHeaderProfile" role="menu">
                  <li>
                    <div className="ti-dropdown-item text-center border-b border-defaultborder dark:border-defaultborder/10 block">
                      <span> Mr.Henry </span>
                      <span className="block text-xs text-textmuted dark:text-textmuted/50">UI/UX Designer</span>
                    </div>
                  </li>
                  <li>
                    <a className="ti-dropdown-item flex items-center" href="profile.html">
                      <i className="fe fe-user p-1 rounded-full bg-primary/10 text-primary me-2 text-[1rem]"></i>Profile </a>
                  </li>
                  <li>
                    <a className="ti-dropdown-item flex items-center" href="mail.html">
                      <i className="fe fe-mail p-1 rounded-full bg-primary/10 text-primary me-2 text-[1rem]"></i>Mail Inbox </a>
                  </li>
                  <li>
                    <a className="ti-dropdown-item flex items-center" href="file-manager.html">
                      <i className="fe fe-database p-1 rounded-full bg-primary/10 text-primary klist me-2 text-[1rem]"></i>File Manger <span className="badge bg-primarytint1color text-white ms-auto text-[0.5625rem]">2</span>
                    </a>
                  </li>
                  <li>
                    <a className="ti-dropdown-item flex items-center" href="mail-settings.html">
                      <i className="fe fe-settings p-1 rounded-full bg-primary/10 text-primary ings me-2 text-[1rem]"></i>Settings </a>
                  </li>
                  <li className="border-t border-defaultborder dark:border-defaultborder/10 bg-light">
                    <a className="ti-dropdown-item flex items-center" href="chat.html">
                      <i className="fe fe-help-circle p-1 rounded-full bg-primary/10 text-primary set me-2 text-[1rem]"></i>Help </a>
                  </li>
                  <li>
                    <a className="ti-dropdown-item flex items-center" href="sign-in-cover.html">
                      <i className="fe fe-lock p-1 rounded-full bg-primary/10 text-primary ut me-2 text-[1rem]"></i>Log Out </a>
                  </li>
                </ul>
              </li>
              {/* <!-- End::header-element --> */}
              {/* <!-- Start::header-element --> */}
              <li className="header-element">
                {/* <!-- Start::header-link|switcher-icon --> */}
                <a href="javascript:void(0);" className="header-link switcher-icon" data-hs-overlay="#hs-overlay-switcher" aria-label="anchor">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 header-link-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                  </svg>
                </a>
                {/* <!-- End::header-link|switcher-icon --> */}
              </li>
              {/* <!-- End::header-element --> */}
            </ul>
            {/* <!-- End::header-content-right --> */}
          </div>
          {/* <!-- End::main-header-container --> */}
        </header>
  )
}
