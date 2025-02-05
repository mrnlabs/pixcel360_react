import React, { useEffect } from 'react'
import ProfileImage from './ProfileImage'
import { Input } from '@/Components/ui/input'
import CountrySelector from './CountrySelector'
import { useForm } from '@inertiajs/react'
import { useToast } from '@/hooks/use-toast'
import InputError from '@/Components/InputError'
import { Toaster } from '@/Components/ui/toaster'


export default function AccountSettings({user} : any) {
  const { toast } = useToast();

  useEffect(() => {
    setData('country', user.country)
    setData('firstname', user.firstname)
    setData('lastname', user.lastname)
    setData('display_name', user.display_name)
    setData('phone', user.phone)
    setData('address', user.address)
    setData('address2', user.address2)
    setData('city', user.city)
    setData('province', user.province)
    setData('post_code', user.post_code)
    setData('company_name', user.company_name)
    setData('email', user.email)
  }, [user])

  const { data, setData, post, processing, errors, reset } = useForm({
    firstname: "",
    lastname: "",
    display_name: "",
    phone: "",
    address: "",
    address2: "",
    country: "",
    city: "",
    province: "",
    post_code: "",
    company_name: "",
    email: "",
});

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  post(route('profile.update'),{
    preserveScroll: true,
    onSuccess: () => {
      reset();
      toast({
        title: "Success",
        description: "Profile updated successfully",
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
    <div className="tab-pane show active overflow-hidden p-0 border-0" id="account-pane" role="tabpanel">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-1">
            <div className="font-semibold block text-[15px]">Account Settings :</div>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-12 sm:gap-x-6 gap-y-3">
              <ProfileImage/>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="firstname" className="form-label">First Name :</label>
              <Input value={data.firstname ?? ''} 
              onChange={(e) => setData('firstname', e.target.value)} 
              type="text" className="form-control" id="firstname" placeholder="Enter First Name"/>
              <InputError message={errors.firstname} />
          </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="lastname" className="form-label">Last Name :</label>
              <Input 
              value={data.lastname ?? ''}
              onChange={(e) => setData('lastname', e.target.value)}
               type="text" className="form-control" id="lastname"  placeholder="Enter Last Name"/>
              <InputError message={errors.lastname} />
            </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="profile-email" className="form-label">Email :</label>
              <Input 
              value={data.email ?? ''}
              onChange={(e) => setData('email', e.target.value)}
              type="email" className="form-control" id="profile-email"  placeholder="Enter Email"/>
              <InputError message={errors.email} />
            </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="display_name" className="form-label">Display Name :</label>
              <Input 
              value={data.display_name ?? ''}
              onChange={(e) => setData('display_name', e.target.value)}
              type="text" className="form-control" id="display_name"  placeholder="Enter Display Name"/>
              <InputError message={errors.display_name} />
            </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="profile-phn-no" className="form-label">Phone No :</label>
              <Input 
              value={data.phone ?? ''}
              onChange={(e) => setData('phone', e.target.value)}
              type="text" className="form-control" id="profile-phn-no"  placeholder="Enter Number" />
              <InputError message={errors.phone} />
            </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="addreess" className="form-label">Address 1 :</label>
              <Input 
              value={data.address ?? ''}
              onChange={(e) => setData('address', e.target.value)}
              type="text" className="form-control" id="addreess"  placeholder="Enter Address"/>
              <InputError message={errors.address} />
            </div>
           
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="address2" className="form-label">Address 2 :</label>
              <Input 
              value={data.address2 ?? ''}
              onChange={(e) => setData('address2', e.target.value)}
              type="text" className="form-control" id="address2" placeholder="Enter Address"  />
              <InputError message={errors.address2} />
            </div>
            <div className="xl:col-span-6 col-span-12">
              <label htmlFor="country" className="form-label">Country :</label>
              <CountrySelector 
                value={data.country ?? ''} 
                setData={setData} 
              />
              <InputError message={errors.country} />
            </div>
            <div className="xl:col-span-4 col-span-12">
              <label htmlFor="city" className="form-label">City :</label>
              <Input 
              value={data.city ?? ''}
              onChange={(e) => setData('city', e.target.value)}
              type="text" className="form-control" id="city" placeholder="Enter Your City"  />
              <InputError message={errors.city} />
            </div>
            <div className="xl:col-span-4 col-span-12">
              <label htmlFor="province" className="form-label">Province :</label>
              <Input 
              value={data.province ?? ''}
              onChange={(e) => setData('province', e.target.value)}
              type="text" className="form-control" id="province" placeholder="Enter Your Province"  />
              <InputError message={errors.province} />
            </div>
            <div className="xl:col-span-4 col-span-12">
              <label htmlFor="postalCode" className="form-label">Postal Code :</label>
              <Input 
              value={data.post_code ?? ''}
              onChange={(e) => setData('post_code', e.target.value)}
              type="text" className="form-control" id="postalCode" placeholder="Enter Your Postal Code"  />
              <InputError message={errors.post_code} />
            </div>
            <button disabled={processing} type="submit" className="ti-btn ti-btn-primary">{ processing ? 'Saving...' : 'Save'}</button>
          </form>
          <Toaster />
        </div>
  )
}
