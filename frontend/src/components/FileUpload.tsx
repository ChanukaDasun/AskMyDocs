import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Button, message, Space } from "antd";
import { UploadOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { uploadFile } from "../api/files";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (info: any) => {
    setFile(info.file);
  };

  const handleUpload = async () => {
    if (!file) {
      message.warning("Please select a file first!");
      return;
    }

    setUploading(true);

    try {
      const response = await uploadFile(file);
      if (response.status === 200) {
        message.success("File uploaded successfully!");
        console.log("Server response:", response.data);
        navigate(`/choose-action?fileName=${response.data.filename}`);
      } else {
        message.error("Upload failed. Please try again.");
      }
    } catch (error: any) {
      console.error(error);
      message.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Space direction="vertical" align="center">
      <Upload
        onChange={handleFileChange}
        beforeUpload={() => false} // prevent auto-upload
        fileList={file ? [file] : []}
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>

      <Button
        type="primary"
        icon={<CloudUploadOutlined />}
        loading={uploading}
        onClick={handleUpload}
        disabled={!file}
      >
        Upload
      </Button>
    </Space>
  );
};

export default FileUpload;