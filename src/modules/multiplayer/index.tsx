 
import GetStarted from "@/modules/multiplayer/GetStarted";
import StartGame from "./StartGame";
import Waiting from "./Waiting";
import JoinGame from "./JoinGame";
import SetName from "./SetName";
import JoinName from "./JoinName"; 
import Board from "./board/Board";


const MultiPlayer = ({
  modal,
  setModal, 
}: {
  modal: string;
  setModal: any 
}) => {  

  return (
    <>
      <GetStarted isOpen={modal === "multi"} onClose={setModal} />
      <StartGame isOpen={modal === "start"} onClose={setModal} />
      <Waiting isOpen={modal === "waiting"} onClose={setModal} />
      <JoinGame  isOpen={modal === "join"} onClose={setModal} />
      <JoinName  isOpen={modal === "join-name"} onClose={setModal} />
      <SetName  isOpen={modal === "name"} onClose={setModal} />
      <Board  isOpen={modal === "mulit-board"} onClose={setModal} />
    </>
  );
}

export default MultiPlayer