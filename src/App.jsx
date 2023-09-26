import "./App.css";
import { MathJaxContext } from "better-react-mathjax";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// importing all the three pages
import Test from "./pages/Test";
import Home from "./pages/Home";
import Finish from "./pages/Finish";

function App() {
  return (
    // using MathJaxCotext for making the questions display correctly
    <MathJaxContext>
      {/* creating routing for home, test and finish pages */}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/finish" element={<Finish />} />
        </Routes>
      </Router>
    </MathJaxContext>
  );
}

export default App;
