import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { Ban } from 'lucide-react'
import React from 'react'

export default function Cancel() {
  return (
    <Authenticated>
    <Head title="Subscription Cancelled" />

    <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                <div className="p-6 bg-white border-b border-gray-200 text-center">
                   <div className="flex justify-center mb-4">
                   <Ban className='text-center text-red-500' size={60} />
                   </div>
                    <h3 className="text-lg font-medium text-gray-900">Your subscription has been cancelled.</h3>
                    <p className="mt-2 text-gray-600">
                        We're sorry to see you go. If you have any feedback or questions, please let us know.
                    </p>
                    <Link href={route('dashboard')} className="mt-4 ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white font-bold py-2 px-4 rounded">
                        Take Me Home
                    </Link>
                </div>
            </div>
        </div>
    </div>
</Authenticated>
  )
}
