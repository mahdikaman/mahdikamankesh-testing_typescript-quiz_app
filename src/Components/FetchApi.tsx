import React, { useEffect, useState } from "react";

const FetchApi = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [category, setCategory] = useState<string>("");

  const slicedMathRandomNumber = categories.sort(() => Math.random() - 0.5);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const getQuestion = async () => {
      const response = await fetch(
        `https://the-trivia-api.com/api/questions?categories=${category}&limit=1`
      );
      const data = await response.json();
      setQuestions(data);
      console.log(data);
    };
    getQuestion();
  }, [category]);

  const getCategories = async () => {
    const categoriResponse = await fetch(
      "https://the-trivia-api.com/api/categories"
    );
    const data = await categoriResponse.json();
    setCategories(Object.keys(data));
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

  return (
    <>
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
          return <button key={item.id}>{item.correctAnswer}</button>;
        })}
        {questions.map((item: any) => {
          return (
            <p key={item.id}>
              {item.incorrectAnswers.map((e: any) => {
                return <button>{e}</button>;
              })}
            </p>
          );
        })}
      </div>
    </>
  );
};
export default FetchApi;
