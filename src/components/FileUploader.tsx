import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, FileText, Music, Video } from "lucide-react";
import { toast } from "sonner";
import { isValidFile } from "@/lib/fileUtils";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  onFileSelect: (file: File, fileType: string) => void;
}

export const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const { isValid, fileType } = isValidFile(file);
    if (!isValid) {
      toast.error("Format de fichier non supporté");
      return;
    }

    onFileSelect(file, fileType!);
    toast.success("Fichier téléversé avec succès !");
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'audio/*': ['.mp3', '.wav', '.ogg'],
      'video/*': ['.mp4', '.avi', '.mov']
    },
    multiple: false
  });

  const getIcon = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <div className="p-3 rounded-full bg-primary/10">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xs mt-1">Documents</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-3 rounded-full bg-primary/10">
            <File className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xs mt-1">Images</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-3 rounded-full bg-primary/10">
            <Music className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xs mt-1">Audio</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-3 rounded-full bg-primary/10">
            <Video className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xs mt-1">Vidéo</span>
        </div>
      </div>
    );
  };

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
          <h3 className="text-lg font-semibold">Glissez-déposez votre fichier ici</h3>
          <p className="text-sm text-gray-500 mt-1">ou cliquez pour parcourir</p>
        </div>
        <div className="w-full max-w-xs">
          {getIcon()}
        </div>
        <div className="text-sm text-gray-500">
          Formats supportés : PDF, DOCX, TXT, PNG, JPG, WEBP, MP3, WAV, OGG, MP4, AVI, MOV
        </div>
      </div>
    </div>
  );
};