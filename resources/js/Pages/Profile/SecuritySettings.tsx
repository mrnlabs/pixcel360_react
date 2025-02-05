import ThemeTextInput from '@/Components/Form/ThemeTextInput';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Toaster } from '@/Components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import {  useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import React, { FormEventHandler, useState } from 'react'

export default function SecuritySettings() {
      const { toast } = useToast();
      const [showPassword, setShowPassword] = useState(false);
      const { data, setData, patch, processing, errors, reset, isDirty } = useForm({
          password: "",
          password_confirmation: "",
          logoutOtherDevices: false as boolean,
      });
      const submit: FormEventHandler = (e) => {
          e.preventDefault();
          patch(route("password.update"), {
              onSuccess: () => {
                reset("password")
                toast({
                  title: "Success",
                  description: "Password updated successfully",
                  variant: "default",
              })
              },
              onError: () => {
                toast({
                  title: "Error",
                  description: "Something went wrong",
                  variant: "destructive",
              })
              }
          });
      };
  return (
    <div className="tab-pane show overflow-hidden p-0 border-0 " id="notification-tab-pane" role="tabpanel">
         <div className="grid grid-cols-12 justify-center authentication authentication-basic h-full ml-1">
      <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-6 md:col-span-6 sm:col-span-8 col-span-12 ">
      <div className="font-semibold block text-[15px]">Change Password:</div>
         <div className="my-4">
            <div className="box-body">  
               <div className="grid grid-cols-12 gap-y-3">
                
                  <div className="xl:col-span-12 col-span-12"> 
                    <label htmlFor="new-password" className="form-label text-defaulttextcolor">New Password<sup className="text-xs text-danger">*</sup>
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
                        placeholder="New Password"
                        className="form-control create-password-input" 
                        /> 
                        <a onClick={() => setShowPassword(!showPassword)} aria-label="anchor" href="#!" 
                        className="show-password-button text-textmuted dark:text-textmuted/50" 
                         id="button-addon2">
                            {showPassword ? <EyeOff className='align-middle' /> : <Eye className='align-middle' />}
                         </a>
                         <InputError message={errors.password} className="mt-1" />
                         </div> 
                  </div>
                  <div className="xl:col-span-12 col-span-12 mb-2">
                     <label htmlFor="password_confirmation" className="form-label text-defaulttextcolor block">Password<sup className="text-xs text-danger">*</sup>
                     </label> 
                     <div className="relative"> 
                        <ThemeTextInput 
                        id="password_confirmation"
                        type={showPassword ? "text" : "password"}
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="current-password"
                        isFocused={false}
                        onChange={(e) => setData("password_confirmation", e.target.value) }
                        placeholder="Confirm Password"
                        className="form-control create-password-input" 
                        /> 
                        <a onClick={() => setShowPassword(!showPassword)} aria-label="anchor" href="#!" 
                        className="show-password-button text-textmuted dark:text-textmuted/50" 
                         id="button-addon2">
                            {showPassword ? <EyeOff className='align-middle' /> : <Eye className='align-middle' />}
                         </a>
                         <InputError message={errors.password_confirmation} className="mt-1" />
                         </div>
                     <div className="mt-2">
                        <div className="form-check"> 
                            <input 
                                name="logout"
                                checked={data.logoutOtherDevices}
                                onChange={(e) => setData("logoutOtherDevices",e.target.checked)
                                }
                            className="form-check-input" type="checkbox" value="" id="logoutOtherDevices" /> 
                            <label className="form-check-label text-red-500 dark:text-textmuted/50 font-normal" htmlFor="logoutOtherDevices"> Logout Other Devices ? </label> 
                            </div>
                     </div>
                  </div>
               </div>
               <div className="grid mt-4"> 
                <Button type="button" onClick={submit} 
                  disabled={processing} className="cursor-pointer ti-btn ti-btn-primary">{processing ? "Saving..." : "Save"}</Button> 
                </div>
            </div>
         </div>
      </div>
      <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-3 md:col-span-3 sm:col-span-2 col-span-12"></div>
   </div>
    <Toaster />
     </div>
  )
}
