// PayFastCheckout.jsx
import ThemeTextInput from '@/Components/Form/ThemeTextInput';
import InputError from '@/Components/InputError';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Loader } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import CheckoutPlan from './CheckoutPlan';

const PayFastCheckout = ({ payfastIdentifier, onSuccess, onError, plan }: any) => {
  const scriptLoaded = useRef(false);
  
  useEffect(() => {
    // Check if PayFast identifier exists
    if (!payfastIdentifier) return;
    
    // Load PayFast script if not already loaded
    // @ts-expect-error
    if (!window.payfast_do_onsite_payment && !scriptLoaded.current) {
      scriptLoaded.current = true;
      
      const script = document.createElement('script');
      script.src = 'https://sandbox.payfast.co.za/onsite/engine.js';
      script.async = true;
      
      script.onload = () => {
        // Initialize PayFast payment when script loads
        initializePayment();
      };
      
      script.onerror = () => {
        if (onError) onError('Failed to load PayFast payment script');
      };
      
      document.body.appendChild(script);
    } 
  }, [payfastIdentifier, onSuccess, onError]);
  
  const initializePayment = () => {
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

  // @ts-ignore
  const { user } = usePage().props.auth;
   const { data, setData, post, processing, errors, reset } = useForm({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
      });
  
  const handleSubmit = () => {
      post('/register', {
          onSuccess: () => {
              reset();
              if (onSuccess) onSuccess();
          },
          onError: (errors) => {
              if (onError) onError(errors);
          },
      });
  };
  
  return (
    <div className="flex justify-center authentication authentication-basic h-full">
        <div className="w-[35rem] xl:max-w-[41.66666667%] md:max-w-[60%] ">
        <div className="box ">
        <div className="box-body p-[3rem]">
        <p className="h5 mb-2 text-center">Complete Your Payment</p>
        <p className="mb-4 text-textmuted dark:text-textmuted/50 opacity-70 font-normal text-center">Please confirm your payment details before proceeding</p>
        
         <CheckoutPlan plan={plan}/>
        
        
        
        <div className="grid grid-cols-12 gap-y-4">
        <div className="xl:col-span-12 col-span-12">
          <label htmlFor="firstname" className="form-label text-defaulttextcolor">First Name <sup className="text-xs text-danger">*</sup>
          </label>
          <ThemeTextInput
            id="firstname"
            type="text"
            name="firstname"
            value={data.firstname}
            isFocused={true}
            onChange={(e) => setData("firstname", e.target.value) }
            placeholder="First Name"
        /> 
        <InputError message={errors.firstname} />
        </div>
        <div className="xl:col-span-12 col-span-12">
          <label htmlFor="lastname" className="form-label text-defaulttextcolor">Last Name <sup className="text-xs text-danger">*</sup>
          </label>
          <ThemeTextInput
            id="lastname"
            type="text"
            name="lastname"
            value={data.lastname}
            isFocused={false}
            onChange={(e) => setData("lastname", e.target.value) }
            placeholder="Last Name"
        /> 
        <InputError message={errors.lastname} />
        </div>
        <div className="xl:col-span-12 col-span-12">
          <label htmlFor="lastname" className="form-label text-defaulttextcolor">Email <sup className="text-xs text-danger">*</sup>
          </label>
          <ThemeTextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                autoComplete="username"
                isFocused={true}
                onChange={(e) => setData("email", e.target.value) }
                placeholder="Email"
            /> 
            <InputError message={errors.email} />
        </div>
        <div className="xl:col-span-12 col-span-12">
          <label htmlFor="lastname" className="form-label text-defaulttextcolor">Phone <sup className="text-xs text-danger">*</sup>
          </label>
          <ThemeTextInput
                id="phone"
                type="text"
                name="phone"
                value={data.phone}
                isFocused={true}
                onChange={(e) => setData("phone", e.target.value) }
                placeholder="phone"
            /> 
            <InputError message={errors.phone} />
        </div>
        </div>
        <div className="grid mt-4">
        <button type="button" onClick={initializePayment} disabled={processing} className="ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white">
          {processing && <Loader className="mr-2 h-4 w-4 animate-spin" />}{processing ? 'Loading...' : 'Complete Payment'}</button>
        </div>
        <div className="text-center">
        <p className="text-textmuted dark:text-textmuted/50 mt-3 mb-0">
        <Link href={route('plans')} className="text-primary underline"> Cancel</Link>
        </p>
        </div>

        </div>
        </div>

        </div>
        </div>
  );
};

export default PayFastCheckout;