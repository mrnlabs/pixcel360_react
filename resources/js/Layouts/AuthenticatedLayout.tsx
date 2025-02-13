
import Footer from '@/Shared/Footer';
import Header from '@/Shared/Header';
import Sidebar from '@/Shared/Sidebar';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    return (
       <div className="page">              
        <Header/>
        <Sidebar/>
        {children}
        <Footer/>
      </div>
    );
}
