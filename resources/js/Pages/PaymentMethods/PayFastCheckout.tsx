// PayFastCheckout.jsx
import React, { useEffect, useRef } from 'react';

const PayFastCheckout = ({ payfastIdentifier, onSuccess, onError }: any) => {
  const scriptLoaded = useRef(false);
  
  useEffect(() => {
    // Check if PayFast identifier exists
    if (!payfastIdentifier) return;
    
    // Load PayFast script if not already loaded
    // @ts-expect-error
    if (!window.payfast_do_onsite_payment && !scriptLoaded.current) {
      scriptLoaded.current = true;
      
      const script = document.createElement('script');
      script.src = 'https://www.payfast.co.za/onsite/engine.js';
      script.async = true;
      
      script.onload = () => {
        // Initialize PayFast payment when script loads
        initializePayment();
      };
      
      script.onerror = () => {
        if (onError) onError('Failed to load PayFast payment script');
      };
      
      document.body.appendChild(script);
      // @ts-expect-error
    } else if (window.payfast_do_onsite_payment) {
      // PayFast script already loaded, initialize payment
      console.log('PayFast checkout script already loaded');
      //initializePayment();
    }
  }, [payfastIdentifier, onSuccess, onError]);
  
  const initializePayment = () => {
    console.log('PayFast checkout with identifier:', payfastIdentifier);
    // @ts-expect-error
    if (window.payfast_do_onsite_payment && payfastIdentifier) {
      try {
        // @ts-expect-error
        window.payfast_do_onsite_payment({
          uuid: payfastIdentifier,
          return_url: route('payment.success'),
          cancel_url: route('payment.cancel'),
          notify_url: route('payment.notify'),
          // Optional callback handlers
          callback: function(result: any) {
            console.log('Payment Result:', result);
            if (result.status === 'success' && onSuccess) {
              onSuccess(result);
            } else if (result.status !== 'success' && onError) {
              onError(result);
            }
          }
        });
      } catch (error) {
        console.error('PayFast initialization error:', error);
        if (onError) onError(error);
      }
    }
  };
  
  return (
    <div className="payfast-container">
      <button 
        onClick={initializePayment}
        className="payfast-button"
      >
        Complete Payment
      </button>
    </div>
  );
};

export default PayFastCheckout;