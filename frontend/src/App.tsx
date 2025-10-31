import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FileUpload from "./pages/FileUpload";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<FileUpload />} />
      </Routes>
    </BrowserRouter>
  );
}