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

  const slicedMathRandomNumber = categories.sort(() => Math.random() - 0.5);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categories && difficulty) {
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
    setCategories(Object.keys(data));
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
    switch (newElement) {
      case "Arts & Literature":
        setCategory("arts_and_literature");
        break;
      case "Film & TV":
        setCategory("film_and_tv");
        break;
      case "Food & Drink":
        setCategory("food_and_drink");
        break;
      case "General Knowledge":
        setCategory("general_knowledge");
        break;
      case "Geography":
        setCategory("geography");
        break;
      case "History":
        setCategory("history");
        break;
      case "Music":
        setCategory("music");
        break;
      case "Science":
        setCategory("science");
        break;
      case "Society & Culture":
        setCategory("society_and_culture");
        break;
      case "Sport & Leisure":
        setCategory("sport_and_leisure");
        break;
      default:
    }
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
            {slicedMathRandomNumber.slice(0, 3).map((items: any) => {
              return <option key={items.id}>{items}</option>;
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
    </>
  );
};
export default FetchApi;
