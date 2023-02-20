import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Quiz from "./components/Quiz";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
};

export default App;
