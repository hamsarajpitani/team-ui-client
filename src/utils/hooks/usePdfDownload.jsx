import { useState } from "react";

const usePdfDownload = (pdfUrl) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const downloadPdf = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF file: ${response.statusText}`);
      }

      const blob = await response.blob();
      const filename = pdfUrl.split("/").pop();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();

      link.remove();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { downloadPdf, isLoading, error };
};

export default usePdfDownload;
