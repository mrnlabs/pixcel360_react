
import React, { useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import PayFastCheckout from './PayFastCheckout';
import Authenticated from '@/Layouts/AuthenticatedLayout';

const Index = ({ payfastIdentifier, error, plan }: any) => {
  const props = usePage().props
  const [paymentStatus, setPaymentStatus] = useState<{ success: boolean; message: string; data: any } | null>(null);
  
  const handlePaymentSuccess = (result: any) => {
    setPaymentStatus({
      success: true,
      message: 'Payment completed successfully!',
      data: result
    });
    
    // You might want to redirect or update your UI
    // window.location.href = '/thank-you';
  };
  
  const handlePaymentError = (error: any) => {
    setPaymentStatus({
      success: false,
      message: typeof error === 'string' ? error : 'Payment failed. Please try again.',
      data: error
    });
  };


    return (
        <Authenticated>
            <Head title="Checkout" />
            
            <div>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              {paymentStatus && (
                <div className={`${paymentStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} border px-4 py-3 rounded mb-4`}>
                  {paymentStatus.message}
                </div>
              )}
              
              {payfastIdentifier && (
                <div className="mt-6">
                  <PayFastCheckout 
                    payfastIdentifier={payfastIdentifier} 
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    plan={plan}
                  />
                </div>
              )}
              
              {!payfastIdentifier && !error && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                  Unable to initialize payment. Please try again later.
                </div>
              )}
      </div>

        </Authenticated>
    );
};

export default Index;