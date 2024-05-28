import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import styles from "./Dashboard.module.css";
import TrendingQuizCard from "../../components/TrendingQuizCard/TrendingQuizCard.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [trendingQuizzes, settrendingQuizzes] = useState([]);
  const [allQuizzes, setallQuizzes] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/quiz/trendingquizzes",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              token,
            },
          }
        );
        settrendingQuizzes(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [trendingQuizzes, token]);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/quiz/getallquizzes",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              token,
            },
          }
        );
        setallQuizzes(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [allQuizzes, token]);

  const totalQuestions = allQuizzes.reduce(
    (accumulator, quiz) => accumulator + quiz.questions.length,
    0
  );

  const totalImpressions = allQuizzes.reduce(
    (accumulator, quiz) => accumulator + quiz.impression,
    0
  );

  return (
    <div className={styles.main_container}>
      <Sidebar click="dashboard" />
      <div className={styles.dashboard_container}>
        <div className={styles.quizdata_container}>
          <div style={{ color: "#FF5D01" }}>
            <h2>{allQuizzes.length}</h2>
            <p>Quiz Created</p>
          </div>
          <div style={{ color: "#60B84B" }}>
            <h2>{totalQuestions}</h2>
            <p>Questions Created</p>
          </div>
          <div style={{ color: "#5076FF" }}>
            <h2>
              {totalImpressions > 999
                ? `${(totalImpressions / 1000).toFixed(1)}K`
                : totalImpressions}
            </h2>
            <p>Total Impressions</p>
          </div>
        </div>

        <div className={styles.trending_container}>
          <h1>Trending Quizs</h1>
          <div className={styles.displaycards_container}>
            {trendingQuizzes.map((quiz, index) => {
              return (
                <TrendingQuizCard
                  key={index}
                  quizname={quiz.quizname}
                  impression={quiz.impression}
                  createdAt={quiz.createdAt}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
