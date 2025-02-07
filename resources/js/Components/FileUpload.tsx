import React, { useState, useRef, useCallback } from 'react';
import { Plus, File, X, Image as ImageIcon, Music } from 'lucide-react';

interface FileWithPreview extends File {
  preview?: string;
}

export interface FileUploadProps {
  // Core props
  onFilesSelected: (files: File[]) => void;
  onFileRemove?: (file: File) => void;
  
  // Configuration props
  multiple?: boolean;
  acceptedTypes?: string[];
  maxSize?: number; // in bytes
  maxFiles?: number;
  
  // UI customization
  showPreview?: boolean;
  className?: string;
  dropzoneText?: string;
  errorMessages?: {
    maxSize?: string;
    maxFiles?: string;
    fileType?: string;
  };
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  onFileRemove,
  multiple = false,
  acceptedTypes = ['*/*'],
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 10,
  showPreview = true,
  className = '',
  dropzoneText = 'Click or drag files to upload',
  errorMessages = {
    maxSize: 'File size exceeds limit',
    maxFiles: 'Maximum number of files reached',
    fileType: 'File type not accepted'
  }
}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return errorMessages.maxSize || `File size should be less than ${maxSize / (1024 * 1024)}MB`;
    }

    // if (acceptedTypes[0] !== '*/*' && !acceptedTypes.includes(file.type)) {
    //   return errorMessages.fileType || 'File type not accepted';
    // }

    return null;
  }, [maxSize, acceptedTypes, errorMessages]);

  const processFiles = useCallback(async (files: FileList | File[]) => {
    setError(null);
    const fileArray = Array.from(files);
    
    if (!multiple && fileArray.length > 1) {
      fileArray.splice(1);
    }

    if (maxFiles && selectedFiles.length + fileArray.length > maxFiles) {
        // @ts-expect-error
      setError(errorMessages.maxFiles);
      return;
    }

    const validFiles: FileWithPreview[] = [];
    const processFile = async (file: File) => {
      const error = validateFile(file);
      if (error) {
        setError(error);
        return;
      }

      if (showPreview && file.type.startsWith('image/')) {
        const preview = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        validFiles.push(Object.assign(file, { preview }));
      } else {
        validFiles.push(file);
      }
    };

    await Promise.all(fileArray.map(processFile));

    if (validFiles.length > 0) {
      const newFiles = multiple 
        ? [...selectedFiles, ...validFiles]
        : validFiles;
      
      setSelectedFiles(newFiles);
      onFilesSelected(newFiles);
    }
  }, [multiple, maxFiles, selectedFiles, validateFile, showPreview, onFilesSelected, errorMessages.maxFiles]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    processFiles([])
    if (event.target.files) {
      processFiles(event.target.files);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    processFiles(event.dataTransfer.files);
  }, [processFiles]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleRemove = (file: FileWithPreview) => {
    const newFiles = selectedFiles.filter(f => f !== file);
    setSelectedFiles(newFiles);
    onFileRemove?.(file);
    onFilesSelected(newFiles);
  };

  const renderPreview = (file: FileWithPreview) => {
    if (!showPreview) return null;

    if (file.type.startsWith('image/') && file.preview) {
      return (
        <img
          src={file.preview}
          alt={file.name}
          className="w-16 h-16 object-cover rounded"
        />
      );
    }

    return <File className="w-8 h-8 text-gray-400" />;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-lg p-8 cursor-pointer transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
        `}
      >
        <div className="flex flex-col items-center justify-center min-h-[10rem] text-gray-500">
          {multiple ? <Plus className="w-12 h-12 mb-4" /> : <Music className="w-12 h-12 mb-4" />}
          <p className="text-sm text-center">{dropzoneText}</p>
          <p className="text-xs mt-2 text-gray-400">
            {acceptedTypes[0] === '*/*' 
              ? 'All file types accepted' 
              : `Accepted types: ${acceptedTypes.join(', ')}`}
          </p>
          {maxSize && (
            <p className="text-xs mt-1 text-gray-400">
              Max size: {maxSize / (1024 * 1024)}MB
            </p>
          )}
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileChange}
        multiple={multiple}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;