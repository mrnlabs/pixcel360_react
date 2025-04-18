import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Link } from '@inertiajs/react'
import { TriangleAlert } from 'lucide-react'
import React from 'react'

export default function TrialEnded() {
  return (
    <Authenticated>
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
    <TriangleAlert className='w-12 h-12 text-red-500' />
      <h2>Your Free Trial Has Ended</h2>
      <p>Please consider upgrading your plan to continue using our services.</p>
      <Link href={route('plans')} type="button" className="mt-3 bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white font-medium py-2 px-4 rounded-sm mb-3 hover:bg-amber-400 transition-colors">Upgrade Now</Link>
    </div>
    </Authenticated>
  )
}
