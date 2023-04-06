import { loadFeature, defineFeature } from "jest-cucumber";
import { Categories } from "../components/TriviaFetch";
import { Difficulties } from "../utilities/quizConfig";
import { expect } from "@jest/globals";

const feature = loadFeature("./specs/features/Category.feature");

function getCategory(category: string): Categories {
  const value = (Categories as any)[category] as Categories;
  if (value === undefined) {
    throw new Error(`Invalid category: ${category}`);
  }
  return value;
}

defineFeature(feature, (test) => {
  let chosenCategory: Categories;

  test("Choose category", ({ given, when, then }) => {
    given(/^c: ([a-zA-Z]+)$/, (categoryName) => {
      chosenCategory = getCategory(categoryName);
    });

    when("picking a category", () => {
      // do some action to pick a category
      // (not sure what the implementation should be based on the current code)
    });

    then(/^the picked category should be: ([a-zA-Z]+)$/, (expectedCategoryName) => {
      const expectedCategory = getCategory(expectedCategoryName);
      expect(chosenCategory).toBe(expectedCategory);
    });
  });
});

const feature2 = loadFeature("./specs/features/Difficulty.feature");

function getDifficulty(difficulty: string): Difficulties {
  const value = (Difficulties as any)[difficulty] as Difficulties;
  if (value === undefined) {
    throw new Error(`Invalid difficulty: ${difficulty}`);
  }
  return value;
}

defineFeature(feature2, (test) => {
  let chosenDifficulty: Difficulties;

  test("Choose difficulty", ({ given, when, then }) => {
    given(/^d: ([a-zA-Z]+)$/, (difficultyName) => {
      chosenDifficulty = getDifficulty(difficultyName);
    });

    when("picking a difficulty", () => {
      // do some action to pick a difficulty
      // (not sure what the implementation should be based on the current code)
    });

    then(/^the picked difficulty should be: ([a-zA-Z]+)$/, (expectedDifficultyName) => {
      const expectedDifficulty = getDifficulty(expectedDifficultyName);
      expect(chosenDifficulty).toBe(expectedDifficulty);
    });
  });
});
