import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Components/Context";

const Home = (props: any) => {
  const [nameInput, setNameInput] = useState();
  const { setPlayer } = useContext(Context);

  const name = useRef<any>();
  const navigate = useNavigate();

  const setNameHandler = () => {
    setNameInput(name.current.value);
    setPlayer(name.current.value);
    navigate("/quiz");
  };

  return (
    <>
      {nameInput}
      <h1>Put in your name</h1>
      <input type="text" ref={name} />
      <button onClick={setNameHandler}>next</button>
    </>
  );
};
export default Home;
