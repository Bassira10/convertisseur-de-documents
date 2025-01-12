import { useState } from "react";
import { FileUploader } from "@/components/FileUploader";
import { ConversionOptions } from "@/components/ConversionOptions";
import { ConversionHistory } from "@/components/ConversionHistory";
import { FileFormat, ConversionHistoryItem } from "@/lib/fileUtils";
import { toast } from "sonner";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<FileFormat>("PNG");
  const [isConverting, setIsConverting] = useState(false);
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    setIsConverting(true);

    // Add to history
    const historyItem: ConversionHistoryItem = {
      id: Date.now().toString(),
      originalName: selectedFile.name,
      originalFormat: selectedFile.type.split("/")[1].toUpperCase(),
      targetFormat: selectedFormat,
      timestamp: new Date(),
      status: "pending",
    };

    setHistory((prev) => [historyItem, ...prev]);

    try {
      // Simulate conversion
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update history item status
      setHistory((prev) =>
        prev.map((item) =>
          item.id === historyItem.id
            ? { ...item, status: "completed" }
            : item
        )
      );

      toast.success("Conversion completed!");
    } catch (error) {
      setHistory((prev) =>
        prev.map((item) =>
          item.id === historyItem.id
            ? { ...item, status: "error" }
            : item
        )
      );
      toast.error("Conversion failed. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            File Converter
          </h1>
          <p className="text-gray-600">
            Convert your files to any format instantly
          </p>
        </div>

        <FileUploader onFileSelect={handleFileSelect} />

        {selectedFile && (
          <ConversionOptions
            selectedFormat={selectedFormat}
            onFormatChange={setSelectedFormat}
            onConvert={handleConvert}
            isConverting={isConverting}
          />
        )}

        <ConversionHistory history={history} />
      </div>
    </div>
  );
};

export default Index;