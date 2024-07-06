import { StreamerPage } from "./components/StreamerPage/StreamerPage";
import { Streamers } from "./components/Streamers/Streamers";
import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const tg = Telegram.WebApp;
export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Streamers></Streamers>} index></Route>
        <Route path="/streamer" element={<StreamerPage></StreamerPage>}></Route>
      </Routes>
    </Router>
  );
};
