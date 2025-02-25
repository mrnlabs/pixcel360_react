import { Link } from "@inertiajs/react";
import { MoveDownRight, MoveUpLeft } from "lucide-react";
import { ReactNode } from "react";

interface MetricsCardProps {
    icon: ReactNode;
    label: string;
    value: string | number;
    percentageChange?: string | number;
    isPositive?: boolean;
    iconBgColor: string;
    route: string;
  }
  
  const MetricsCard: React.FC<MetricsCardProps> = ({ 
    icon, 
    label,
    route, 
    value,
    iconBgColor,
    percentageChange, 
    isPositive = true 
  }) => {
    return (

<Link href={route} className=""> 
<div className="box crm-card">
  <div className="box-body">
    <div className="">
      <div className="flex justify-between mb-2">
        <div className="p-2 border border-primary/10 bg-primary/10 rounded-full">
          <span className={`avatar avatar-md avatar-rounded ${iconBgColor}  svg-white mb-0`}>
          {icon}
          </span>
        </div>
      </div>
      <p className="flex-auto text-textmuted dark:text-textmuted/50 text-[14px] mb-0">{label}</p>
    </div>
    <div className="flex items-center justify-between mt-1">
          <h4 className="mb-0 flex items-center">{value}</h4>
          {percentageChange !== undefined && (
            <span className={`text-${isPositive ? 'success' : 'danger'} badge bg-${isPositive ? 'success' : 'danger'}/10 rounded-full flex items-center text-[11px] me-0 ms-2 mb-0`}>
              {isPositive ? <MoveUpLeft size={12} className="-line text-[11px]" /> : <MoveDownRight className="-line text-[11px]"/>}
              {isPositive ? '+' : ''}{percentageChange}%
            </span>
          )}
        </div>
  </div>
</div>
</Link>

    );
  };

  export default MetricsCard;