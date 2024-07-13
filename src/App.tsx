import { StreamerEditPage } from "./components/StreamerEditPage/StreamerEditPage";
import { StreamerPage } from "./components/StreamerPage/StreamerPage";
import { Streamers } from "./components/Streamers/Streamers";
import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./features/store";
import { AuthChecker } from "./components/AuthChecker/AuthChecker";
export const tg = Telegram.WebApp;
export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthChecker></AuthChecker>}></Route>
          <Route
            path="/streamers"
            element={<Streamers></Streamers>}
            index
          ></Route>
          <Route
            path="/streamer"
            element={<StreamerPage></StreamerPage>}
          ></Route>
          <Route
            path="/streamer-edit"
            element={<StreamerEditPage></StreamerEditPage>}
          ></Route>
        </Routes>
      </Router>
    </Provider>
  );
};
