import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import ThemeTextInput from '@/Components/Form/ThemeTextInput';
import { Eye, EyeOff, Loader } from 'lucide-react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="container">
  <div className="flex justify-center items-center authentication authentication-basic h-full">
    <div className="w-[35rem] xl:max-w-[41.66666667%] md:max-w-[60%] ">
      <div className="box my-4">
        <div className="box-body p-[3rem]">
          <div className="mb-4 flex justify-center">
               <Link href="/"> 
                    <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="desktop-logo"/> 
                    <img src="https://pixcel360.com/wp-content/uploads/2024/01/Backup_of_PIXEL360-LOGO-with-grey.png" alt="logo" className="desktop-white"/> 
                </Link> 
          </div>
          <p className="h5 mb-2 text-center">Sign Up</p>
          <p className="mb-4 text-textmuted dark:text-textmuted/50 opacity-70 font-normal text-center">Welcome! Begin by creating your account.</p>
         
          <div className="text-center my-3 authentication-barrier">
            <span>OR</span>
          </div>
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
              <label htmlFor="signup-password" className="form-label text-defaulttextcolor">Password <sup className="text-xs text-danger">*</sup>
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
                </div>
                <InputError message={errors.password} />
            </div>
            <div className="xl:col-span-12 col-span-12">
              <label htmlFor="signup-confirmpassword" className="form-label text-defaulttextcolor">Confirm Password <sup className="text-xs text-danger">*</sup>
              </label>
              <div className="relative">
              <ThemeTextInput 
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password_confirmation}
                autoComplete="current-password"
                isFocused={false}
                onChange={(e) => setData("password_confirmation", e.target.value) }
                placeholder="Confirm Password"
                className="form-control create-password-input" 
                /> 
                <a onClick={() => setShowPassword(!showPassword)} aria-label="anchor" href="#!"  className="show-password-button text-textmuted dark:text-textmuted/50"  id="button-addon21">
                {showPassword ? <EyeOff className='align-middle' /> : <Eye className='align-middle' />}
                </a>
              </div>
              <InputError message={errors.password_confirmation} />
              {/* <div className="form-check mt-3">
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                <label className="form-check-label text-textmuted dark:text-textmuted/50 font-normal text-[14px]" htmlFor="defaultCheck1"></label> By creating a account you agree to our 
                <a href="terms-conditions.html" className="text-success">
                  <u>Terms &amp; Conditions</u>
                </a>and <a className="text-success">
                  <u>Privacy Policy</u>
                </a>
              </div> */}
            </div>
          </div>
          <div className="grid mt-4">
            <button type="button" onClick={submit} disabled={processing} className="ti-btn bg-[linear-gradient(243deg,#ffcc00_0%,#ff9339_100%)] text-white">
              {processing && <Loader className="mr-2 h-4 w-4 animate-spin" />}{processing ? 'Loading...' : 'Create Account'}</button>
          </div>
          <div className="text-center">
            <p className="text-textmuted dark:text-textmuted/50 mt-3 mb-0">Already have an account? 
            <Link href="/login" className="text-primary"> Sign In</Link>
            </p>
          </div>
          
        </div>
        <p className="text-center p-2 text-danger">After submitting the registration form, you will be automatically logged in. An email with a link to set your password will be sent to your email address.</p>
      </div>
      
    </div>
  </div>
</div>
        </GuestLayout>
    );
}
