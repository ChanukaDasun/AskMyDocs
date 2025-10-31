import api from "./axiosInstance";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    console.log("Uploading file:", file);
    const response = await api.post("files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
