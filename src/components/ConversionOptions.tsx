import { FileFormat, FileType, supportedFormats } from "@/lib/fileUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, FileDown } from "lucide-react";

interface ConversionOptionsProps {
  selectedFormat: FileFormat;
  fileType: FileType;
  onFormatChange: (format: FileFormat) => void;
  onConvert: () => void;
  isConverting: boolean;
  convertedFile: string | null;
}

export const ConversionOptions = ({
  selectedFormat,
  fileType,
  onFormatChange,
  onConvert,
  isConverting,
  convertedFile,
}: ConversionOptionsProps) => {
  const availableFormats = supportedFormats[fileType];

  const handleDownload = () => {
    if (convertedFile) {
      const link = document.createElement('a');
      link.href = convertedFile;
      link.download = `converted-file.${selectedFormat.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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
      <div className="w-full sm:w-1/3 flex gap-2">
        <Button
          className="flex-1"
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
        {convertedFile && (
          <Button
            variant="secondary"
            onClick={handleDownload}
            className="flex-none"
          >
            <FileDown className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};