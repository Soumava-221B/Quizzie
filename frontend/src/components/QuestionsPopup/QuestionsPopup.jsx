import { useContext, useEffect, useState } from "react";
import { Createquizcontext } from "../../context/createquizcontext/QuizContextProvider";
import styles from "./QuestionsPopup.module.css";
import deleteIcon from "../../images/delete.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";

const QuestionsPopup = ({
  setsharePopup,
  setcreatequestionsPopup,
  setcreatequizPopup,
  editId,
  editQuiz,
}) => {
  const navigate = useNavigate();
  const [selectedIndex, setselectedIndex] = useState(0);
  const token = localStorage.getItem("token");

  const QuizState = useContext(Createquizcontext);
  const { quizData, setquizData, setlinkId } = QuizState;

  //useEffect for fetching data if edit is true
  useEffect(() => {
    (async () => {
      if (editQuiz) {
        if (editId) {
          try {
            const response = await axios.get(
              `https://quizzie-backend-ydj6.onrender.com/api/quiz/getaquiz/${editId}`
            );
            if (response.status === 200) {
              const data = response.data;
              setquizData({ ...data });
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    })();
  }, []);

  //handling the state with index storing on question button click
  const handlequestionClick = (e) => {
    const { id } = e.target;
    setselectedIndex(id);
  };

  //Adding the questions onClick function
  const handleAddQuestion = (e) => {
    e.stopPropagation();
    if (quizData.questions.length < 5) {
      setquizData((prequizData) => ({
        ...prequizData,
        questions: [
          ...prequizData.questions,
          {
            questiontext: "",
            options: [
              {
                optionText: "",
                optionImage: "",
              },
              {
                optionText: "",
                optionImage: "",
              },
            ],
            correctoptionindex: null,
          },
        ],
      }));
    }
  };

  //Adding functionality to remove question on clicking the cross
  const handledeleteQuestion = (e) => {
    e.stopPropagation();
    const index = e.target.id;
    setquizData((prevquizData) => {
      const newquestions = [...quizData.questions];
      newquestions.splice(index, 1);
      return {
        ...prevquizData,
        questions: newquestions,
      };
    });
    setselectedIndex(0);
  };

  //handling change in the question input box
  const handleQuestions = (e) => {
    const { value } = e.target;
    setquizData((prevquizData) => {
      const newquestions = [...quizData.questions];
      newquestions[selectedIndex].questiontext = value;
      return {
        ...prevquizData,
        questions: newquestions,
      };
    });
  };

  //handling option types for each question
  const handleOptiontypes = (e) => {
    const { value } = e.target;
    let newquestions = [];
    newquestions = [...quizData.questions].map((question) => {
      return {
        ...question,
        options: [
          {
            optionText: "",
            optionImage: "",
          },
          {
            optionText: "",
            optionImage: "",
          },
        ],
        correctoptionindex: null,
      };
    });
    setquizData((prevquizData) => {
      return {
        ...prevquizData,
        optiontype: value,
        questions: newquestions,
      };
    });
  };

  //handle option change functionality
  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    const index = e.target.id;
    const newquestions = [...quizData.questions];
    const newoptions = [...newquestions[selectedIndex].options];
    newoptions[index][name] = value;
    newquestions[selectedIndex] = {
      ...newquestions[selectedIndex],
      options: newoptions,
    };
    setquizData((prevquizData) => {
      return {
        ...prevquizData,
        questions: newquestions,
      };
    });
  };

  //handling add options on click functionality
  const handleAddOptions = () => {
    setquizData((prevquizData) => {
      const newquestions = [...prevquizData.questions];
      const newoptions = [...newquestions[selectedIndex].options];
      if (newoptions.length < 4) {
        newquestions[selectedIndex] = {
          ...newquestions[selectedIndex],
          options: [
            ...newoptions,
            {
              optionText: "",
              optionImage: "",
            },
          ],
        };
      }
      return {
        ...prevquizData,
        questions: newquestions,
      };
    });
  };

  //functionality for handling the delete option
  const handleDeleteOption = (e) => {
    const index = e.target.id;
    const newquestions = [...quizData.questions];
    const newoptions = [...newquestions[selectedIndex].options];
    newoptions.splice(index, 1);
    newquestions[selectedIndex] = {
      ...newquestions[selectedIndex],
      options: newoptions,
      correctoptionindex:null
    };
    setquizData((prevquizData) => {
      return {
        ...prevquizData,
        questions: newquestions,
      };
    });
  };

  //functionality for correct option
  const correctoptionClick = (e) => {
    const { name } = e.target;
    const index = e.target.id;
    const newquestions = [...quizData.questions];
    newquestions[selectedIndex] = {
      ...newquestions[selectedIndex],
      [name]: index,
    };
    setquizData((prevquizData) => {
      return {
        ...prevquizData,
        questions: newquestions,
      };
    });
  };

  //for setting timer
  const setTimer = (e) => {
    const { name, value } = e.target;
    setquizData({
      ...quizData,
      [name]: value,
    });
  };

  //functionality for cancel quiz creation
  const handleCancel = () => {
    navigate("/dashboard");
  };

  //creating the quiz
  const handleCreateQuiz = async () => {
    for (const question of quizData.questions) {
      if (
        !question?.questiontext ||
        !(quizData?.quiztype == "Poll" ? 1 : question.correctoptionindex) ||
        !question.options.every((option) => {
          if (quizData.optiontype === "text") {
            return option.optionText.trim() !== "";
          } else if (quizData.optiontype === "imgurl") {
            return option.optionImage.trim() !== "";
          } else if (quizData.optiontype === "text&imgurl") {
            return (
              option.optionText.trim() !== "" &&
              option.optionImage.trim() !== ""
            );
          }
        })
      ) {
        toast.error("All the question fields are required");
        return;
      }
    }

    try {
      const response = await axios.post(
        "https://quizzie-backend-ydj6.onrender.com/api/quiz/createquiz",
        quizData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            token,
          },
        }
      );
      if (response.status == 200) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setsharePopup(true);
        setcreatequestionsPopup(false);
        setcreatequizPopup(false);
        setlinkId(
          `http://localhost:5173/quizexam/${response.data.newquiz._id}`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //edit quiz handler
  const handleEditquiz = async () => {
    for (const question of quizData.questions) {
      if (
        !question?.questiontext ||
        (quizData?.quiztype == "Q&A" && question?.correctoptionindex===null) ||
        !question?.options.every((option) => {
          if (quizData.optiontype === "text") {
            return option.optionText.trim() !== "";
          } else if (quizData.optiontype === "imgurl") {
            return option.optionImage.trim() !== "";
          } else if (quizData.optiontype === "text&imgurl") {
            return (
              option.optionText.trim() !== "" &&
              option.optionImage.trim() !== ""
            );
          }
        })
      ) {
        toast.error("All the question fields are required");
        return;
      }
    }

    try {
      const response = await axios.patch(
        `https://quizzie-backend-ydj6.onrender.com/api/quiz/editquiz/${editId}`,
        quizData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            token,
          },
        }
      );

      if (response.status == 200) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setcreatequizPopup(false);
        setcreatequestionsPopup(false);
        setsharePopup(true);
        setlinkId(
          `http://localhost:5173/quizexam/${response.data.editedquiz._id}`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleOutsidePopup = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleOutsidePopup} className={styles.main_container}>
      <div className={styles.question_buttons_div}>
        <div className={styles.buttons_container}>
          {quizData.questions.map((question, index) => {
            return (
              <div
                className={`${styles.question_button} ${
                  selectedIndex == index && styles.green_border
                }`}
                id={index}
                key={index}
                onClick={handlequestionClick}
              >
                {index + 1}
                {index !== 0 && (
                  <button onClick={handledeleteQuestion} key={index} id={index}>
                    x
                  </button>
                )}
              </div>
            );
          })}
          {quizData.questions.length < 5 && (
            <button
              className={styles.addquestion_btn}
              style={{ background: "none" }}
              onClick={handleAddQuestion}
            >
              +
            </button>
          )}
        </div>
        <div>Max 5 questions</div>
      </div>

      <input
        type="text"
        className={styles.questiontext_inputbox}
        placeholder="Question Text"
        name="questiontext"
        value={quizData?.questions[selectedIndex]?.questiontext}
        onChange={handleQuestions}
      />

      <div className={styles.radio_button_div}>
        <label>Option Type</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="radio"
            name="optiontype"
            id="optiontype"
            value="text"
            onChange={handleOptiontypes}
            className={styles.optiontype_radio}
            checked={quizData?.optiontype == "text"}
          />
          <label htmlFor="optiontype">Text</label>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="radio"
            name="optiontype"
            id="optiontype"
            value="imgurl"
            onChange={handleOptiontypes}
            className={styles.optiontype_radio}
            checked={quizData?.optiontype == "imgurl"}
          />
          <label htmlFor="optiontype">Image Url</label>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="radio"
            id="optiontype"
            name="optiontype"
            value="text&imgurl"
            onChange={handleOptiontypes}
            className={styles.optiontype_radio}
            checked={quizData?.optiontype == "text&imgurl"}
          />
          <label htmlFor="optiontype">Text & Image Url</label>
        </div>
      </div>

      <div className={styles.options_timer_div}>
        <div className={styles.options_div}>
          {quizData?.questions[selectedIndex]?.options.map((option, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: "1%",
                height: "16%",
              }}
            >
              {quizData?.quiztype == "Q&A" && (
                <input
                  type="radio"
                  style={{ accentColor: "#60B84B" }}
                  name="correctoptionindex"
                  id={index}
                  onClick={correctoptionClick}
                  checked={
                    quizData.questions[selectedIndex].correctoptionindex ==
                    index
                  }
                />
              )}
              {(quizData?.optiontype == "text" ||
                quizData?.optiontype == "text&imgurl") && (
                <input
                  type="text"
                  value={option.optionText}
                  placeholder="Text"
                  name="optionText"
                  className={
                    quizData.questions[selectedIndex].correctoptionindex ==
                    index
                      ? styles.checked_inputbox
                      : styles.option_inputbox
                  }
                  id={index}
                  onChange={handleOptionChange}
                />
              )}
              {(quizData?.optiontype == "imgurl" ||
                quizData?.optiontype == "text&imgurl") && (
                <input
                  type="text"
                  value={option.optionImage}
                  placeholder="Image Url"
                  name="optionImage"
                  className={
                    quizData.questions[selectedIndex].correctoptionindex ==
                    index
                      ? styles.checked_inputbox
                      : styles.option_inputbox
                  }
                  id={index}
                  onChange={handleOptionChange}
                />
              )}

              {quizData?.questions[selectedIndex]?.options.length > 2 &&
                index > 1 && (
                  <img
                    src={deleteIcon}
                    alt="delete button"
                    onClick={handleDeleteOption}
                    id={index}
                  />
                )}
            </div>
          ))}
          {quizData?.questions[selectedIndex]?.options.length < 4 && (
            <button
              onClick={handleAddOptions}
              className={
                quizData.quiztype == "Q&A"
                  ? styles.addoption_button
                  : styles.addoption_button_poll
              }
            >
              Add Option
            </button>
          )}
        </div>
        {quizData?.quiztype == "Q&A" && (
          <div className={styles.timer_div}>
            <p>Timer</p>
            <button
              name="timer"
              value={0}
              className={
                quizData.timer == 0
                  ? styles.selectedtimer_button
                  : styles.timer_button
              }
              onClick={setTimer}
            >
              OFF
            </button>
            <button
              name="timer"
              value={5}
              className={
                quizData.timer == 5
                  ? styles.selectedtimer_button
                  : styles.timer_button
              }
              onClick={setTimer}
            >
              5 sec
            </button>
            <button
              name="timer"
              value={10}
              className={
                quizData.timer == 10
                  ? styles.selectedtimer_button
                  : styles.timer_button
              }
              onClick={setTimer}
            >
              10 sec
            </button>
          </div>
        )}
      </div>
      <div className={styles.createquiz_cancel_div}>
        <button
          onClick={handleCancel}
          style={{ boxShadow: "0 0 3px 1px gray" }}
        >
          Cancel
        </button>

        {!editQuiz ? (
          <button
            onClick={handleCreateQuiz}
            style={{ backgroundColor: "#60B84B", color: "white" }}
          >
            Create Quiz
          </button>
        ) : (
          <button
            onClick={handleEditquiz}
            style={{ backgroundColor: "#60B84B", color: "white" }}
          >
            Edit Quiz
          </button>
        )}
      </div>
    </div>
  );
};

QuestionsPopup.propTypes = {
  setsharePopup: PropTypes.func.isRequired,
  setcreatequestionsPopup: PropTypes.func.isRequired,
  setcreatequizPopup: PropTypes.func.isRequired,
  editId: PropTypes.string,
  editQuiz: PropTypes.bool,
};

export default QuestionsPopup;
