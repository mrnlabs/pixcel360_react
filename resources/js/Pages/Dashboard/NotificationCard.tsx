import { EllipsisVertical } from 'lucide-react'
import React from 'react'

export default function NotificationCard() {
  return (
    <div className="xxl:col-span-4 col-span-12">
                      <div className="box">
                        <div className="box-header justify-between">
                          <div className="box-title">Upcoming Events</div>
                          <a aria-label="anchor" href="#!" className="ti-btn ti-btn-sm bg-primary/10 !text-primary"> View All </a>
                        </div>
                        <div className="box-body">
                          <ul className="list-none timeline-widget1 mb-0">
                            <li className="timeline-widget-list">
                              <div className="flex items-center flex-wrap">
                                <div className="avatar avatar-xl bg-primary/10 !text-primary me-2 flex-shrink-0">
                                  <div className="text-center">
                                    <div className=" font-medium leading-none mb-1">02</div>
                                    <div className="text-xs text-defaulttextcolor font-medium leading-none">Mon</div>
                                  </div>
                                </div>
                                <div className="flex flex-wrap flex-auto items-top justify-between flex-xl-nowrap">
                                  <div className="events-width">
                                    <p className="mb-1 timeline-widget-content">You have an announcement - Ipsum Est Diam Eirmod</p>
                                    <p className="mb-0 text-xs leading-none text-textmuted dark:text-textmuted/50">10:00AM <span className="badge bg-primary/10 ms-2 text-primary">Announcement</span>
                                    </p>
                                  </div>
                                  <div className="ti-dropdown hs-dropdown">
                                    <a  aria-label="anchor" href="#!" className="ti-btn ti-btn-light ti-btn-icon" data-bs-toggle="dropdown">
                                    <EllipsisVertical />
                                    </a>
                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Action</a>
                                      </li>
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Another action</a>
                                      </li>
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Something else here</a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="timeline-widget-list">
                              <div className="flex items-center flex-wrap">
                                <div className="avatar avatar-xl bg-primarytint1color/10 !text-primarytint1color me-2 flex-shrink-0">
                                  <div className="text-center">
                                    <div className=" font-medium leading-none mb-1">08</div>
                                    <div className="text-xs text-defaulttextcolor font-medium leading-none">Tue</div>
                                  </div>
                                </div>
                                <div className="flex flex-wrap flex-auto items-top justify-between flex-xl-nowrap">
                                  <div className="events-width">
                                    <p className="mb-1 timeline-widget-content ">National holiday - Vero Jayanti</p>
                                    <p className="mb-0 text-xs leading-none text-textmuted dark:text-textmuted/50">
                                      <span className="badge bg-warning/10 text-warning">Holiday</span>
                                    </p>
                                  </div>
                                  <div className="ti-dropdown hs-dropdown">
                                    <a aria-label="anchor" href="#!" className="ti-btn ti-btn-light ti-btn-icon" data-bs-toggle="dropdown">
                                      <EllipsisVertical />
                                    </a>
                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Action</a>
                                      </li>
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Another action</a>
                                      </li>
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Something else here</a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="timeline-widget-list">
                              <div className="flex items-center flex-wrap">
                                <div className="avatar avatar-xl bg-primarytint2color/10 !text-primarytint2color me-2 flex-shrink-0">
                                  <div className="text-center">
                                    <div className=" font-medium leading-none mb-1">12</div>
                                    <div className="text-xs text-defaulttextcolor font-medium leading-none">Wed</div>
                                  </div>
                                </div>
                                <div className="flex flex-wrap flex-auto items-top justify-between flex-xl-nowrap">
                                  <div className="events-width">
                                    <p className="mb-1 timeline-widget-content">John pup birthday - Team Member</p>
                                    <p className="mb-2 text-xs leading-none text-textmuted dark:text-textmuted/50">09:00AM <span className="badge bg-success/10 text-success ms-2">Birthday</span>
                                    </p>
                                  </div>
                                  <div className="ti-dropdown hs-dropdown">
                                    <a aria-label="anchor" href="#!" className="ti-btn ti-btn-light ti-btn-icon" data-bs-toggle="dropdown">
                                      <EllipsisVertical />
                                    </a>
                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Action</a>
                                      </li>
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Another action</a>
                                      </li>
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Something else here</a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="timeline-widget-list">
                              <div className="flex items-center flex-wrap">
                                <div className="avatar avatar-xl bg-primarytint3color/10 !text-primarytint3color me-2 flex-shrink-0">
                                  <div className="text-center">
                                    <div className=" font-medium leading-none mb-1">20</div>
                                    <div className="text-xs text-defaulttextcolor font-medium leading-none">Thu</div>
                                  </div>
                                </div>
                                <div className="flex flex-wrap flex-auto items-top justify-between flex-xl-nowrap">
                                  <div className="events-width">
                                    <p className="mb-1 timeline-widget-content">National Holiday - Dolore Ipsum</p>
                                    <p className="mb-0 text-xs leading-none text-textmuted dark:text-textmuted/50">
                                      <span className="badge bg-warning/10 text-warning">Holiday</span>
                                    </p>
                                  </div>
                                  <div className="ti-dropdown hs-dropdown">
                                    <a aria-label="anchor" href="#!" className="ti-btn ti-btn-light ti-btn-icon" data-bs-toggle="dropdown">
                                      <EllipsisVertical />
                                    </a>
                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Action</a>
                                      </li>
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Another action</a>
                                      </li>
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Something else here</a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="timeline-widget-list">
                              <div className="flex items-center flex-wrap">
                                <div className="avatar avatar-xl bg-warning/10 !text-warning me-2 flex-shrink-0">
                                  <div className="text-center">
                                    <div className=" font-medium leading-none mb-1">12</div>
                                    <div className="text-xs text-defaulttextcolor font-medium leading-none">Wed</div>
                                  </div>
                                </div>
                                <div className="flex flex-wrap flex-auto items-top justify-between flex-xl-nowrap">
                                  <div className="events-width">
                                    <p className="mb-1 timeline-widget-content ">Amet sed no dolor kasd - Et Dolores Tempor Erat</p>
                                    <p className="mb-0 text-xs leading-none text-textmuted dark:text-textmuted/50">04:00PM <span className="badge bg-primary/10 text-primary ms-2">Announcement</span>
                                    </p>
                                  </div>
                                  <div className="ti-dropdown hs-dropdown">
                                    <a aria-label="anchor" href="#!" className="ti-btn ti-btn-light ti-btn-icon" data-bs-toggle="dropdown">
                                      <EllipsisVertical />
                                    </a>
                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Action</a>
                                      </li>
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Another action</a>
                                      </li>
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Something else here</a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="timeline-widget-list">
                              <div className="flex items-center flex-wrap">
                                <div className="avatar avatar-xl bg-secondary/10 !text-secondary me-2 flex-shrink-0">
                                  <div className="text-center">
                                    <div className=" font-medium leading-none mb-1">21</div>
                                    <div className="text-xs text-defaulttextcolor font-medium leading-none">Fri</div>
                                  </div>
                                </div>
                                <div className="flex flex-wrap flex-auto items-top justify-between flex-xl-nowrap">
                                  <div className="events-width">
                                    <p className="mb-1 timeline-widget-content">John pup birthday - Team Member</p>
                                    <p className="mb-2 text-xs leading-none text-textmuted dark:text-textmuted/50">09:00AM <span className="badge bg-success/10 text-success ms-2">Birthday</span>
                                    </p>
                                  </div>
                                  <div className="ti-dropdown hs-dropdown">
                                    <a aria-label="anchor" href="#!" className="ti-btn ti-btn-light ti-btn-icon" data-bs-toggle="dropdown">
                                      <EllipsisVertical />
                                    </a>
                                    <ul className="ti-dropdown-menu hs-dropdown-menu hidden" role="menu">
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Action</a>
                                      </li>
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Another action</a>
                                      </li>
                                      <li>
                                        <a className="ti-dropdown-item" href="#!">Something else here</a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
  )
}
