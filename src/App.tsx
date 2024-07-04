import { Streamers } from "./components/Streamers/Streamers";
import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Streamers></Streamers>} index></Route>
      </Routes>
    </Router>
  );
};
