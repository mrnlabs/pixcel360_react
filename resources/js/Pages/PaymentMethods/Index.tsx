
import React, { useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

const Index = ({ 
    order, 
    uuid,
    return_url, cancel_url, notify_url, amount }: any) => {
  const props = usePage().props
    useEffect(() => {
        // Load PayFast script
        const script = document.createElement('script');
        script.src = 'https://www.payfast.co.za/onsite/engine.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const initiatePayment = async () => {
        
            // @ts-expect-error
          window.payfast_do_onsite_payment({
            "uuid":uuid,
            "return_url":return_url,
            "cancel_url":cancel_url,
            "notify_url":notify_url,
            "amount":amount
        }, function (result: any) {
            if (result === true) {
              alert('Payment successful');
            }
            else {
              alert('Payment failed');
            }
          }); 
    };

    return (
        <>
            <Head title="Checkout" />
            
            <div className="max-w 7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                    
                    {/* Order Summary */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                        <p>Order ID: {order.id}</p>
                        <p>Total: R{amount}</p>
                    </div>

                    {/* Payment Button */}
                    <button
                        id="pay-button"
                        onClick={initiatePayment}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </>
    );
};

export default Index;