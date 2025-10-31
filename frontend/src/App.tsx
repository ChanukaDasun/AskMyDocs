import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FileUpload from "./components/FileUpload";
import ActionSelect from "./pages/ActionSelect";
import QuizOptions from "./pages/QuizOptions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/choose-action" element={<ActionSelect />} />
        <Route path="/quiz-options" element={<QuizOptions />} />
      </Routes>
    </BrowserRouter>
  );
}