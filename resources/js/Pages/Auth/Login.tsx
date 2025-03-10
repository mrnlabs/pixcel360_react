import ThemeTextInput from '@/Components/Form/ThemeTextInput';
import InputError from '@/Components/InputError';
import Guest from '@/Layouts/GuestLayout';
import showToast from '@/utils/showToast';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

export default function Welcome() {
    const loginError = usePage().props.errors;
    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false as boolean,
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };



const handleGoogleLogin = async () => {
   try {
         setIsLoading(true);
       const response = await fetch('/auth/google');
       const data = await response.json();
       showToast('success', 'You have logged in successfully!', {position: 'bottom-right'});
       window.location.href = data.url;
   } catch (error) {
         setIsLoading(false);
      showToast('error', 'We could not initiate Google login. Please try again.', {position: 'bottom-right'});
       console.error('Error initiating Google login:', error);
   } finally {
         setIsLoading(false);
   }
};
    return (
        <Guest>
            <Head title="Welcome" />
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
               <p className="h5 mb-2 text-center">Sign In</p>
               <div className="flex mb-3 justify-between gap-2 flex-wrap flex-lg-nowrap"> 
                <button disabled={isLoading} 
                 onClick={handleGoogleLogin} 
                 type="button" className="ti-btn ti-btn-lg border border-defaultborder dark:border-defaultborder/10 flex items-center justify-center flex-auto bg-light">
                 <span className="avatar avatar-xs flex-shrink-0"> 
                    <img src="https://picxel-bucket.s3.af-south-1.amazonaws.com/placeholders/google.png" alt=""/> 
                    </span> <span className="leading-[1.2rem] ms-2 text-[13px] text-defaulttextcolor">
                    {isLoading ? 'Signing in...' : 'Signup with Google'}</span> 
               </button> 
                  </div>
               <div className="text-center my-3 authentication-barrier"> <span>OR</span> </div>
               {loginError && loginError.email && (
                    <div className="mb-4 text-sm font-medium text-red-500 text-center">
                        {loginError.email}
                    </div>
                )}
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
                  <div className="xl:col-span-12 col-span-12 mb-2">
                     <label htmlFor="signin-password" className="form-label text-defaulttextcolor block">Password<sup className="text-xs text-danger">*</sup>
                     <Link href={route("password.request")} className="float-end font-normal text-primary dark:text-primary/50">Forgot password ?</Link>
                     </label> 
                     <div className="relative"> 
                        <ThemeTextInput 
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        isFocused={false}
                        onChange={(e) => setData("password", e.target.value) }
                        placeholder="Password"
                        className="form-control create-password-input" 
                        /> 
                        <div onClick={() => setShowPassword(!showPassword)} aria-label="anchor"
                        className="cursor-pointer show-password-button text-textmuted dark:text-textmuted/50" 
                         id="button-addon2">
                            {showPassword ? <EyeOff className='align-middle' /> : <Eye className='align-middle' />}
                         </div>
                         <InputError message={errors.password} className="mt-2" />
                         </div>
                     <div className="mt-2">
                        <div className="form-check"> 
                            <input 
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData("remember",e.target.checked)
                                }
                            className="form-check-input" type="checkbox" value="" id="remember" /> 
                            <label className="form-check-label text-textmuted dark:text-textmuted/50 font-normal" htmlFor="remember"> Remember me ? </label> 
                            </div>
                     </div>
                  </div>
               </div>
               <div className="grid mt-4"> 
                <button type="button" onClick={submit} onKeyDown={(e) => { if (e.key === 'Enter') submit(e); }}
                  disabled={processing} className="cursor-pointer ti-btn bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white">
                     {processing && <Loader className="mr-2 animate-spin" />}Sign In</button> 
                </div>
               <div className="text-center">
                  <p className="text-textmuted dark:text-textmuted/50 mt-3 mb-0">Dont have an account? 
                  <Link href="/register" className="text-primary"> Sign Up</Link>
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
