import { PlanCardProps } from '@/types'
import { Facebook, Instagram, X, Youtube } from 'lucide-react'
import React from 'react'

export default function WordpressFooter({plans=[]}: PlanCardProps) {
  return (
    
<footer className="bg-[#0e1123] text-white py-10">
    <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-4 md:grid-cols-3 gap-8">
            
            <div>
                <img src="https://pixcel360.com/wp-content/uploads/2023/11/PIXEL360-LOGO.png" alt="Pixcel360 Logo" className="w-32 mb-4"/>
            </div>

            
            <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Useful links</h3>
                <ul className="space-y-5">
                    <li><a href="https://pixcel360.com" className="hover:text-gray-400">Home</a></li>
                    <li><a href="https://pixcel360.com/features/" className="hover:text-gray-400">Features</a></li>
                    <li><a href="https://pixcel360.com/pricing" className="hover:text-gray-400">Pricing</a></li>
                    <li><a href="https://pixcel360.com/support" className="hover:text-gray-400">Support</a></li>
                    <li><a href="https://pixcel360.com/contact" className="hover:text-gray-400">Contact</a></li>
                </ul>
            </div>

            
            <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Subscription Plans</h3>
                <ul className="space-y-5">
                    {plans.map((plan) => (
                        <li key={plan.id}>
                            <a href={route('plans.show',plan.slug) + '?wordpress=true'} className="hover:text-gray-400">
                                {plan.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            
            <div>
                <h3 className="text-lg font-semibold text-white mb-3">Get in touch</h3>
                <div className="flex space-x-4">
                    <a href="#" className="bg-red-500 p-2 rounded-full"><Facebook /></a>
                    <a href="#" className="bg-red-500 p-2 rounded-full"><X /></a>
                    <a href="#" className="bg-red-500 p-2 rounded-full"><Instagram /></a>
                    <a href="#" className="bg-red-500 p-2 rounded-full"><Youtube /></a>
                </div>
            </div>
        </div>

        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex space-x-6 mb-3 md:mb-0">
                    <a href="#" className="hover:text-gray-400">Privacy & Policy</a>
                    <a href="#" className="hover:text-gray-400">Terms & Conditions</a>
                </div>
                <p>Copyright pixcel360 © {new Date().getFullYear()}. All rights reserved. Developed by <a href="https://mrnlabs.com/" target='_blank' className="font-semibold">MRNLABS</a></p>
            </div>
        </div>
    </div>
</footer>

  )
}
