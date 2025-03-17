import React from 'react'

export default function WordpressHeader() {
  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
         {/* Logo */}
        <div className="flex-shrink-0">
            <a href="#" className="block">
                <img src="https://pixcel360.com/wp-content/uploads/2023/11/PIXEL360-LOGO.png" alt="Pixcel360" className="h-12 w-auto"/>
            </a>
        </div>
        
         {/* Main Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
            <a href="https://pixcel360.com" className="text-gray-900 hover:text-[#F2295B] font-medium">Home</a>
            <a href="https://pixcel360.com/360-photo-booth-software-features-pixcel360/" className="text-gray-900 hover:text-[#F2295B] font-medium">Features</a>
            <a href="https://pixcel360.com/pricing-subscriptions-360-photo-booth-app/" className="text-gray-900 hover:text-[#F2295B] font-medium">Pricing</a>
            <a href="https://pixcel360.com/support-help-pixcel360-app/" className="text-gray-900 hover:text-[#F2295B] font-medium">Support</a>
            <a href="https://pixcel360.com/contact/" className="text-gray-900 hover:text-[#F2295B] font-medium">Contact</a>
        </nav>
     
         {/* Right Side - Search and Mobile Menu 
        <div className="flex items-center">
       
            <button className="p-2 text-gray-700 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
            
  
            <button className="ml-4 p-2 border border-gray-300 rounded md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
        */}
    </div>
</header>
  )
}
