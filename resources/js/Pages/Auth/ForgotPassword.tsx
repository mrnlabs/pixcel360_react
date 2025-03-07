import ThemeTextInput from '@/Components/Form/ThemeTextInput';
import InputError from '@/Components/InputError';
import Guest from '@/Layouts/GuestLayout';
import showToast from '@/utils/showToast';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {

    const { data, setData, post, processing, errors, reset } = useForm({email: ""});
    const emailRef = useRef<HTMLInputElement>(null);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("password.email"), {
            onFinish: () => reset("email"),
        });
    };

useEffect(() => {
    emailRef.current?.focus();
}, []);

    return (
        <Guest>
            <Head title="Pixcel360 - Forgot Password" />
            <div className="container">
   <div className="grid grid-cols-12 justify-center items-center authentication authentication-basic h-full">
      <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-3 md:col-span-3 sm:col-span-2 col-span-12"></div>
      <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-8 col-span-12">
         <div className="box my-4">
            <div className="box-body p-[3rem]">
               <div className="mb-3 flex justify-center"> 
                   <Link href="/"> 
                    <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="desktop-logo"/> 
                    <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="desktop-white"/> 
                    </Link> 
                    </div>
               <p className=" mb-2 text-center">Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.</p>
               <div className="flex mb-3 justify-between gap-2 flex-wrap flex-lg-nowrap"> 
                  </div>
               
                  {status && (
                        <p className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </p>
                )}
               <div className="grid grid-cols-12 gap-y-3">
                
                  <div className="xl:col-span-12 col-span-12"> 
                    <label htmlFor="email" className="form-label text-defaulttextcolor">Email<sup className="text-xs text-danger">*</sup>
                    </label> 
                  <ThemeTextInput
                  ref={emailRef}
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    autoComplete="username"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value) }
                    placeholder="Email"
                  /> 
                  <InputError message={errors.email} className="mt-2" />
                  </div>
                
               </div>
               <div className="grid mt-4"> 
                <button type="button" onClick={submit} 
                  disabled={processing} className="cursor-pointer ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white">
                     {processing && <Loader className="mr-2 animate-spin" />} Email Password Reset Link</button> 
                </div>
               <div className="text-center">
                  <p className="text-textmuted dark:text-textmuted/50 mt-3 mb-0">
                  <Link href="/login" className="text-primary underline"> Back to Sign in</Link>
                  </p>
               </div>
            </div>
         </div>
      </div>
      <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-3 md:col-span-3 sm:col-span-2 col-span-12"></div>
   </div>
</div>
        </Guest>
    );
}
