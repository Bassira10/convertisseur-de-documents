import { FileFormat, supportedFormats } from "@/lib/fileUtils";
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
  onFormatChange: (format: FileFormat) => void;
  onConvert: () => void;
  isConverting: boolean;
}

export const ConversionOptions = ({
  selectedFormat,
  onFormatChange,
  onConvert,
  isConverting,
}: ConversionOptionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md mx-auto mt-8">
      <div className="w-full sm:w-2/3">
        <Select
          value={selectedFormat}
          onValueChange={(value) => onFormatChange(value as FileFormat)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            {supportedFormats.map((format) => (
              <SelectItem key={format} value={format}>
                Convert to {format}
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
          "Converting..."
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Convert
          </>
        )}
      </Button>
    </div>
  );
};