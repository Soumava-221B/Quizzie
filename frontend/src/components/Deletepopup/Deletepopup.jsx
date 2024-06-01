import styles from "./Deletepopup.module.css";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";

const Deletepopup = ({ deleteId, setdeletequizPopup }) => {
  const token = localStorage.getItem("token");

  const handleconfirmDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `https://quizzie-backend-ydj6.onrender.com/api/quiz/delete/${deleteId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            token,
          },
        }
      );
      setdeletequizPopup(false);
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.popup_background}>
      <div className={styles.popup}>
        <h2>Are you confirm you want to delete ?</h2>
        <div className={styles.button_div}>
          <button
            style={{ backgroundColor: "#FF4B4B", color: "white" }}
            onClick={handleconfirmDelete}
          >
            Confirm Delete
          </button>
          <button
            style={{ boxShadow: "0 0 3px 1px gray" }}
            onClick={(e) => {
              e.preventDefault();
              setdeletequizPopup(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

Deletepopup.propTypes = {
  deleteId: PropTypes.string.isRequired,
  setdeletequizPopup: PropTypes.func.isRequired,
};
export default Deletepopup;
