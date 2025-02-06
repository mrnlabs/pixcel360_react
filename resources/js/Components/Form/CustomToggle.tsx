import React, { useState } from 'react';

const CustomToggle = ({ label, initialValue = false, onChange }:
    {
      label: string;
      initialValue?: boolean;
      onChange?: (value: boolean) => void;
    }
) => {
  const [isOn, setIsOn] = useState(initialValue);

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
        className={`toggle ${isOn ? 'on' : 'off'} mb-4 cursor-pointer`}
        onClick={handleToggle}
        role="switch"
        aria-checked={isOn}
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleToggle();
          }
        }}
      >
        <span></span>
      </div>
    </div>
  );
};

export default CustomToggle;