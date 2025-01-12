import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { isValidFile } from "@/lib/fileUtils";
import { Card } from "@/components/ui/card";

interface FileUploaderProps {
  onFileSelect: (file: File, fileType: string) => void;
  selectedFile: File | null;
}

export const FileUploader = ({ onFileSelect, selectedFile }: FileUploaderProps) => {
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

  return (
    <Card
      {...getRootProps()}
      className={`
        relative w-full max-w-2xl mx-auto p-12 border-2 border-dashed
        transition-all duration-200 ease-in-out cursor-pointer
        ${isDragActive ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary"}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="p-4 rounded-full bg-primary/10">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">
            {selectedFile ? selectedFile.name : "Glissez-déposez votre fichier ici"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {selectedFile ? "Cliquez pour changer de fichier" : "ou cliquez pour parcourir"}
          </p>
        </div>
        {!selectedFile && (
          <p className="text-sm text-gray-500">
            Sélectionnez d'abord un type de conversion ci-dessus
          </p>
        )}
      </div>
    </Card>
  );
};