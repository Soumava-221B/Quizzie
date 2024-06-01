import { useEffect, useState } from "react";
import styles from "./QuizExam.module.css";
import { useParams } from "react-router-dom";
import trophyImage from "../../images/trophy.png";
import Timer from "../../components/Timer/Timer.jsx";
import axios from "axios";

export const QuizExam = () => {
  const { id } = useParams();
  const [quizId, setquizId] = useState(null);
  const [quizData, setquizData] = useState({});
  const [currentQuestionindex, setcurrentQuestionindex] = useState(0);
  const [Questions, setQuestions] = useState([]);
  const [selectedOptionIndex, setselectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setshowResult] = useState(false);
  const [showTimer, setshowTimer] = useState(true);

  useEffect(() => {
    if (id) {
      setquizId(id);
      (async () => {
        try {
          const response = await axios.get(
            `https://quizzie-backend-ydj6.onrender.com/api/quiz/getaquiz/${id}`
          );
          setquizData(response.data);
          setQuestions(response.data.questions);
        } catch (error) {
          console.log(error);
        }
      })();

      (async () => {
        try {
          await axios.patch(
            `https://quizzie-backend-ydj6.onrender.com/api/quiz/impression/${id}`
          );
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id]);

  useEffect(() => {
    if (quizData?.timer) {
      if (currentQuestionindex === Questions.length) {
        clearInterval(questionInterval);
      }
      const questionInterval = setInterval(() => {
        handleNextQuestion();
      }, quizData.timer * 1000);
      return () => clearInterval(questionInterval);
    }
  });

  const handleNextQuestion = async () => {
    setshowTimer(false);
    if (quizData.quiztype == "Q&A") {
      if (
        selectedOptionIndex ==
        Questions[currentQuestionindex].correctoptionindex
      ) {
        const newquestions = [...Questions];
        newquestions[currentQuestionindex].attempt =
          Questions[currentQuestionindex].attempt + 1;
        newquestions[currentQuestionindex].correct =
          Questions[currentQuestionindex].correct + 1;
        await setQuestions(newquestions);
        await setScore((prev) => prev + 1);
      } else {
        const newquestion = [...Questions];
        newquestion[currentQuestionindex].attempt =
          Questions[currentQuestionindex].attempt + 1;
        await setQuestions(newquestion);
      }
    }

    if (quizData.quiztype == "Poll") {
      if (selectedOptionIndex == 0 || selectedOptionIndex) {
        const newquestions = [...Questions];
        newquestions[currentQuestionindex].options[selectedOptionIndex].count =
          Questions[currentQuestionindex].options[selectedOptionIndex].count +
          1;
        await setQuestions(newquestions);
      }
    }

    try {
      await axios.patch(
        `https://quizzie-backend-ydj6.onrender.com/api/quiz/result/${quizId}`,
        Questions
      );
    } catch (error) {
      console.log(error);
    }

    if (currentQuestionindex < Questions.length - 1) {
      setcurrentQuestionindex((prev) => prev + 1);
    }

    if (currentQuestionindex == Questions.length - 1) {
      setshowResult(true);
    }
    setselectedOptionIndex(null);
    setshowTimer(true);
  };

  const handleOptionSelected = (e) => {
    const { id } = e.target;
    if (selectedOptionIndex == id) {
      setselectedOptionIndex(null);
    } else {
      setselectedOptionIndex(id);
    }
  };

  return (
    <div className={styles.main_container}>
      {!showResult && (
        <div className={styles.quiz_container}>
          <div className={styles.header_container}>
            <p style={{ color: "black" }}>
              0{currentQuestionindex + 1}/0{Questions?.length}
            </p>
            {quizData.timer && showTimer ? (
              <p style={{ color: "red" }}>
                <Timer timer={quizData.timer} />
              </p>
            ) : null}
          </div>

          <div className={styles.question_container}>
            <h2>{Questions[currentQuestionindex]?.questiontext}</h2>
          </div>

          <div className={styles.options_container}>
            {quizData?.optiontype == "text&imgurl" &&
              Questions[currentQuestionindex]?.options?.map((option, index) => {
                return (
                  <div
                    className={`${styles.option_textandimg} ${
                      selectedOptionIndex == index && styles.selected_option
                    }`}
                    key={index}
                    id={index}
                    onClick={handleOptionSelected}
                  >
                    <div id={index}>{option.optionText}</div>
                    <img src={option.optionImage} alt="image" id={index} />
                  </div>
                );
              })}
            {quizData?.optiontype == "text" &&
              Questions[currentQuestionindex]?.options?.map((option, index) => {
                return (
                  <div
                    className={`${styles.option_text} ${
                      selectedOptionIndex == index && styles.selected_option
                    }`}
                    key={index}
                    id={index}
                    onClick={handleOptionSelected}
                  >
                    {option.optionText}
                  </div>
                );
              })}
            {quizData?.optiontype == "imgurl" &&
              Questions[currentQuestionindex]?.options?.map((option, index) => {
                return (
                  <div
                    className={`${styles.option_img} ${
                      selectedOptionIndex == index && styles.selected_option
                    }`}
                    key={index}
                    id={index}
                    onClick={handleOptionSelected}
                  >
                    <img src={option.optionImage} alt="image" id={index} />
                  </div>
                );
              })}
          </div>

          <div className={styles.footer_container}>
            <button onClick={handleNextQuestion}>
              {currentQuestionindex == Questions.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      )}

      {showResult && quizData.quiztype == "Poll" && (
        <div className={styles.pollresult_container}>
          <div>Thank you for participating in the Poll</div>
        </div>
      )}

      {showResult && quizData.quiztype == "Q&A" && (
        <div className={styles.QAresult_container}>
          <div>
            <p>Congrats Quiz is completed</p>
            <img src={trophyImage} alt="trophy image" />
            <p>
              Your Score is{" "}
              <span style={{ color: "#60B84B" }}>
                0{score}/0{Questions.length}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizExam;
