import MetricsCard from './MetricsCard'
import { Link } from '@inertiajs/react'

const ChartBarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
    <path d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16ZM160,48h40V200H160ZM104,96h40V200H104ZM56,144H88v56H56Z"></path>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
  </svg>
);

const CreditCardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
    <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM32,64H224V80H32ZM224,192H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"></path>
  </svg>
);


export default function HeaderCard() {
  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6">
      <Link href={route('events')} className="">
          <MetricsCard
          icon={<ChartBarIcon />}
          label="Total Events"
          value={123456}
          percentageChange={5.2}
          isPositive={true}
        />
      </Link>
      
      <Link href={route('events')} className="">
          <MetricsCard
          icon={<UsersIcon />}
          label="Orders"
          value={123456}
          percentageChange={5.2}
          isPositive={true}
        />
      </Link>
      
      <Link href={route('events')} className="">
          <MetricsCard
          icon={<CreditCardIcon />}
          label="Subscriptions"
          value={123456}
          percentageChange={5.2}
          isPositive={true}
        />
      </Link>
      
      <Link href={route('events')} className="">
          <MetricsCard
          icon={<UsersIcon />}
          label="Total Users"
          value={123456}
          percentageChange={5.2}
          isPositive={true}
        />
      </Link>
      
        <Link href={route('events')} className="">
          <MetricsCard
          icon={<UsersIcon />}
          label="Queries"
          value={123456}
          percentageChange={5.2}
          isPositive={true}
        />
      </Link>

</div>
  )
}
