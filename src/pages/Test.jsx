import { useState, useEffect } from "react";
import axios from "axios";
import { MathJax } from "better-react-mathjax";
import { useLocation, useNavigate } from "react-router-dom";
import Time from "../components/Time";
import QuesPanel from "../components/QuesPanel";
import { quesIds } from "../components/quesIds";
import "../styles/Test.css";

const Test = () => {
  const location = useLocation();
  const locationArr = location.state.propsToPass;
  const { name, time, totalQues, checkedArr } = locationArr;

  const totalQuesArr = quesIds.filter((val, index) => {
    if (checkedArr[index]) {
      return quesIds[index];
    }
  });

  const [ques, setQues] = useState("");
  useEffect(() => {
    getQues(0);
  }, []);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

  const getQues = async (no) => {
    try {
      const response = await axios.get(
        `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${totalQuesArr[no]}`
      );
      setQues(response.data[0].Question);
      setCurrentQuestionNumber(no + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const totalTime = time * 60;
  const [pendingTime, setPendingTime] = useState(totalTime);
  const timeTaken = totalTime - pendingTime;

  const handlePrevious = () => {
    getQues(currentQuestionNumber - 2);
  };

  const handleNext = () => {
    getQues(currentQuestionNumber);
  };

  const navigate = useNavigate();
  const [timeArr, setTimeArr] = useState(
    new Array(totalQuesArr.length).fill(0)
  );
  const handleSubmitTest = () => {
    const val = confirm("Do you want to submit the test?");
    if (!val) return;
    // Define the props you want to pass
    const propsToPass = {
      name,
      timeTaken,
      totalQuesArr,
      timeArr,
    };

    // Use history.push to navigate and pass props
    navigate("/finish", { state: { propsToPass } });
  };

  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = () => {
    console.log("clicking on arrow right");
    setIsOpen(true);
  };

  return (
    <div id="test-page">
      <div id="arrow-right-btn" onClick={handleOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-box-arrow-right"
          viewBox="0 0 16 16"
          // style={isOpen ? { display: "none" } : {}}
        >
          <path
            fillRule="evenodd"
            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
          />
          <path
            fillRule="evenodd"
            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
          />
        </svg>
      </div>

      <QuesPanel
        totalQuesArr={totalQuesArr}
        getQues={getQues}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div id="time-component">
        <Time
          setPendingTime={setPendingTime}
          pendingTime={pendingTime}
          totalQuesArr={totalQuesArr}
          current={currentQuestionNumber}
          timeArr={timeArr}
          setTimeArr={setTimeArr}
        />
      </div>
      <div
        id="test-page-content"
        // style={isOpen ? { width: "50%" } : { width: "75%" }}
      >
        <div id="test-page-content-div">
          <h2 id="ques-no-heading">
            Question {currentQuestionNumber} of {totalQues}
          </h2>

          <MathJax id="ques-display">{ques}</MathJax>

          <div>
            <button
              id="prev-btn"
              className="test-btn"
              onClick={handlePrevious}
              style={currentQuestionNumber > 1 ? {} : { display: "none" }}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              id="next-btn"
              className="test-btn"
              style={
                currentQuestionNumber === totalQuesArr.length
                  ? { display: "none" }
                  : {}
              }
            >
              Next
            </button>
          </div>
          <div>
            <button
              onClick={handleSubmitTest}
              id="submit-btn"
              className="test-btn"
              style={
                currentQuestionNumber === totalQuesArr.length
                  ? {}
                  : { display: "none" }
              }
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
