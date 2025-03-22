import { Event, EventProps } from '@/types';
import { Link, router } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { EllipsisVertical } from 'lucide-react'


const BGs = ['bg-secondary/10','bg-warning/10','bg-primarytint3color/10','bg-primarytint2color/10','bg-primarytint1color/10','bg-primary/10'];

const shuffleBGs = (BGs: any) => {
  for (let i = BGs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [BGs[i], BGs[j]] = [BGs[j], BGs[i]];
  }
  return BGs;
};

export default function EventCard({events=[]} : EventProps) {
  const handleViewEvent = (event: Event) => {
    router.get(route('event.edit', event.slug));
  }

  return (
    <div className="xxl:col-span-4 col-span-12">
                      <div className="box">
                        <div className="box-header justify-between">
                          <div className="box-title"> All Events</div>
                          <Link href={route('events')} aria-label="anchor" className="ti-btn ti-btn-sm bg-primary/10 !text-primary"> View All </Link>
                        </div>
                        <div className="box-body">
                          <ul className="list-none timeline-widget1 mb-0">
                            {!events.length && <p className="text-center">No events found</p>}
                            {events.map((event: any, index: number) => (                             
                            
                            <li key={event.id} onClick={() => handleViewEvent(event)} className="timeline-widget-list cursor-pointer">
                              <div className="flex items-center flex-wrap">
                                <div className={`avatar avatar-xl ${shuffleBGs(BGs)[index]} !text-primary me-2 flex-shrink-0`}>
                                  <div className="text-center">
                                    <div className=" font-medium leading-none mb-1">{event?.start_date ? format(parseISO(event?.start_date), 'dd') : '-'}</div>
                                    <div className="text-xs text-defaulttextcolor font-medium leading-none">{event?.start_date ? format(parseISO(event?.start_date), 'EEE') : '-'}</div>
                                  </div>
                                </div>
                                <div className="flex flex-wrap flex-auto items-top justify-between flex-xl-nowrap">
                                  <div className="events-width">
                                    <p className="mb-1 timeline-widget-content">{event.name}</p>
                                    <p className="mb-0 text-xs leading-none text-textmuted dark:text-textmuted/50">{event?.start_date ? format(parseISO(event.start_date), 'HH:mm') : '-'} 
                                    {/* <span className="badge bg-primary/10 ms-2 text-primary">Announcement</span> */}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
  )
}
