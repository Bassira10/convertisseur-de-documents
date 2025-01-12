import { useState } from "react";
import { FileUploader } from "@/components/FileUploader";
import { ConversionOptions } from "@/components/ConversionOptions";
import { ConversionHistory } from "@/components/ConversionHistory";
import { FileFormat, FileType, ConversionHistoryItem, supportedFormats } from "@/lib/fileUtils";
import { toast } from "sonner";
import { FileText, Image, Video, Music, Shield, Download, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<FileType | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<FileFormat>("PNG");
  const [isConverting, setIsConverting] = useState(false);
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);
  const [convertedFile, setConvertedFile] = useState<string | null>(null);

  const handleFileTypeSelect = (type: FileType) => {
    setFileType(type);
    setSelectedFormat(supportedFormats[type][0]);
  };

  const handleFileSelect = (file: File, type: FileType) => {
    setSelectedFile(file);
    setFileType(type);
    setSelectedFormat(supportedFormats[type][0]);
    setConvertedFile(null);
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
      fileType: fileType!,
    };

    setHistory((prev) => [historyItem, ...prev]);

    try {
      // Simuler une conversion de fichier
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Créer un URL pour le fichier converti (simulation)
      const reader = new FileReader();
      reader.onload = () => {
        setConvertedFile(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);

      setHistory((prev) =>
        prev.map((item) =>
          item.id === historyItem.id ? { ...item, status: "completed" } : item
        )
      );
      toast.success("Conversion terminée !");
    } catch (error) {
      setHistory((prev) =>
        prev.map((item) =>
          item.id === historyItem.id ? { ...item, status: "error" } : item
        )
      );
      toast.error("La conversion a échoué. Veuillez réessayer.");
    } finally {
      setIsConverting(false);
    }
  };

  const fileTypeCards = [
    { type: "document" as FileType, icon: FileText, label: "Documents" },
    { type: "image" as FileType, icon: Image, label: "Images" },
    { type: "video" as FileType, icon: Video, label: "Vidéos" },
    { type: "audio" as FileType, icon: Music, label: "Audio" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Sécurisé",
      description: "Fichiers supprimés après conversion",
    },
    {
      icon: Download,
      title: "Téléchargement Rapide",
      description: "Processus de conversion rapide",
    },
    {
      icon: Settings,
      title: "Options Avancées",
      description: "Personnalisez votre conversion",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Convertisseur de Fichiers
          </h1>
          <p className="text-gray-600">
            Convertissez vos fichiers vers n'importe quel format instantanément
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {fileTypeCards.map(({ type, icon: Icon, label }) => (
            <Card
              key={type}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                fileType === type ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleFileTypeSelect(type)}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 rounded-full bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            </Card>
          ))}
        </div>

        <FileUploader onFileSelect={handleFileSelect} selectedFile={selectedFile} />

        {selectedFile && (
          <ConversionOptions
            selectedFormat={selectedFormat}
            fileType={fileType!}
            onFormatChange={setSelectedFormat}
            onConvert={handleConvert}
            isConverting={isConverting}
            convertedFile={convertedFile}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="p-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 rounded-full bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            </Card>
          ))}
        </div>

        <ConversionHistory history={history} />
      </div>
    </div>
  );
};

export default Index;