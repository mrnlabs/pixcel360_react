import React, { useState } from 'react';
import { Check } from "lucide-react";
import { Input } from '@/Components/ui/input';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    'Event Details',
    'Select Service',
    'Appointment Details',
    'Payment',
    'Confirmation'
  ];

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="p-6">
      {/* Stepper */}
      <div className="relative mb-12">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
        
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 
                ${index === currentStep ? 'bg-blue-600 text-white' :
                  index < currentStep ? 'bg-blue-600 text-white' : 'bg-white border-2 border-gray-300 text-gray-300'
                }`}>
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className={`mt-2 text-sm ${
                index === currentStep ? 'text-blue-600 font-medium' :
                index < currentStep ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl mb-6">Event Details :</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Name of the event</label>
              <Input
                type="text"
                placeholder="Name of the event"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Set the start time of the event</label>
              <Input
                type="datetime-local"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Date of Birth</label>
              <Input
                type="date"
                placeholder="Select DOB"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Country</label>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>United States</option>
                {/* Add more countries */}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Last Name</label>
              <Input
                type="text"
                placeholder="Enter Last Name"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Set the end time of the event</label>
              <Input
                type="datetime-local"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Select Gender</label>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Select City</label>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option>India</option>
                {/* Add more cities */}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`ti-btn ti-btn-primary
              ${currentStep === 0 
                ? 'ti-btn ti-btn-primary cursor-not-allowed' 
                : 'ti-btn ti-btn-primary'
              }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="ti-btn ti-btn-success"
          >
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;