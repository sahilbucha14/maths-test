import { useState, useEffect } from "react";
import "../styles/Time.css";

const Time = (props) => {
  // destructuring the props
  const {
    time,
    totalQuesArr,
    current,
    timeArr,
    setTimeArr,
    pendingTime,
    setPendingTime,
  } = props;

  // state to update the time
  const [format, setFormat] = useState({
    hrs: "",
    mins: "",
    sec: "",
  });

  // useEffect used to decrease the time by every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPendingTime(pendingTime - 1);
      formattedTime(pendingTime);
      timeArr[current - 1] += 1;
      setTimeArr(timeArr);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [pendingTime, current, timeArr, setTimeArr, setPendingTime]);

  // function to make the time into hours:mins:seconds formate
  const formattedTime = (time) => {
    let minute = Math.floor(time / 60);
    let seconds = time % 60;
    time = Math.floor(time / 60);
    let hours = Math.floor(time / 60);
    minute = time % 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    setFormat({
      hrs: hours,
      mins: minute,
      sec: seconds,
    });
  };
  return (
    <div id="timer">
      <span id="timer-logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-stopwatch"
          viewBox="0 0 16 16"
        >
          <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
          <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
        </svg>
      </span>
      <span id="time-display">
        {format.hrs === "00" ? "" : `${format.hrs} : `}
        {`${format.mins} : ${format.sec}`}
      </span>
    </div>
  );
};

export default Time;
