import { useEffect, useState } from 'react';
import { loadStripe, Stripe, StripeElements, StripeError } from '@stripe/stripe-js';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';



interface FormData {
    payment_method: string;
    plan_id: string;
    [key: string]: any;
}

export default function Checkout({ auth, intent, plan, stripeKey }: PageProps) {
    const [stripe, setStripe] = useState<Stripe | null>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [elements, setElements] = useState<StripeElements | null>(null);
    
    const { data, setData, post, processing } = useForm<FormData>({
        payment_method: '',
        plan_id: plan.id,
        price: plan.price
    });

    useEffect(() => {
        if (!stripe && stripeKey) {
            // Initialize Stripe only once when the component mounts
            const initStripe = async () => {
                const stripeInstance = await loadStripe(stripeKey);
                setStripe(stripeInstance);
            };
            initStripe();
        }
    }, [stripeKey, stripe]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe) {
            setError('Stripe is not initialized');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            if (!elements) {
                const newElements = stripe.elements();
                const card = newElements.create('card');
                card.mount('#card-element');
                setElements(newElements);
                return; // Return here to let the card element mount
            }

            const cardElement = elements.getElement('card');
            if (!cardElement) {
                throw new Error('Card element not found');
            }

            const { setupIntent, error } = await stripe.confirmCardSetup(
                intent.client_secret,
                {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: auth.user.firstname
                        }
                    }
                }
            );

            if (error) {
                throw error;
            }

            if (!setupIntent) {
                throw new Error('Failed to setup payment method');
            }

            setData('payment_method', setupIntent.payment_method as string);
            post(route('subscription.process'));

        } catch (error) {
            const stripeError = error as StripeError;
            setError(stripeError.message || 'An unexpected error occurred');
            setIsLoading(false);
        }
    };

    return (
        <AuthenticatedLayout
            // @ts-ignore
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Subscribe to {plan.name}</h2>}
        >
            <Head title="Subscription Checkout" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Plan Details</h3>
                                <p className="mt-2 text-gray-600">
                                    {plan.name} - ${plan.price}/{plan.interval}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Card Details
                                    </label>
                                    <div 
                                        id="card-element" 
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                    {error && (
                                        <div className="text-red-500 text-sm mt-2">
                                            {error}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                                >
                                    {processing || isLoading ? 'Processing...' : 'Subscribe Now'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}