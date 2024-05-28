import { useContext, useRef } from "react";
import { toast } from "react-toastify";
import styles from "./SharePopup.module.css";
import { Createquizcontext } from "../../context/createquizcontext/QuizContextProvider";

const SharePopup = () => {
  const { linkId } = useContext(Createquizcontext)
  const inputRef = useRef(null);
  
    
  const handleCopy = async() => {
      try {
          await navigator.clipboard.writeText(inputRef.current.value);
          toast.success("Link copied to Clipboard");
      }catch (error) {
        console.log(error);
      }
  }
    

  return (
    <div className={styles.main_container} onClick={(e)=>e.stopPropagation()}>
          <h1>Congrats your Quiz is Published!</h1>
          <input type="text" value={linkId} ref={inputRef}/>
          <button onClick={handleCopy}>Share</button>
    </div>
  );
}

export default SharePopup
