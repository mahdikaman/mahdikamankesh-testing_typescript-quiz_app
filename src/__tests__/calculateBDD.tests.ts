import { loadFeature, defineFeature } from "jest-cucumber";
import { Categories } from "../../components/TriviaFetch";
import { Difficulties } from "../../utilities/quizConfig";
const feature = loadFeature("./specs/features/Category.feature");

export function getCategory(category: string): Categories {
  let value = (Categories as any)[category] as Categories;
  if (value === undefined) {
    throw new Error(`Incorrect Value`);
  }
  return value;
}

defineFeature(feature, (test) => {
  let getResult: Categories;

  test("Choose category", ({ given, when, then }) => {
    given(/^c: ([a-zA-Z]+)$/, (c) => {
      getResult = getCategory(c);
    });

    when("Picking a category", () => {
      Object.keys(Difficulties).map((ExistingCategory) => {
        if (getResult === ExistingCategory) {
          console.log(getResult === ExistingCategory);
        }
      });
    });

    then(/^The picked category should be: ([a-zA-Z]+)$/, (expected) => {
      let result = getCategory(expected);
      console.log(result, getResult);
      expect(getResult).toBe(result);
    });
  });
});

const feature2 = loadFeature("./specs/features/Difficulty.feature");

export function getDifficulty(difficulty: string): Difficulties {
  let value = (Difficulties as any)[difficulty] as Difficulties;
  if (value === undefined) {
    throw new Error(`Incorrect Value`);
  }
  return value;
}

defineFeature(feature2, (test) => {
  let expectedResult: Difficulties;

  test("Choose difficulty", ({ given, when, then }) => {
    given(/^d: ([a-zA-Z]+)$/, (d) => {
      expectedResult = getDifficulty(d);
    });

    when("Picking a difficulty", () => {
      Object.keys(Difficulties).map((ExistingDifficulty) => {
        if (expectedResult === ExistingDifficulty) {
          console.log(expectedResult === ExistingDifficulty);
        }
      });
    });

    then(/^The picked difficulty should be: ([a-zA-Z]+)$/, (expected) => {
      let result = getDifficulty(expected);
      console.log(result, expectedResult);
      expect(expectedResult).toBe(result);
    });
  });
});
