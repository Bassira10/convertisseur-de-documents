import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File } from "lucide-react";
import { toast } from "sonner";
import { isImageFile } from "@/lib/fileUtils";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!isImageFile(file)) {
      toast.error("Please upload an image file");
      return;
    }

    onFileSelect(file);
    toast.success("File uploaded successfully!");
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative w-full max-w-2xl mx-auto mt-8 p-12 rounded-lg border-2 border-dashed
        transition-all duration-200 ease-in-out cursor-pointer
        ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary"}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="p-4 rounded-full bg-primary/10">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Drag & Drop your file here</h3>
          <p className="text-sm text-gray-500 mt-1">or click to browse</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <File className="w-4 h-4" />
          <span>Supported formats: PNG, JPG, WEBP</span>
        </div>
      </div>
    </div>
  );
};