import Guest from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
 

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
                <a href="/"> 
                    <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="desktop-logo"/> 
                    <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="desktop-white"/> </a> 
                    </div>
               <p className="h5 mb-2 text-center">Sign In</p>
               <p className="mb-4 text-textmuted dark:text-textmuted/50 opacity-70 font-normal text-center">Welcome back Henry !</p>
               <div className="flex mb-3 justify-between gap-2 flex-wrap flex-lg-nowrap"> 
                <button type="button" className="ti-btn ti-btn-lg border border-defaultborder dark:border-defaultborder/10 flex items-center justify-center flex-auto bg-light">
                 <span className="avatar avatar-xs flex-shrink-0"> 
                    <img src="../assets/images/icons/google.svg" alt=""/> 
                    </span> <span className="leading-[1.2rem] ms-2 text-[13px] text-defaulttextcolor">Signup with Google</span> </button> </div>
               <div className="text-center my-3 authentication-barrier"> <span>OR</span> </div>
               <div className="grid grid-cols-12 gap-y-3">
                  <div className="xl:col-span-12 col-span-12"> <label htmlFor="signin-username" className="form-label text-defaulttextcolor">User Name<sup className="text-xs text-danger">*</sup></label> 
                  <input type="text" className="form-control" id="signin-username" placeholder="user name"/> 
                  </div>
                  <div className="xl:col-span-12 col-span-12 mb-2">
                     <label htmlFor="signin-password" className="form-label text-defaulttextcolor block">Password<sup className="text-xs text-danger">*</sup><a href="reset-password-basic.html" className="float-end font-normal text-textmuted dark:text-textmuted/50">Forget password ?</a></label> 
                     <div className="relative"> 
                        <input type="password" className="form-control create-password-input" id="signin-password" placeholder="password"/> 
                        <a aria-label="anchor" href="javascript:void(0);" className="show-password-button text-textmuted dark:text-textmuted/50" 
                         id="button-addon2"><i className="ri-eye-off-line align-middle"></i></a> </div>
                     <div className="mt-2">
                        <div className="form-check"> 
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" /> 
                            <label className="form-check-label text-textmuted dark:text-textmuted/50 font-normal" htmlFor="defaultCheck1"> Remember password ? </label> 
                            </div>
                     </div>
                  </div>
               </div>
               <div className="grid mt-4"> <a href="index.html" className="ti-btn ti-btn-primary">Sign In</a> </div>
               <div className="text-center">
                  <p className="text-textmuted dark:text-textmuted/50 mt-3 mb-0">Dont have an account? <a href="sign-up-basic.html" className="text-primary">Sign Up</a></p>
               </div>
               <div className="btn-list text-center mt-3"> <button aria-label="button" type="button" className="ti-btn ti-btn-icon btn-wave ti-btn-soft-primary"> <i className="ri-facebook-line leading-none align-center text-[17px]"></i> </button> <button aria-label="button" type="button" className="ti-btn ti-btn-icon btn-wave ti-btn-soft-primary1"> <i className="ri-twitter-x-line leading-none align-center text-[17px]"></i> </button> <button aria-label="button" type="button" className="ti-btn ti-btn-icon btn-wave ti-btn-soft-primary2"> <i className="ri-instagram-line leading-none align-center text-[17px]"></i> </button> </div>
            </div>
         </div>
      </div>
      <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-3 md:col-span-3 sm:col-span-2 col-span-12"></div>
   </div>
</div>
        </Guest>
    );
}
