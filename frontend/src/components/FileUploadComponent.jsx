import { useState, useRef } from 'react';
import { Upload, FileUp, X, RotateCcw, AlertCircle } from 'lucide-react';

export default function FileUploadComponent({ onFileUpload }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files?.[0];
    processFile(selectedFile);
  };

  const processFile = (selectedFile) => {
    if (selectedFile && selectedFile.name.endsWith('.json')) {
      setFile(selectedFile);
      setUploadStatus('success');
      
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
    processFile(droppedFile);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  const handleDeleteFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setUploadStatus(null);
    if (onFileUpload) {
      onFileUpload(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleReloadFile = (e) => {
    e.stopPropagation();
    triggerFileInput();
  };

  return (
    <div className="bg-[#181818] border border-neutral-800 rounded-xl p-3">
      <input
        type="file"
        ref={fileInputRef}
        accept=".json"
        onChange={handleFileUpload}
        className="hidden"
      />
      
      {file ? (
        <div className="flex items-center justify-between gap-3 bg-black p-2.5 rounded-lg border border-neutral-800">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <FileUp size={18} className="text-primary shrink-0" />
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{file.name}</p>
              <p className="text-[10px] text-neutral-400">{(file.size / 1024).toFixed(1)} KB • JSON Track</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button 
              onClick={handleReloadFile}
              className="p-1.5 rounded-md bg-[#222222] hover:bg-[#333333] text-neutral-300 hover:text-white transition-colors"
              title="Replace file"
            >
              <RotateCcw size={13} />
            </button>
            <button 
              onClick={handleDeleteFile}
              className="p-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
              title="Remove file"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          className={`flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg border border-dashed cursor-pointer transition-colors ${
            isDragging 
              ? 'border-primary bg-primary/10' 
              : 'border-neutral-700 bg-black/60 hover:bg-[#202020] hover:border-primary/60'
          }`}
        >
          <Upload size={16} className="text-primary shrink-0" />
          <span className="text-xs text-neutral-400">
            Import custom JSON track sequence <span className="text-primary font-bold hover:underline">(Click or drag)</span>
          </span>
        </div>
      )}

      {uploadStatus === 'error' && (
        <div className="mt-2 flex items-center text-red-400 text-xs gap-1.5">
          <AlertCircle size={14} />
          <span>Invalid file format. Please upload a valid .json note recording.</span>
        </div>
      )}
    </div>
  );
}
