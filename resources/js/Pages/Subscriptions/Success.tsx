import { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CircleCheck } from 'lucide-react';
// @ts-ignore
import confetti from 'canvas-confetti';

interface SuccessProps {
    auth: {
        user: User;
    };
}

export default function Success({ auth }: SuccessProps) {

    useEffect(() => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            colors: ['#ffcc00', '#ff9339'],
            zIndex: 1000,
        };
    
        function fire(particleRatio: number, opts: any) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio),
            });
        }
    
        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }, []);
    
    

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Subscription Successful</h2>}
        >
            <Head title="Subscription Success" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200 text-center">
                            <div className="flex justify-center mb-4">
                                <CircleCheck className='text-center text-green-500' size={60} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Thank you for your subscription!</h3>
                            <p className="mt-2 text-gray-600">
                                Your Pixcel360 subscription is now active and ready to use.
                            </p>
                            <Link href={route('dashboard')} className="mt-4 ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white font-bold py-2 px-4 rounded">
                                Take Me Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
