import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const Sidebar = ({ click }) => {
  const navigate = useNavigate();
  const [isClicked, setisClicked] = useState(click);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/");
  };

  const handleClick = (e) => {
    const { id } = e.target;
    setisClicked(id);
    navigate(`/${id}`,{state:{click:id}});
  };

  return (
    <div className={styles.main_container}>
      <h1 className={styles.h1_tag}>QUIZZIE</h1>
      <div className={styles.route_switch_div}>
        <div
          onClick={handleClick}
          id="dashboard"
          className={`${styles.route_switch} ${
            isClicked == "dashboard" ? styles.border_shadow : ""
          }`}
        >
          Dashboard
        </div>
        <div
          onClick={handleClick}
          id="analytics"
          className={`${styles.route_switch} ${
            isClicked == "analytics" ? styles.border_shadow : ""
          }`}
        >
          Analytics
        </div>
        <div
          onClick={handleClick}
          id="createquiz"
          className={`${styles.route_switch} ${
            isClicked == "createquiz" ? styles.border_shadow : ""
          }`}
        >
          Create Quiz
        </div>
      </div>
      <div className={styles.logout_div}>
        <hr style={{ borderColor: "black" }} />
        <h3 onClick={handleLogout} style={{ cursor: "pointer" }}>
          LOGOUT
        </h3>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  click: PropTypes.string.isRequired,
};

export default Sidebar;
