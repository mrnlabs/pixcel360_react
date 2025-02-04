import { Button } from '@/Components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { router } from '@inertiajs/react'
import { CreditCard, Keyboard, Settings, User } from 'lucide-react'
import React from 'react'

export default function HeaderProfile() {

    const goToProfile = () => {
        router.get('/profile')
    }
  return (

    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <div aria-label="anchor" className="cursor-pointer header-link hs-dropdown-toggle ti-dropdown-toggle" id="mainHeaderProfile" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
       <div className="flex items-center">
         <div>
           <img src="../assets/images/faces/15.jpg" alt="img" className="avatar avatar-sm mb-0"/>
         </div>
       </div>
     </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
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
