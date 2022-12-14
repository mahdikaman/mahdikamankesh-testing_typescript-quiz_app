import React, { useEffect, useState } from "react";
import { questionAmount } from "../config";

const FetchApi = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [correct, setCorrect] = useState<boolean>(false);
  const [disable, setDisabled] = useState<boolean>();
  const [numberQuestion, setNumberQuestion] = useState<number>(0);
  const [showQuestion, setShowQuestion] = useState<boolean>(true);
  const [counter, setCounter] = useState(4);

  useEffect(() => {
    getCategories();
  }, []);

  // const startTimer = () => {
  //   counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  // };

  useEffect(() => {
    if (category && difficulty) {
      const getQuestion = async () => {
        const response = await fetch(
          `https://the-trivia-api.com/api/questions?categories=${category}&limit=1&difficulty=${difficulty}`
        );
        const data = await response.json();
        setQuestions(data);
        setShowQuestion(false);
        console.log(data);
      };
      getQuestion();
    }
  }, [category, difficulty, categories]);

  const getCategories = async () => {
    const categoriResponse = await fetch(
      "https://the-trivia-api.com/api/categories"
    );
    const data = await categoriResponse.json();
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

  const changeDifficulty = (e: any) => {
    let targetEl = e.target.value;
    if (targetEl === "random") {
      targetEl = "easy";
    }
    setDifficulty(targetEl);
    console.log(targetEl);
  };

  const getQuestion = async () => {
    const response = await fetch(
      `https://the-trivia-api.com/api/questions?categories=${category}&limit=1&difficulty=${difficulty}`
    );
    const data = await response.json();
    setQuestions(data);
    setDisabled(false);
    if (numberQuestion === questionAmount) {
      console.log("done");
    }
    console.log(data);
  };

  const changeCategoryHandler = (e: any) => {
    const newElement = e.target.value;
    console.log(newElement);
    setCategory(newElement);
  };

  const correctAnswerHandler = () => {
    setDisabled(true);
    setCorrect(true);
    setNumberQuestion((prev) => prev + 1);
  };
  const falseAnswerHandler = () => {
    setDisabled(true);
    setCorrect(false);
    setNumberQuestion((prev) => prev + 1);
  };
  return (
    <>
      <div>
        {!showQuestion && (
          <h3>
            Category: {category} & Difficulty: {difficulty}
          </h3>
        )}
        {showQuestion && (
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
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
            <option value="random">random</option>
          </select>
        )}
      </div>
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
              key={item.id}
              style={{
                backgroundColor: disable === true ? "green " : "",
                color: disable === true ? "white " : "",
              }}
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
                    onClick={falseAnswerHandler}
                    style={{
                      backgroundColor: disable === true ? "red " : "",
                      color: disable === true ? "white " : "",
                    }}
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
        <button onClick={getQuestion}>next question</button>
      )}
      {numberQuestion === questionAmount && <button>show result</button>}
      {!showQuestion && <p>Timer: {counter}</p>}
    </>
  );
};
export default FetchApi;
