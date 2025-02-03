import ThemeTextInput from '@/Components/Form/ThemeTextInput';
import Guest from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

export default function Welcome() {
    const loginError = usePage().props.errors;
    const [showPassword, setShowPassword] = useState(false);
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
               <p className="mb-4 text-textmuted dark:text-textmuted/50 opacity-70 font-normal text-center">Welcome back Henry !</p>
               <div className="flex mb-3 justify-between gap-2 flex-wrap flex-lg-nowrap"> 
                <button type="button" className="ti-btn ti-btn-lg border border-defaultborder dark:border-defaultborder/10 flex items-center justify-center flex-auto bg-light">
                 <span className="avatar avatar-xs flex-shrink-0"> 
                    <img src="google.PNG" alt=""/> 
                    </span> <span className="leading-[1.2rem] ms-2 text-[13px] text-defaulttextcolor">Signup with Google</span> </button> </div>
               <div className="text-center my-3 authentication-barrier"> <span>OR</span> </div>
               {loginError && loginError.email && (
                    <div className="mb-4 text-sm font-medium text-red-500 text-center">
                        {loginError.email}
                    </div>
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
                  </div>
                  <div className="xl:col-span-12 col-span-12 mb-2">
                     <label htmlFor="signin-password" className="form-label text-defaulttextcolor block">Password<sup className="text-xs text-danger">*</sup>
                     <a href="#!" className="float-end font-normal text-textmuted dark:text-textmuted/50">Forgot password ?</a>
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
                        <a onClick={() => setShowPassword(!showPassword)} aria-label="anchor" href="#!" 
                        className="show-password-button text-textmuted dark:text-textmuted/50" 
                         id="button-addon2">
                            {showPassword ? <EyeOff className='align-middle' /> : <Eye className='align-middle' />}
                         </a>
                         </div>
                     <div className="mt-2">
                        <div className="form-check"> 
                            <input 
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData("remember",e.target.checked)
                                }
                            className="form-check-input" type="checkbox" value="" id="remember" /> 
                            <label className="form-check-label text-textmuted dark:text-textmuted/50 font-normal" htmlFor="remember"> Remember password ? </label> 
                            </div>
                     </div>
                  </div>
               </div>
               <div className="grid mt-4"> 
                <button type="button" onClick={submit} 
                  disabled={processing} className="cursor-pointer ti-btn ti-btn-primary">Sign In</button> 
                </div>
               <div className="text-center">
                  <p className="text-textmuted dark:text-textmuted/50 mt-3 mb-0">Dont have an account? 
                  <Link href="/register" className="text-primary">Sign Up</Link>
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
