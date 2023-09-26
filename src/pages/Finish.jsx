import { useLocation } from "react-router-dom";
import "../styles/Finish.css";

const Finish = () => {
  const location = useLocation();
  const locationArr = location.state.propsToPass;
  const { totalQuesArr, timeArr, timeTaken, name } = locationArr;

  const correctTime = (time) => {
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
    return `${hours === "00" ? "" : `${hours} :`} ${minute} : ${seconds}`;
  };
  return (
    <div id="finish-page">
      <h2 id="finish-heading">Test finished !!</h2>
      <h3 id="user-salutation">
        Congratulations, {name}. You have completed the test !!
      </h3>
      <div id="finish-container">
        <div id="display-total-finish-time">
          You took {correctTime(timeTaken)} to complete the test.
        </div>
        <ul id="finish-list">
          <li className="finish-list-item">
            <span className="first-col" id="first-col-heading">
              Questions IDs
            </span>
            <span className="second-col" id="second-col-heading">
              Time Taken
            </span>
          </li>
          <li className="finish-list-item">
            <span className="line first-col"></span>
            <span className="line second-col"></span>
          </li>
          {totalQuesArr.map((val, index) => {
            return (
              <li className="finish-list-item" key={index}>
                <span className="first-col">{val}</span>
                <span className="second-col">
                  {correctTime(timeArr[index])}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Finish;
