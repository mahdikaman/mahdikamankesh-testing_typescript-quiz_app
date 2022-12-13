import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Quiz from "./Pages/Quiz";
import Context from "./Components/Context";
import { useState } from "react";

function App() {
  const [nameInput, setPlayer] = useState();

  return (
    <div className="App">
      <Context.Provider value={{ nameInput, setPlayer }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
