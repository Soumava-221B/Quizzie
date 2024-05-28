import { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [isLoading, setisLoading] = useState(false);

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setisLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        formData
      );
      if (response.status === 200) {
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

        //saving token in local stoarge
        localStorage.setItem("token", response.data.token);

        //navigate to the dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      setisLoading(false);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className={styles.form_div}>
      <div className={styles.input_div}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" onChange={handleChange} />
      </div>
      <div className={styles.input_div}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
      </div>
      <div className={styles.btn_div}>
        <button onClick={handleLogin}>
          {isLoading ? "Please Wait..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
