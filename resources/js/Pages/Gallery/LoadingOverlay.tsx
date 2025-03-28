import { Loader } from "lucide-react";

export const LoadingOverlay = ({ show }: { show: boolean }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
          <Loader size={24} className="mb-2" />
          <p className="font-medium">Downloading videos...</p>
          <p className="text-sm text-gray-500">Please don't close this page</p>
        </div>
      </div>
    );
  };