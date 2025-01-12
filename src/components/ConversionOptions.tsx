import { FileFormat, FileType, supportedFormats } from "@/lib/fileUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ConversionOptionsProps {
  selectedFormat: FileFormat;
  fileType: FileType;
  onFormatChange: (format: FileFormat) => void;
  onConvert: () => void;
  isConverting: boolean;
}

export const ConversionOptions = ({
  selectedFormat,
  fileType,
  onFormatChange,
  onConvert,
  isConverting,
}: ConversionOptionsProps) => {
  const availableFormats = supportedFormats[fileType];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md mx-auto mt-8">
      <div className="w-full sm:w-2/3">
        <Select
          value={selectedFormat}
          onValueChange={(value) => onFormatChange(value as FileFormat)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner le format" />
          </SelectTrigger>
          <SelectContent>
            {availableFormats.map((format) => (
              <SelectItem key={format} value={format}>
                Convertir en {format}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        className="w-full sm:w-1/3"
        onClick={onConvert}
        disabled={isConverting}
      >
        {isConverting ? (
          "Conversion..."
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Convertir
          </>
        )}
      </Button>
    </div>
  );
};