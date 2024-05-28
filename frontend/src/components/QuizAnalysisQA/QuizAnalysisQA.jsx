import styles from "./QuizAnalysisQA.module.css";
import PropTypes from "prop-types";
import formatDate from "../../utils.functions/date.js";

const QuizAnalysisQA = ({quizData}) => {
  return (
    <div className={styles.main_container}>
      <div className={styles.quizname_heading_container}>
        <h1>{quizData.quizname} Question Analysis</h1>
        <div>
          <p>Created on: {formatDate(quizData.createdAt.slice(0, 10).split("-").reverse().join("-"))}</p>
          <p>Impressions: {quizData.impression}</p>
        </div>
      </div>
      <div className={styles.questions_container}>
        {quizData.questions.map((question,index) => {
          return (
            <div className={styles.question_div} key={index}>
            <h2>Q.{index+1} {question.questiontext} </h2>
            <div className={styles.options_container}>
              <div>
                <h1>{question.attempt}</h1>
                <p>People Attempted the question</p>
              </div>
              <div>
                <h1>{question.correct }</h1>
                <p>People Answered Correctly</p>
              </div>
              <div>
                <h1>{question.attempt-question.correct}</h1>
                <p>People Answered Incorrectly</p>
              </div>
            </div>
            <hr style={{ border: "1px solid #D7D7D7" }} />
          </div>
          )
        })}
      </div>
    </div>
  );
};

QuizAnalysisQA.propTypes = {
   quizData:PropTypes.object.isRequired
}

export default QuizAnalysisQA;
