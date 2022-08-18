import {useContext} from "react";
import {useParams} from 'react-router-dom'
import useSocket from "../hooks/useSocket";
import {LobbyContext} from '../context/LobbyContext'
const Lobby = () => {
    const {displayName} = useContext(LobbyContext)
const {lobbyKey} = useParams()
const  {players}  = useSocket(lobbyKey, displayName)
console.log(players);
  return (
  <>
    <h1>Lobby{lobbyKey}</h1>
    <h2>players</h2>
    {players && players.map((player)=>{
        return <div> {player}</div>
    })}
    
  </>)
};

export default Lobby;
