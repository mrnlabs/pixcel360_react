
import Footer from '@/Shared/Footer';
import Header from '@/Shared/Header';
import { PropsWithChildren, ReactNode} from 'react';
import AdminSidebar from '@/Shared/AdminSidebar';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    return (
       <div className="page">              
        <Header/>
        <AdminSidebar/>
        {children}
        <Footer/>
      </div>
    );
}
