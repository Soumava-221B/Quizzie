import "./App.css";
import Auth from "./pages/Auth/Auth.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Analytics from "./pages/Analytics/Analytics.jsx";
import QuizAnalysis from "./pages/QuizAnalysis/QuizAnalysis.jsx";
import CreateQuiz from "./pages/CreateQuiz/CreateQuiz.jsx";
import QuizExam from "./pages/QuizExam/QuizExam.jsx";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/quizanalysis" element={<QuizAnalysis />} />
      <Route path="/createquiz" element={<CreateQuiz />} />
      <Route path="/quizexam/:id" element={<QuizExam />} />
      <Route path="/*" element={<h1>404! Page not Found!!</h1>} />
    </Routes>
  );
};

export default App;
