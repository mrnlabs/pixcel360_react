import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Footer from '@/Shared/Footer';
import Header from '@/Shared/Header';
import Sidebar from '@/Shared/Sidebar';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const jsPath = usePage().props.main_js_path;
    console.log(jsPath);
    // useEffect(() => {
    //     // Load config.js
    //     const configScript = document.createElement('script');
    //     // @ts-ignore
    //     configScript.src = jsPath;
    //     configScript.async = true;
    //     document.body.appendChild(configScript);
        
    //     return () => {
    //         document.body.removeChild(configScript);
    //     };
    // }, []);

    return (
       <div className="page">              
        <Header/>
        <Sidebar/>
        {children}
        <Footer/>
      </div>
    );
}
