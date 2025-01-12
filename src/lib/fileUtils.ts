export type FileFormat = "PNG" | "JPG" | "WEBP";

export interface ConversionHistoryItem {
  id: string;
  originalName: string;
  originalFormat: string;
  targetFormat: FileFormat;
  timestamp: Date;
  status: "pending" | "completed" | "error";
}

export const supportedFormats: FileFormat[] = ["PNG", "JPG", "WEBP"];

export const isImageFile = (file: File): boolean => {
  return file.type.startsWith("image/");
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