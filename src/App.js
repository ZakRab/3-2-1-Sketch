import "./App.css";
import Main from "./components/Main";
import Lobby from "./components/Lobby";
import Sketch from "./components/Sketch";
import Vote from "./components/Vote";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

function App() {
  return (
    <>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/main" element={<Main />} />
            <Redirect exact from="/" to="/main" />
            <Route path="*" element={<Redirect to={"/main"} />}></Route>
            <Redirect exact from="/" to="*" />
            <Route path="/lobby/:lobbyKey" element={<Lobby />} />
            <Redirect exact from="/main" to="/lobby/:lobbyKey" />
            <Route path="/sketch/:lobbyKey" element={<Sketch />} />
            <Redirect exact from="/lobby/:lobbyKey" to="/sketch/:lobbyKey" />
            <Route path="/vote/:lobbyKey" element={<Vote />} />
            <Redirect exact from="/sketch/:lobbyKey" to="/vote/:lobbyKey" />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </>
  );
}

export default App;
