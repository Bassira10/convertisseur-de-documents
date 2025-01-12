// Types pour les différents formats de fichiers
export type ImageFormat = "PNG" | "JPG" | "WEBP";
export type DocumentFormat = "PDF" | "DOCX" | "TXT";
export type AudioFormat = "MP3" | "WAV" | "OGG";
export type VideoFormat = "MP4" | "AVI" | "MOV";

export type FileFormat = ImageFormat | DocumentFormat | AudioFormat | VideoFormat;
export type FileType = "image" | "document" | "audio" | "video";

export interface ConversionHistoryItem {
  id: string;
  originalName: string;
  originalFormat: string;
  targetFormat: FileFormat;
  timestamp: Date;
  status: "pending" | "completed" | "error";
  fileType: FileType;
}

export const supportedFormats = {
  image: ["PNG", "JPG", "WEBP"] as ImageFormat[],
  document: ["PDF", "DOCX", "TXT"] as DocumentFormat[],
  audio: ["MP3", "WAV", "OGG"] as AudioFormat[],
  video: ["MP4", "AVI", "MOV"] as VideoFormat[],
};

export const isValidFile = (file: File): { isValid: boolean; fileType: FileType | null } => {
  const type = file.type.split('/')[0];
  
  switch (type) {
    case 'image':
      return { isValid: true, fileType: 'image' };
    case 'application':
    case 'text':
      return { isValid: true, fileType: 'document' };
    case 'audio':
      return { isValid: true, fileType: 'audio' };
    case 'video':
      return { isValid: true, fileType: 'video' };
    default:
      return { isValid: false, fileType: null };
  }
};

export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2).toUpperCase();
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};