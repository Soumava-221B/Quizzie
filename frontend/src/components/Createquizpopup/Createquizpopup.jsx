import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Createquizpopup.module.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import { Createquizcontext } from "../../context/createquizcontext/QuizContextProvider";

const Createquizpopup = ({
  setcreatequizPopup,
  setcreatequestionsPopup,
}) => {
  
  const QuizState = useContext(Createquizcontext);
  const { quizData, setquizData } = QuizState;
  const navigate = useNavigate();

  const handlePopupdiv = (e) => {
    e.stopPropagation();
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  //for quiz name data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setquizData({
      ...quizData,
      [name]: value,
    });
  };

  //for button click ("poll","question")
  const handlebuttonClick = (e) => {
    const { name, value } = e.target;
    setquizData({
      ...quizData,
      [name]: value,
    });
  };

  //if data is filled then continue else warning toast
  const handleContinue = () => {
    if (quizData.quizname && quizData.quiztype) {
      setcreatequizPopup(false);
      setcreatequestionsPopup(true);
    } else {
      toast.warn("All the fields are required");
    }
  };

  return (
    <div className={styles.main_container} onClick={handlePopupdiv}>
      <input
        type="text"
        name="quizname"
        className={styles.quizname_inputbox}
        placeholder="Quiz Name"
        value={quizData.quizname}
        onChange={handleChange}
      />
      <div className={styles.quiztype_div}>
        <label htmlFor="quiztype">Quiz Type</label>
        <button
          id="quiztype"
          name="quiztype"
          value="Q&A"
          onClick={handlebuttonClick}
          className={
            quizData.quiztype == "Q&A"
              ? styles.green_background
              : styles.buttons
          }
        >
          Q & A
        </button>
        <button
          id="quiztype"
          name="quiztype"
          value="Poll"
          onClick={handlebuttonClick}
          className={
            quizData.quiztype == "Poll"
              ? styles.green_background
              : styles.buttons
          }
        >
          Poll Type
        </button>
      </div>
      <div className={styles.button_div}>
        <button
          style={{ boxShadow: "0 0 3px 1px gray" }}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          style={{ backgroundColor: "#60B84B", color: "white" }}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

Createquizpopup.propTypes = {
  setcreatequizPopup: PropTypes.func.isRequired,
  setcreatequestionsPopup: PropTypes.func.isRequired,
};

export default Createquizpopup;
