import "../styles/QuesPanel.css";

const QuesPanel = (props) => {
  // destructuring the props
  const { totalQuesArr, getQues, setIsOpen, isOpen } = props;

  return (
    <div style={isOpen ? {} : { display: "none" }} id="ques-panel-top">
      <div id="ques-panel">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-x"
          viewBox="0 0 16 16"
          onClick={() => setIsOpen(false)}
          id="close-panel-btn"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
        <h2 id="ques-panel-heading">Question Panel</h2>
        <div id="all-ques-btns">
          {totalQuesArr.map((val, index) => {
            if (val) {
              return (
                <button
                  key={index}
                  onClick={() => getQues(index)}
                  className="btn"
                >
                  {index + 1}
                </button>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default QuesPanel;
