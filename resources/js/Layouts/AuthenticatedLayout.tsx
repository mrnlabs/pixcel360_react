
import Footer from '@/Shared/Footer';
import Header from '@/Shared/Header';
import { PropsWithChildren, ReactNode} from 'react';
import AdminSidebar from '@/Shared/AdminSidebar';
import { AuthGuard } from '@/guards/authGuard';
import Sidebar from '@/Shared/Sidebar';
import { Toaster } from 'react-hot-toast';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    return (
       <div className="page">              
        <Header/>
        <AuthGuard 
          roles={["System Admin", "System SuperAdmin"]} 
          permissions={["*"]}
          requireAll={true}>
          <AdminSidebar/>
      </AuthGuard>
      
      <AuthGuard 
          roles={["Account Owner"]} 
          permissions={["*"]}
          requireAll={true}>
          <Sidebar/>
      </AuthGuard>

        
        {children}
        <Footer/>
        <Toaster 
         toastOptions={{
          success: {
            style: {
              background: 'green',
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: 'black',
            },
          },
          error: {
            style: {
              background: 'red',
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: 'black',
            },
          },
        }}
        />
      </div>
    );
}
