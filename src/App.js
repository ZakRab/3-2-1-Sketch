import "./App.css";
import Main from "./components/Main";
import Lobby from "./components/Lobby";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Sketch from "./components/Sketch";
import Vote from "./components/Vote";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="*" element={<Navigate to={"/main"} />}></Route>
          <Route path="/lobby/:lobbyKey" element={<Lobby />} />
          <Route path="/sketch/:lobbyKey" element={<Sketch />} />
          <Route path="/vote/:lobbyKey" element={<Vote />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
