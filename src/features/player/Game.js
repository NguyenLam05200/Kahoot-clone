import { useSelector } from "react-redux";
import { playerSelector } from './playerSlice';
import RightName from "./RightName";
import ChooseAnswer from "./ChooseAnswer";
import GetReady from "./GetReady";
import ReadQuestion from "./ReadQuestion";
import TimeUp from "./TimeUp";
import CorrectAns from "./CorrectAns";
import IncorrectAns from "./IncorrectAns";
import WaitResult from "./WaitResult";
import PrepareSumary from "./PrepareSumary";
import Sumary from "./Sumary";

const Game = () => {
  const { status } = useSelector(
    playerSelector
  );

  return (
    <>
      {status === 'rightName' && <RightName />}
      {status === 'getReady' && <GetReady />}
      {status === 'readQuestion' && <ReadQuestion />}
      {status === 'chooseAnswer' && <ChooseAnswer />}
      {status === 'waitResult' && <WaitResult />}
      {status === 'timeUp' && <TimeUp />}
      {status === 'correctAns' && <CorrectAns />}
      {status === 'incorrectAns' && <IncorrectAns />}
      {status === 'prepareSumary' && <PrepareSumary />}
      {status === 'sumary' && <Sumary />}

    </>
  );
};

export default Game;
