import { Link } from '@inertiajs/react';
import React from 'react';

// Define types for breadcrumb items
interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

// Props interface for the Breadcrumb component
interface BreadcrumbProps {
  items: BreadcrumbItem[];
  title?: string;
  actions?: React.ReactNode;
  separator?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items, 
  title, 
  actions,
  separator = '/'  
}) => {
  return (
    <div className="flex items-center justify-between page-header-breadcrumb flex-wrap gap-2">
    <div>
      <nav>
        <ol className="breadcrumb mb-0 flex items-center">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <li 
                className={`breadcrumb-item ${item.active ? 'active' : ''}`}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.href ? (
                  <Link href={item.href} className="hover:text-primary">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
              {index < items.length - 1 && (
                <li className="mx-2 text-gray-400 last:hidden">{separator}</li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
      {title && (
        <h1 className="page-title font-medium text-lg mb-0">
          {title}
        </h1>
      )}
    </div>
    {actions && (
      <div className="btn-list flex items-center space-x-2">
        {actions}
      </div>
    )}
  </div>
  );
};


export { Breadcrumb };