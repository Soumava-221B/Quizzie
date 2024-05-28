import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const Createquizcontext = createContext();

const QuizContextProvider = ({ children }) => {
  const [quizData, setquizData] = useState({
    quizname: "",
    quiztype: "",
    optiontype: "text",
    questions: [
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
        correctoptionindex:null
      },
    ],
    timer: 0,
  });

  const [linkId, setlinkId] = useState();

  return (
    <Createquizcontext.Provider value={{ quizData, setquizData,linkId ,setlinkId}}>
      {children}
    </Createquizcontext.Provider>
  );
};

QuizContextProvider.propTypes = {
  children: PropTypes.array.isRequired,
};

export default QuizContextProvider;
