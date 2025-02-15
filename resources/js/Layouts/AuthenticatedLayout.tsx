
import Footer from '@/Shared/Footer';
import Header from '@/Shared/Header';
import { PropsWithChildren, ReactNode} from 'react';
import AdminSidebar from '@/Shared/AdminSidebar';
import { AuthGuard } from '@/guards/authGuard';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    return (
       <div className="page">              
        <Header/>
        <AuthGuard 
          roles={["Account Owner"]} 
          permissions={["*"]}
          requireAll={true}>
          <AdminSidebar/>
      </AuthGuard>

        
        {children}
        <Footer/>
      </div>
    );
}
