import React, { useEffect, useState } from "react";
import { questionAmount } from "../config";
import { questionTimer } from "../config";
import { nextQuestionTimer } from "../config";

const FetchApi = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [showStartButton, setShowStartButton] = useState<boolean>(true);
  const [disable, setDisabled] = useState<boolean>();
  const [numberQuestion, setNumberQuestion] = useState<number>(0);
  const [showQuestion, setShowQuestion] = useState<boolean>(true);
  const [counter, setCounter] = useState<number>(nextQuestionTimer);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [showPage, setShowPage] = useState<boolean>(false);
  const [region, setRegion] = useState<string>("US");
  const [showCategory, setShowCategory] = useState<boolean>(true);
  const [startNextQuestion, setStartNextQuestion] = useState<boolean>(false);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (startTimer) {
      let hej = setTimeout(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      console.log(counter);
      if (counter === 0) {
        clearTimeout(hej);
        setStartNextQuestion(!startNextQuestion);
        setCounter(questionTimer);
      }
    }
  }, [startTimer, counter, startNextQuestion]);

  useEffect(() => {
    if (category && difficulty) {
      const getQuestion = async () => {
        const response = await fetch(
          `https://the-trivia-api.com/api/questions?categories=${category}&limit=1&difficulty=${difficulty}&region=${region}`
        );
        const data = await response.json();
        setQuestions(data);
        setShowQuestion(false);
        setShowCategory(false);
        console.log(data);
      };
      getQuestion();
    }
  }, [category, difficulty, region]);

  const getCategories = async () => {
    const categoriResponse = await fetch(
      "https://the-trivia-api.com/api/categories"
    );
    const data = await categoriResponse.json();
    console.log(data);
    let ahmed = [];
    for (const key in data) {
      ahmed.push({
        value: data[key][0],
        lable: key,
      });
    }
    console.log(ahmed);
    setCategories(ahmed.sort(() => Math.random() - 0.5).slice(0, 3));
  };

  const getQuestion = async () => {
    const response = await fetch(
      `https://the-trivia-api.com/api/questions?categories=${category}&limit=1&difficulty=${difficulty}&region=${region}`
    );
    const data = await response.json();
    if (numberQuestion === questionAmount) {
      console.log("done");
    }
    console.log(data);
    setCounter(questionTimer);
    setShowCategory(false);
    setStartTimer(true);
    setQuestions(data);
    setDisabled(false);
    setShowQuestion(false);
  };

  const changeDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let targetEl = e.target.value;
    if (targetEl === "random") {
      targetEl = "easy";
    }
    setDifficulty(targetEl);
    console.log(targetEl);
  };

  const changeCategoryHandler = (e: any) => {
    const newElement = e.target.value;
    console.log(newElement);
    if (!showStartButton) {
      setStartNextQuestion(true);
      setCounter(nextQuestionTimer);
      setStartTimer(true);
      setShowPage(true);
      setShowQuestion(true);
    }
    setDisabled(false);
    setCategory(newElement);
    setShowCategory(false);
  };

  const changeRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setRegion(e.target.value);
  };

  const correctAnswerHandler = () => {
    setDisabled(true);
    setNumberQuestion((prev) => prev + 1);
    setShowCategory(true);
    setStartTimer(false);
  };
  const falseAnswerHandler = () => {
    setDisabled(true);
    setNumberQuestion((prev) => prev + 1);
    setStartTimer(false);
    setShowQuestion(true);
  };
  const startButton = () => {
    setShowPage(true);
    setStartTimer(true);
    setShowStartButton(false);
    setStartNextQuestion(true);
    setCounter(nextQuestionTimer);
  };
  const activateStartButton = () => {
    if (category && difficulty) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      <div>
        {showCategory && (
          <select
            onChange={(e) => {
              changeCategoryHandler(e);
            }}
            name={category}
          >
            {categories.map((items: any) => {
              return (
                <option key={items.id} value={items.value}>
                  {items.lable}
                </option>
              );
            })}
          </select>
        )}
        {!difficulty && (
          <select
            onChange={(e) => {
              changeDifficulty(e);
            }}
            name={difficulty}
          >
            <option>Difficulty</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
            <option value="random">random</option>
          </select>
        )}
        {!difficulty && (
          <select
            onChange={(e) => {
              changeRegion(e);
            }}
            name={difficulty}
          >
            <option>Region</option>
            <option value="US">English</option>
            <option value="SE">Swedish</option>
          </select>
        )}
      </div>
      {showStartButton && (
        <button
          className="btn"
          onClick={startButton}
          disabled={activateStartButton()}
        >
          Start
        </button>
      )}
      {showPage && !startNextQuestion && (
        <div>
          {!showQuestion && (
            <h3>
              Category: {category} & Difficulty: {difficulty}
            </h3>
          )}
          <h5>
            Questions answered : {numberQuestion}/{questionAmount}
          </h5>
          {questions.slice(0, 3).map((item: any) => {
            return <p key={item.id}>{item.question}</p>;
          })}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {questions.map((item: any) => {
              return (
                <button
                  onClick={correctAnswerHandler}
                  className="btn"
                  key={item.id}
                  style={{
                    backgroundColor: disable === true ? "green " : "",
                    color: disable === true ? "white " : "",
                  }}
                  disabled={disable}
                >
                  {item.correctAnswer}
                </button>
              );
            })}
            {questions.map((item: any) => {
              return (
                <p key={item.id}>
                  {item.incorrectAnswers.map((e: any) => {
                    return (
                      <button
                        className="btn"
                        onClick={falseAnswerHandler}
                        style={{
                          backgroundColor:
                            disable === true ? "rgba(0,0,0,0.5)" : "",
                          color: disable === true ? "black " : "",
                        }}
                        disabled={disable}
                      >
                        {e}
                      </button>
                    );
                  })}
                </p>
              );
            })}
          </div>
          {disable && numberQuestion !== questionAmount && (
            <button className="btn" onClick={getQuestion}>
              next question
            </button>
          )}
          {numberQuestion === questionAmount && (
            <button className="btn">show result</button>
          )}
          <p>Timer: {counter}</p>
        </div>
      )}
      {startNextQuestion && <p>Timer: {counter}</p>}
    </div>
  );
};
export default FetchApi;
