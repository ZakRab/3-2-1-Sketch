import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import { LobbyContext } from "../context/LobbyContext";
import Sketch from './Sketch'
const Lobby = () => {
  const navigate = useNavigate()
  const { activePlayer } = useContext(LobbyContext);
  const { lobbyKey } = useParams();
  const { players } = useSocket(lobbyKey);
  return (
    <>
      <h1>Lobby{lobbyKey}</h1>
      <h2>players</h2>
      {players &&
        players.map((player, idx) => {
          return <div key={idx}> {player.displayName}</div>;
        })}

       {activePlayer.isHost && <button onClick={()=>navigate(`/sketch/${lobbyKey}`)}>start game</button>}
    </>
  );
};

export default Lobby;
