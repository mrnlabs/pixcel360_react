import { ReactNode } from "react";

interface MetricsCardProps {
    icon: ReactNode;
    label: string;
    value: string | number;
    percentageChange?: string | number;
    isPositive?: boolean;
  }
  
  const MetricsCard: React.FC<MetricsCardProps> = ({ 
    icon, 
    label, 
    value, 
    percentageChange, 
    isPositive = true 
  }) => {
    return (


<div className="box crm-card">
  <div className="box-body">
    <div className="">
      <div className="flex justify-between mb-2">
        <div className="p-2 border border-primary/10 bg-primary/10 rounded-full">
          <span className="avatar avatar-md avatar-rounded bg-primary svg-white mb-0">
          {icon}
          </span>
        </div>
      </div>
      <p className="flex-auto text-textmuted dark:text-textmuted/50 text-[14px] mb-0">{label}</p>
    </div>
    <div className="flex items-center justify-between mt-1">
      <h4 className="mb-0 flex items-center">{value}</h4>
      <span className="text-success badge bg-success/10 rounded-full flex items-center text-[11px] me-0 ms-2 mb-0">
        <i className="ri-arrow-left-up-line text-[11px]"></i>+2.5% </span>
    </div>
  </div>
</div>

    );
  };

  export default MetricsCard;