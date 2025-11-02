import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FileUpload from "./components/FileUpload";
import ActionSelect from "./pages/ActionSelect";
import QuizOptions from "./pages/QuizOptions";
import QuizAttempt from "./pages/QuizAttempt";
import QuizResults from "./pages/QuizResults";
import AskQuestions from "./pages/AskQuestions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/choose-action" element={<ActionSelect />} />
        <Route path="/quiz-options" element={<QuizOptions />} />
        <Route path="/quiz-attempt" element={<QuizAttempt />} />
        <Route path="/quiz-results" element={<QuizResults />} />
        <Route path="/ask-questions" element={<AskQuestions />} />
      </Routes>
    </BrowserRouter>
  );
}