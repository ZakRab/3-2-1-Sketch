import "./App.css";
import Main from "./components/Main";
import Lobby from './components/Lobby'
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/main" element={<Main/>}/>
        <Route path="*" element={<Navigate to={"/main"} />}></Route>
        <Route path="/lobby/:lobbyKey" element={<Lobby/>} />
      </Routes>
    </Router>

    </>
  );
}

export default App;
