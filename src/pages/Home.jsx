import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quesIds } from "../components/quesIds";
import "../styles/Home.css";

const Home = () => {
  // state for the name of the user
  const [name, setName] = useState("");

  // function to handle the name of the user when user types their name
  const handleName = (e) => {
    setName(e.target.value);
  };

  // state for taking which checkboxes have been checked
  const [checkedArr, setCheckedArr] = useState(
    new Array(quesIds.length).fill(false)
  );

  // state to update the totalQuestions checked by the user
  const [totalQues, setTotalQues] = useState(0);

  // function to make the state of the checkbox true when the user checks the checkbox
  const handleQuesCheckbox = (id) => {
    const updatedArr = checkedArr.map((val, index) => {
      return index === id ? !val : val;
    });
    setCheckedArr(() => {
      let nextState = updatedArr;
      setTotalQues(() => {
        let nextTotal = 0;
        nextState.map((val) => {
          if (val) nextTotal += 1;
        });
        return nextTotal;
      });
      return nextState;
    });
  };

  // using useNavigate to pass the props from home page to test page when the user clicks on the start test button
  const navigate = useNavigate();

  // function to handle the start test functionality
  const handleStartTest = (e) => {
    e.preventDefault();
    if (name === "") {
      alert("enter your name to start the test!");
      return;
    }

    let i = 0;
    checkedArr.map((val) => {
      if (!val) i++;
    });
    if (i === checkedArr.length) {
      alert("Check atleast one question to start the test!!");
      return;
    }

    alert("test will start soon!!");

    const time = totalQues * 5;

    const propsToPass = {
      name,
      time,
      totalQues,
      checkedArr,
    };

    navigate("/test", { state: { propsToPass } });
  };

  return (
    <div id="home-page-top-div">
      <div id="home-page-image"></div>
      <div id="home-page">
        <div id="home-page-content">
          <h2 id="home-heading">Practice for your maths test here !!</h2>
          <div id="userName">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleName}
              required
              placeholder="Enter your name...."
            />
          </div>

          <div id="check-heading">
            Check the questionIDs you want to take test of !!
          </div>

          <div id="question-checkboxes">
            {quesIds.map((quesid, index) => {
              return (
                <div key={index} className="checkbox-container">
                  <input
                    type="checkbox"
                    name={quesid}
                    value={quesid}
                    id={`ques-checkbox-${index}`}
                    checked={checkedArr[index]}
                    onChange={() => handleQuesCheckbox(index)}
                    className="checkbox-input"
                  />
                  <label
                    htmlFor={`ques-checkbox-${index}`}
                    className="checkbox-label"
                  >
                    {quesid}
                  </label>
                </div>
              );
            })}
          </div>

          <div
            id="total-ques-display"
            style={totalQues === 0 ? { display: "none" } : {}}
          >
            Total questions checked are : {totalQues}
          </div>

          <div>
            <button type="submit" onClick={handleStartTest} id="start-test-btn">
              Start Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
