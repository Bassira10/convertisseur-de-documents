import { ConversionHistoryItem, formatFileSize } from "@/lib/fileUtils";
import { Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";

interface ConversionHistoryProps {
  history: ConversionHistoryItem[];
}

export const ConversionHistory = ({ history }: ConversionHistoryProps) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Recent Conversions
      </h3>
      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 rounded-lg bg-white shadow-sm border animate-fade-in"
          >
            <div className="flex items-center gap-3">
              {item.status === "completed" && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              {item.status === "error" && (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              {item.status === "pending" && (
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              )}
              <div>
                <p className="font-medium">{item.originalName}</p>
                <p className="text-sm text-gray-500">
                  {item.originalFormat} → {item.targetFormat}
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {item.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};