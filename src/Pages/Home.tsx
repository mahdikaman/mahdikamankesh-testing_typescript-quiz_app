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
    <div className="entered-name">
      {nameInput}
      <div className="input-field">
        <h1>Skriv ditt namn</h1>
        <input type="text" ref={name} />
      </div>
      <button className="btn" onClick={setNameHandler}>
        next
      </button>
    </div>
  );
};
export default Home;
