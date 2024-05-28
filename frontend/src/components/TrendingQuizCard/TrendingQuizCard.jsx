import styles from "./TrendingQuizCard.module.css";
import eyeImage from "../../images/eye.svg";
import PropTypes from "prop-types";
import formatDate from "../../utils.functions/date";

const TrendingQuizCard = ({ quizname, impression, createdAt }) => {
  return (
    <div className={styles.main_container}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize:"20px", fontWeight: "600"}}>
          {quizname}
        </span>
        <span
          style={{
            color: "#FF5D01",
            display: "flex",
            alignItems: "center",
            gap: "3px",
            fontSize: "small",
          }}
        >
          {impression} <img src={eyeImage} alt="eye icon" />
        </span>
      </div>
      <div>
        <span style={{ fontSize: "small", color: "#60B84B" }}>
          Created on :{" "+formatDate(createdAt.toString().slice(0, 10).split("-").reverse().join("-"))}
        </span>
      </div>
    </div>
  );
};

TrendingQuizCard.propTypes = {
  quizname: PropTypes.string.isRequired,
  impression: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default TrendingQuizCard;
