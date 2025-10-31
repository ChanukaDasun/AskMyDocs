// Example: FileUpload.tsx
import { useState } from "react";
import { uploadFile } from "../api/files";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");

    try {
      await uploadFile(file);
      console.log("File uploaded successfully", file);
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    alert("File uploaded successfully!");
  };

  return (
    <div>
      <input type="file" accept=".pdf,.txt,.pptx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
