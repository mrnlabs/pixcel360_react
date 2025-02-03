import React from 'react'

export default function Sidebar() {
  return (
    <aside className="app-sidebar" id="sidebar">
          {/* <!-- Start::main-sidebar-header --> */}
          <div className="main-sidebar-header">
            <a href="index.html" className="header-logo">
              <img src="../assets/images/brand-logos/desktop-logo.png" alt="logo" className="desktop-logo"/>
              <img src="../assets/images/brand-logos/toggle-dark.png" alt="logo" className="toggle-dark"/>
              <img src="../assets/images/brand-logos/desktop-dark.png" alt="logo" className="desktop-dark"/>
              <img src="../assets/images/brand-logos/toggle-logo.png" alt="logo" className="toggle-logo"/>
              <img src="../assets/images/brand-logos/toggle-white.png" alt="logo" className="toggle-white"/>
              <img src="../assets/images/brand-logos/desktop-white.png" alt="logo" className="desktop-white"/>
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
                          <li className="slide has-sub active open">
                            <a href="javascript:void(0);" className="side-menu__item active">
                              <i className="ri-arrow-down-s-line side-menu__angle"></i>
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 side-menu__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
                              </svg>
                              <span className="side-menu__label">Dashboards</span>
                            </a>
                           
                          </li>
                          {/* <!-- End::slide --> */}
                          {/* <!-- Start::slide__category --> */}
                          <li className="slide__category">
                            <span className="category-name">Web Apps</span>
                          </li>
                          {/* <!-- End::slide__category --> */}
                          {/* <!-- Start::slide --> */}
                          <li className="slide has-sub">
                            <a href="javascript:void(0);" className="side-menu__item">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 side-menu__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"></path>
                              </svg>
                              <span className="side-menu__label">Apps</span>
                              <i className="ri-arrow-down-s-line side-menu__angle"></i>
                            </a>
                           
                          </li>
                          {/* <!-- End::slide --> */}
                          {/* <!-- Start::slide --> */}
                          <li className="slide has-sub">
                            <a href="javascript:void(0);" className="side-menu__item">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 side-menu__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"></path>
                              </svg>
                              <span className="side-menu__label">Nested Menu</span>
                              <i className="ri-arrow-down-s-line side-menu__angle"></i>
                            </a>
                            <ul className="slide-menu child1" data-popper-placement="top" 
                             style={{position: 'relative', left: '0px', top: '0px', margin: '0px', transform: 'translate(120px, 894px)'}} data-popper-reference-hidden="" data-popper-escaped="">
                              <li className="slide side-menu__label1">
                                <a href="javascript:void(0)">Nested Menu</a>
                              </li>
                              <li className="slide">
                                <a href="javascript:void(0);" className="side-menu__item">Nested-1</a>
                              </li>
                              <li className="slide has-sub">
                                <a href="javascript:void(0);" className="side-menu__item">Nested-2 <i className="ri-arrow-down-s-line side-menu__angle"></i>
                                </a>
                                <ul className="slide-menu child2">
                                  <li className="slide">
                                    <a href="javascript:void(0);" className="side-menu__item">Nested-2.1</a>
                                  </li>
                                  <li className="slide has-sub">
                                    <a href="javascript:void(0);" className="side-menu__item">Nested-2.2 <i className="ri-arrow-down-s-line side-menu__angle"></i>
                                    </a>
                                    <ul className="slide-menu child3">
                                      <li className="slide">
                                        <a href="javascript:void(0);" className="side-menu__item">Nested-2.2.1</a>
                                      </li>
                                      <li className="slide">
                                        <a href="javascript:void(0);" className="side-menu__item">Nested-2.2.2</a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                          {/* <!-- End::slide --> */}
                          {/* <!-- Start::slide__category --> */}
                          <li className="slide__category">
                            <span className="category-name">Pages</span>
                          </li>
                          {/* <!-- End::slide__category --> */}
                          {/* <!-- Start::slide --> */}
                          <li className="slide has-sub">
                            <a href="javascript:void(0);" className="side-menu__item">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 side-menu__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"></path>
                              </svg>
                              <span className="side-menu__label">Authentication</span>
                              <i className="ri-arrow-down-s-line side-menu__angle"></i>
                            </a>
                           {/* Maaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
                          </li>
                          {/* <!-- End::slide --> */}
                          {/* <!-- Start::slide --> */}
                          <li className="slide has-sub">
                            <a href="javascript:void(0);" className="side-menu__item">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 side-menu__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"></path>
                              </svg>
                              <span className="side-menu__label">Error</span>
                              <i className="ri-arrow-down-s-line side-menu__angle"></i>
                            </a>
                           
                          </li>
                          {/* <!-- End::slide --> */}
                          {/* <!-- Start::slide --> */}
                          <li className="slide has-sub">
                            <a href="javascript:void(0);" className="side-menu__item">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 side-menu__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"></path>
                              </svg>
                              <span className="side-menu__label">Pages</span>
                              <i className="ri-arrow-down-s-line side-menu__angle"></i>
                            </a>
                           
                          </li>
                          {/* <!-- End::slide --> */}
                          {/* <!-- Start::slide__category --> */}
                          <li className="slide__category">
                            <span className="category-name">General</span>
                          </li>
                          {/* <!-- End::slide__category --> */}
                          {/* <!-- Start::slide --> */}
                          <li className="slide has-sub">
                            <a href="javascript:void(0);" className="side-menu__item">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 side-menu__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"></path>
                              </svg>
                              <span className="side-menu__label">Forms</span>
                              <i className="ri-arrow-down-s-line side-menu__angle"></i>
                            </a>
                          
                          </li>
                          {/* <!-- End::slide --> */}
                          {/* <!-- Start::slide --> */}
                          <li className="slide has-sub">
                            <a href="javascript:void(0);" className="side-menu__item">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 side-menu__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"></path>
                              </svg>
                              <span className="side-menu__label">Ui Elements</span>
                              <i className="ri-arrow-down-s-line side-menu__angle"></i>
                            </a>
                           
                          </li>
                          {/* <!-- End::slide --> */}
                          {/* <!-- Start::slide --> */}
                          <li className="slide has-sub">
                            <a href="javascript:void(0);" className="side-menu__item">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 side-menu__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"></path>
                              </svg>
                              <span className="side-menu__label">Advanced UI</span>
                              <i className="ri-arrow-down-s-line side-menu__angle"></i>
                            </a>
                           
                          </li>
                          {/* <!-- End::slide --> */}
                          {/* <!-- Start::slide --> */}
                          <li className="slide has-sub">
                            <a href="javascript:void(0);" className="side-menu__item">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 side-menu__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"></path>
                              </svg>
                              <span className="side-menu__label">Utilities</span>
                              <i className="ri-arrow-down-s-line side-menu__angle"></i>
                            </a>
                           
                          </li>
                          {/* <!-- End::slide --> */}
                          {/* <!-- Start::slide --> */}
                          <li className="slide">
                            <a href="widgets.html" className="side-menu__item">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 side-menu__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"></path>
                              </svg>
                              <span className="side-menu__label">Widgets</span>
                            </a>
                          </li>
                          {/* <!-- End::slide --> */}
                          {/* <!-- Start::slide__category --> */}
                          <li className="slide__category">
                            <span className="category-name">Maps &amp; Icons</span>
                          </li>
                          {/* <!-- End::slide__category --> */}
                          {/* <!-- Start::slide --> */}
                          <li className="slide has-sub">
                            <a href="javascript:void(0);" className="side-menu__item">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 side-menu__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"></path>
                              </svg>
                              <span className="side-menu__label">Maps</span>
                              <i className="ri-arrow-down-s-line side-menu__angle"></i>
                            </a>
                            {/* <ul className="slide-menu child1" data-popper-placement="top" style="position: relative; left: 0px; top: 0px; margin: 0px; transform: translate(120px, 1470px);" data-popper-reference-hidden="" data-popper-escaped="">
                              <li className="slide side-menu__label1">
                                <a href="javascript:void(0)">Maps</a>
                              </li>
                              <li className="slide">
                                <a href="vector-maps.html" className="side-menu__item">Vector Maps</a>
                              </li>
                              <li className="slide">
                                <a href="leaflet-maps.html" className="side-menu__item">Leaflet Maps</a>
                              </li>
                              <li className="slide">
                                <a href="google-maps.html" className="side-menu__item">Google Maps</a>
                              </li>
                            </ul> */}
                          </li>
                          {/* <!-- End::slide --> */}
                          {/* <!-- Start::slide --> */}
                          <li className="slide">
                            <a href="icons.html" className="side-menu__item">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 side-menu__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"></path>
                              </svg>
                              <span className="side-menu__label">Icons</span>
                            </a>
                          </li>
                          {/* <!-- End::slide --> */}
                          {/* <!-- Start::slide__category --> */}
                          <li className="slide__category">
                            <span className="category-name">Tables &amp; Charts</span>
                          </li>
                          {/* <!-- End::slide__category --> */}
                          {/* <!-- Start::slide --> */}
                          <li className="slide has-sub">
                            <a href="javascript:void(0);" className="side-menu__item">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 side-menu__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"></path>
                              </svg>
                              <span className="side-menu__label">Charts</span>
                              <i className="ri-arrow-down-s-line side-menu__angle"></i>
                            </a>
                       
                          </li>
                          {/* <!-- End::slide --> */}
                          {/* <!-- Start::slide --> */}
                          <li className="slide has-sub">
                            <a href="javascript:void(0);" className="side-menu__item">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 side-menu__icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"></path>
                              </svg>
                              <span className="side-menu__label">Tables</span>
                              <i className="ri-arrow-down-s-line side-menu__angle"></i>
                            </a>
                        
                          </li>
                          {/* <!-- End::slide --> */}
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
