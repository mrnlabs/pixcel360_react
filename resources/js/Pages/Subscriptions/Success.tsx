import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Head } from '@inertiajs/react';

interface SuccessProps {
    auth: {
        user: User;
    };
}

export default function Success({ auth }: SuccessProps) {
    return (
        <AuthenticatedLayout
            // @ts-ignore
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Subscription Successful</h2>}
        >
            <Head title="Subscription Success" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Thank you for your subscription!</h3>
                            <p className="mt-2 text-gray-600">
                                Your subscription has been processed successfully. You can now access all premium features.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}