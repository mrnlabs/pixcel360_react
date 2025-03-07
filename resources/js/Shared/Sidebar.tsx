import React, { useState, useEffect, useRef } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { BellPlus, Calendar, CircleDollarSign, Home, IdCard, LogOut, Plus, SquareUserRound } from 'lucide-react';
import SidebarLogo from './SidebarLogo';

interface MenuState {
  [key: string]: boolean;
}

interface MenuItem {
  id: string;
  label: string;
  icon: JSX.Element;
  path: string;
  subItems?: SubItem[];
}

interface SubItem {
  label: string;
  icon: JSX.Element;
  path: string;
}

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  const { url } = usePage();

  // Check if exactly matches the current route
  const isExactActive = (path: string): boolean => {
    // Remove trailing slash for comparison
    const currentPath = url.endsWith('/') ? url.slice(0, -1) : url;
    const targetPath = path.endsWith('/') ? path.slice(0, -1) : path;
    return currentPath === targetPath;
  };

  // Check if we're in a section (for showing submenu)
  const isInSection = (parentPath: string): boolean => {
    return url.startsWith(parentPath);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = (): void => {
    if (isMobile) {
      setIsSidebarOpen(prev => !prev);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile]);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: (
        <Home className="h-6 w-6 mr-2 text-white" />
      )
    },
    {
      id: 'events',
      label: 'Events',
      path: '/events',
      icon: (<Calendar className="h-6 w-6 mr-2 text-white" />)
    },
    {
      id: 'subscriptions',
      label: 'Subscriptions',
      path: '/subscriptions',
      icon: (<BellPlus className="h-6 w-6 mr-2 text-white" />
      ),
    },

    {
      id: 'payment-methods',
      label: 'Payment Methods',
      path: '/payment-methods',
      icon: (<IdCard className="h-6 w-6 mr-2 text-white" />
      ),
      subItems: [
        {
          label: 'Add Payment Method',
          path: '/plans/create',
          icon: (<Plus className="h-5 w-5 mr-2" />)
        }
      ]
    },
    {
          id: 'plans',
          label: 'Plans',
          path: '/plans',
          icon: (<CircleDollarSign className="h-6 w-6 mr-2 text-white" />
          )
        },
     {
      id: 'profile',
      label: 'Profile',
      path: '/profile',
      icon: (<SquareUserRound className="h-6 w-6 mr-2 text-white" />
      )
    },
    {
      id: 'logout',
      label: 'Log Out',
      path: '/logout',
      icon: (<LogOut className="h-6 w-6 mr-2 text-white" />
      )
    }
  ];

  const renderMenuItem = (item: MenuItem) => {
    const showSubmenu = isInSection(item.path);
    
    if (!item.subItems) {
      return (
        <Link 
          key={item.id}
          href={item.path}
          className={`
            flex items-center px-4 py-2 text-gray-300 rounded-xs
            transition-all duration-200 ease-in-out
            ${isExactActive(item.path)
              ? ' bg-[linear-gradient(243deg,#FF4F84_0%,#394DFF_100%)] text-white font-medium'
              : 'hover:bg-gray-700/30'
            }
          `}
        >
          <span className={`
            flex items-center
            ${isExactActive(item.path) ? 'text-blue-400' : 'text-gray-400'}
          `}>
            {item.icon}
          </span>
          {item.label}
        </Link>
      );
    }

    return (
      <div key={item.id} className="relative">
        {/* Parent menu item */}
        <Link href={item.path} className={`
          flex items-center px-4 py-2 text-gray-300 rounded-xs
          transition-all duration-200 ease-in-out
          hover:bg-gray-700/30
          ${isExactActive(item.path)
            ? 'bg-gray-700/50 text-white font-medium'
            : 'hover:bg-gray-700/30'
          }
        `}>
          <span className="flex items-center text-gray-400">
            {item.icon}
          </span>
          {item.label}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`
              h-4 w-4 ml-auto transition-transform duration-200
              ${showSubmenu ? 'rotate-180' : ''}
              text-gray-400
            `}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
        
        {/* Submenu items */}
        {showSubmenu && item.subItems && (
          <div className="mt-1 space-y-1">
            {item.subItems.map((subItem, index) => (
              <Link 
                key={`${item.id}-${index}`}
                href={subItem.path}
                className={`
                  flex items-center pl-10 pr-4 py-2 text-sm text-gray-300 rounded-xs
                  transition-all duration-200 ease-in-out
                  ${isExactActive(subItem.path)
                    ? 'bg-gray-700/50 text-white font-medium'
                    : 'hover:bg-gray-700/30'
                  }
                `}
              >
                <span className={`
                  flex items-center
                  ${isExactActive(subItem.path) ? 'text-blue-400' : 'text-gray-400'}
                `}>
                  {subItem.icon}
                </span>
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="app-sidebar" id="sidebar">
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <div className="fixed top-0 left-0 z-20 md:hidden">
        <button 
          onClick={toggleSidebar}
          className="p-4 text-gray-500 focus:outline-none focus:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`
          fixed inset-y-0 left-0 z-30 transform 
          ${isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
          transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 
          flex flex-col w-64 bg-[#181B2F]
        `}
      >
        <SidebarLogo />
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 p-2 space-y-1 bg-gray-800">
            {menuItems.map(renderMenuItem)}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="h-16 bg-white border-b border-gray-200" />
      </div>
    </div>
  </aside>
  );
};

export default Sidebar;