
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { router, usePage } from '@inertiajs/react'
import { CreditCard, Keyboard, Settings, User } from 'lucide-react'
import React, { useState } from 'react'

export default function HeaderProfile() {
  const filePath = usePage().props.filePath;
  const user = usePage().props.auth.user;
  const [preview, setPreview] = useState(user?.photo ? filePath+user?.photo : 'profile_placeholder.jpg');
    const goToProfile = () => {
        router.get('/profile')
    }
  return (

    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <div aria-label="anchor" className="cursor-pointer header-link hs-dropdown-toggle ti-dropdown-toggle" id="mainHeaderProfile" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
       <div className="flex items-center">
         <div>
           <img src={preview} alt="img" className="avatar avatar-sm mb-0"/>
         </div>
       </div>
     </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 mt-4">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={goToProfile} className='cursor-pointer'>
          <User />
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer'>
          <Settings />
          <span>Logout</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
   
    
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
