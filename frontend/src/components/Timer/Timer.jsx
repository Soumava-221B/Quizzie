import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Timer = ({ timer }) => {
    const [seconds, setSeconds] = useState(timer);
    useEffect(() => {
        const timerinterval = setInterval(() => {
            setSeconds((prev) => {
                if (prev === 0) {
                    clearInterval(timerinterval);
                    return prev;
                }
                return prev - 1;
            })
        }, 1000);
    },[])
  return (
      <>{seconds} sec</>
  )
}

Timer.propTypes = {
    timer: PropTypes.number
}
export default Timer;