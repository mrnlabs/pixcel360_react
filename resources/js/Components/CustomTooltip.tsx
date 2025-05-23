import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Components/ui/tooltip"

interface CustomTooltipProps {
  children: React.ReactNode;  // The element to trigger the tooltip
  content: React.ReactNode;   // The tooltip content
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ children, content }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={3}>
        <TooltipTrigger>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;