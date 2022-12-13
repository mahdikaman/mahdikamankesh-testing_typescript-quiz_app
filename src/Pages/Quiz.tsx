import { useContext } from "react";
import Context from "../Components/Context";
import FetchApi from "../Components/FetchApi";

const Quiz = (props: any) => {
  const { nameInput } = useContext(Context);
  return (
    <>
      <h1> hej {nameInput ? nameInput : "David"} </h1>
      <FetchApi />
    </>
  );
};
export default Quiz;
