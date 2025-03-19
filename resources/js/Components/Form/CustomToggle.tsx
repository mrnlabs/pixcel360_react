import React, { useState } from 'react';

const CustomToggle = ({ label, initialValue = 0, onChange }:
    {
      label: string;
      initialValue?: number;  // Changed to number type
      onChange?: (value: boolean) => void;
    }
) => {
  // Convert numeric 1/0 to boolean true/false
  const [isOn, setIsOn] = useState(initialValue === 1);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <div 
        className={`toggle ${isOn ? 'on toggle-success' : 'off'} mb-4 cursor-pointer `}
        onClick={handleToggle}
        role="switch"
        aria-checked={isOn}
        tabIndex={0}
      >
        <span></span>
      </div>
    </div>
  );
};

export default CustomToggle;