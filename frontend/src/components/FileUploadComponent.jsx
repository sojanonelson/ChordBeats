import { useState, useRef } from 'react';
import { Upload, FileUp, X, RotateCcw, Check, AlertCircle } from 'lucide-react';

export default function FileUploadComponent({ onFileUpload }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', or null
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith('.json')) {
      setFile(selectedFile);
      setUploadStatus('success');
      
      // Pass the file to parent component if needed
      if (onFileUpload) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target.result;
            const parsedContent = JSON.parse(content);
            onFileUpload(parsedContent);
          } catch (error) {
            console.error('Error parsing JSON:', error);
            setUploadStatus('error');
          }
        };
        reader.readAsText(selectedFile);
      }
    } else if (selectedFile) {
      setUploadStatus('error');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.json')) {
      setFile(droppedFile);
      setUploadStatus('success');
      
      // Pass the file to parent component if needed
      if (onFileUpload) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target.result;
            const parsedContent = JSON.parse(content);
            onFileUpload(parsedContent);
          } catch (error) {
            console.error('Error parsing JSON:', error);
            setUploadStatus('error');
          }
        };
        reader.readAsText(droppedFile);
      }
    } else if (droppedFile) {
      setUploadStatus('error');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  const handleDeleteFile = (e) => {
    e.stopPropagation(); // Prevent triggering the parent click event
    setFile(null);
    setUploadStatus(null);
    if (onFileUpload) {
      onFileUpload(null);
    }
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleReloadFile = (e) => {
    e.stopPropagation(); // Prevent triggering the parent click event
    triggerFileInput();
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-gray-100 font-medium">Upload Recording</h3>
        {uploadStatus === 'success' && (
          <div className="flex items-center text-green-400 text-sm">
            <Check size={16} className="mr-1" />
            <span>File loaded</span>
          </div>
        )}
      </div>
      
      <div
        className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging ? 'border-blue-500 bg-gray-700' : 'border-gray-600 bg-gray-750 hover:bg-gray-700'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={file ? null : triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept=".json"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center space-y-2">
          {file ? (
            <>
              <FileUp size={28} className="text-blue-400" />
              <p className="text-sm text-gray-300 font-medium">{file.name}</p>
              <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
              
              <div className="flex items-center mt-4 space-x-3">
                <button 
                  onClick={handleDeleteFile}
                  className="flex items-center bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-xs transition-colors"
                >
                  <X size={14} className="mr-1" />
                  Remove
                </button>
                
                <button 
                  onClick={handleReloadFile}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-xs transition-colors"
                >
                  <RotateCcw size={14} className="mr-1" />
                  Replace
                </button>
              </div>
            </>
          ) : (
            <>
              <Upload size={28} className="text-gray-400" />
              <p className="text-sm text-gray-300">Drag & drop your JSON file here</p>
              <p className="text-xs text-gray-400">Or click to browse files</p>
            </>
          )}
        </div>
      </div>
      
      {uploadStatus === 'error' && (
        <div className="mt-2 flex items-center text-red-400 text-sm">
          <AlertCircle size={16} className="mr-1" />
          <span>Please select a valid JSON file</span>
        </div>
      )}
    </div>
  );
}