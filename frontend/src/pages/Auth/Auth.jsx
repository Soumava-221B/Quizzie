import styles from "./Auth.module.css";
import Signup from "../../components/Signup/Signup";
import Login from "../../components/Login/Login";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [loginClicked, setloginClicked] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  },[])

  return (
    <div className={styles.body_container}>
      <div className={styles.main_container}>
        <h1 className={styles.h1_tag}>QUIZZIE</h1>
        <div className={styles.Signup_login}>
          <div
            className={!loginClicked ? styles.button_highlight : ""}
            onClick={() => {
              setloginClicked(false);
            }}
          >
            Sign Up
          </div>
          <div
            className={loginClicked ? styles.button_highlight : ""}
            onClick={() => {
              setloginClicked(true);
            }}
          >
            Login
          </div>
        </div>
        {loginClicked ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default Auth;
