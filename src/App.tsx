import { StreamerEditPage } from "./components/StreamerEditPage/StreamerEditPage";
import { StreamerPage } from "./components/StreamerPage/StreamerPage";
import { Streamers } from "./components/Streamers/Streamers";
import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./features/store";
import { AuthChecker } from "./components/AuthChecker/AuthChecker";
import { RaffleResult } from "./components/RaffleResult/RaffleResult";
import { CreateRaffle } from "./components/CreateRaffle/CreateRaffle";
import { RafflePreview } from "./components/RafflePreview/RafflePreview";
import { CreatePost } from "./components/CreatePost/CreatePost";
import { UserProfile } from "./components/UserProfile/UserProfile";
import { SubscriberProfile } from "./components/SubscriberProfile/SubscriberProfile";
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
            path="/streamer/:id"
            element={<StreamerPage></StreamerPage>}
          ></Route>
          <Route
            path="/streamer-edit/:id"
            element={<StreamerEditPage></StreamerEditPage>}
          ></Route>
          <Route path="/raffle" element={<RaffleResult></RaffleResult>}></Route>
          <Route
            path="/create-raffle"
            element={<CreateRaffle></CreateRaffle>}
          ></Route>
          <Route
            path="/raffle-preview"
            element={<RafflePreview></RafflePreview>}
          ></Route>
          <Route
            path="/create-post"
            element={<CreatePost></CreatePost>}
          ></Route>
          <Route
            path="user-profile"
            element={<UserProfile></UserProfile>}
          ></Route>
          <Route
            path="subscriber-profile"
            element={<SubscriberProfile></SubscriberProfile>}
          ></Route>
        </Routes>
      </Router>
    </Provider>
  );
};
