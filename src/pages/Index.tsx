import { useState } from "react";
import { FileUploader } from "@/components/FileUploader";
import { ConversionOptions } from "@/components/ConversionOptions";
import { ConversionHistory } from "@/components/ConversionHistory";
import { FileFormat, FileType, ConversionHistoryItem, supportedFormats } from "@/lib/fileUtils";
import { toast } from "sonner";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<FileType>("image");
  const [selectedFormat, setSelectedFormat] = useState<FileFormat>("PNG");
  const [isConverting, setIsConverting] = useState(false);
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);

  const handleFileSelect = (file: File, type: FileType) => {
    setSelectedFile(file);
    setFileType(type);
    setSelectedFormat(supportedFormats[type][0]);
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      toast.error("Veuillez sélectionner un fichier");
      return;
    }

    setIsConverting(true);

    const historyItem: ConversionHistoryItem = {
      id: Date.now().toString(),
      originalName: selectedFile.name,
      originalFormat: selectedFile.type.split("/")[1].toUpperCase(),
      targetFormat: selectedFormat,
      timestamp: new Date(),
      status: "pending",
      fileType: fileType,
    };

    setHistory((prev) => [historyItem, ...prev]);

    try {
      // Simuler la conversion
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setHistory((prev) =>
        prev.map((item) =>
          item.id === historyItem.id
            ? { ...item, status: "completed" }
            : item
        )
      );

      toast.success("Conversion terminée !");
    } catch (error) {
      setHistory((prev) =>
        prev.map((item) =>
          item.id === historyItem.id
            ? { ...item, status: "error" }
            : item
        )
      );
      toast.error("La conversion a échoué. Veuillez réessayer.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Convertisseur de Fichiers
          </h1>
          <p className="text-gray-600">
            Convertissez vos fichiers instantanément
          </p>
        </div>

        <FileUploader onFileSelect={handleFileSelect} />

        {selectedFile && (
          <ConversionOptions
            selectedFormat={selectedFormat}
            fileType={fileType}
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