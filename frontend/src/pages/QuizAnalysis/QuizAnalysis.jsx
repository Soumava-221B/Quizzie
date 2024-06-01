import styles from "./QuizAnalysis.module.css";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import QuizAnalysisPoll from "../../components/QuizAnalysisPoll/QuizAnalysisPoll.jsx";
import QuizAnalysisQA from "../../components/QuizAnalysisQA/QuizAnalysisQA.jsx";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const QuizAnalysis = () => {
  const location = useLocation();
  const { id } = location.state;
  const [quizData, setquizData] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `https://quizzie-backend-ydj6.onrender.com/api/quiz/getaquiz/${id}`
          );
          if (response.status === 200) {
            const data = response.data;
            setquizData({ ...data });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchdata();
  }, [id]);

  return (
    quizData && (
      <div className={styles.main_container}>
        <Sidebar click="analytics" />
        {quizData.quiztype == "Poll" && (
          <QuizAnalysisPoll quizData={quizData} />
        )}
        {quizData.quiztype == "Q&A" && <QuizAnalysisQA quizData={quizData} />}
      </div>
    )
  );
};

export default QuizAnalysis;
