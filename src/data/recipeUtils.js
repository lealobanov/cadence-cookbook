import * as fs from "node:fs";
import { recipes } from "./recipes";
import { randomIntFromInterval } from "../utils/random_interval";

const recipesByModule = recipes;

export function fetchExternalRecipe(recipe) {
  const contractExplanationPath = recipe.smartContractExplanation;
  const transactionExplanationPath = recipe.transactionExplanation;
  const testExplanationPath = recipe.testCasesExplanation;

  const contractFolder = `./src/data/recipes/${recipe.path}/cadence/contracts`;
  const transactionFolder = `./src/data/recipes/${recipe.path}/cadence/transactions`;
  const testFolder = `./src/data/recipes/${recipe.path}/cadence/tests`;

  // Dynamically find Recipe.cdc in the contracts folder
  const contractCode = (() => {
    try {
      const files = fs.readdirSync(contractFolder);
      const recipeContract = files.find((file) => file === "Recipe.cdc");
      if (recipeContract) {
        return fs.readFileSync(path.join(contractFolder, recipeContract), "utf8");
      } else {
        console.warn(`Recipe.cdc not found in ${contractFolder}`);
        return null;
      }
    } catch (err) {
      console.error(`Error reading contract folder: ${err.message}`);
      return null;
    }
  })();

  // Dynamically find any transaction file in the transactions folder
const transactionCode = (() => {
  try {
    const files = fs.readdirSync(transactionFolder);
    const transactionFile = files.length > 0 ? files[0] : null; // Pick the first file
    if (transactionFile) {
      return fs.readFileSync(path.join(transactionFolder, transactionFile), "utf8");
    } else {
      console.warn(`No transaction files found in ${transactionFolder}`);
      return null;
    }
  } catch (err) {
    console.error(`Error reading transactions folder: ${err.message}`);
    return null;
  }
})();


// Dynamically find Recipe.cdc in the contracts folder
const testCasesCode = (() => {
  try {
    const files = fs.readdirSync(testFolder);
    const recipeContract = files.find((file) => file === "Recipe_test.cdc");
    if (recipeContract) {
      return fs.readFileSync(path.join(testFolder, recipeContract), "utf8");
    } else {
      console.warn(`Recipe_test.cdc not found in ${testFolder}`);
      return null;
    }
  } catch (err) {
    console.error(`Error reading contract folder: ${err.message}`);
    return null;
  }
})();

  const contractExplanation =
    contractExplanationPath !== undefined && contractExplanationPath !== null
      ? fs.readFileSync(`./src/data/recipes/${contractExplanationPath}`, "utf8")
      : null;
  const transactionExplanation =
    transactionExplanationPath !== undefined &&
    transactionExplanationPath !== null
      ? fs.readFileSync(
          `./src/data/recipes/${transactionExplanationPath}`,
          "utf8"
        )
      : null;
  const testCasesExplanation =
    testExplanationPath !== undefined && testExplanationPath !== null
      ? fs.readFileSync(`./src/data/recipes/${testExplanationPath}`, "utf8")
      : null;

  const setCoverUrl =
    recipe.coverUrl === undefined
      ? `/assets/illustrations/flow/bg-dark${randomIntFromInterval(1, 5)}.png`
      : recipe.coverUrl;

  recipe.smartContractCode = contractCode;
  recipe.transactionCode = transactionCode;
  recipe.testCasesCode = testCasesCode;

  recipe.smartContractExplanation = contractExplanation;
  recipe.transactionExplanation = transactionExplanation;
  recipe.testCasesExplanation = testCasesExplanation;

  recipe.coverUrl = setCoverUrl;

  return recipe;
}

const flattenRecipes = (arr) =>
  arr.flatMap(({ recipes, ...rest }) =>
    recipes.map((o) => ({
      ...rest,
      ...o,
    }))
  );

export function getAllRecipes() {
  const recipes = flattenRecipes(recipesByModule);

  return recipes;
}

export function getSingleModule(slug) {
  return recipes.filter((i) => i.slug === slug)[0];
}

export function getSingleModuleByTitle(title) {
  return recipes.filter((i) => i.module === title)[0];
}

export function getSingleRecipe(slug) {
  const recipes = flattenRecipes(recipesByModule);

  return recipes.filter((i) => i.slug === slug)[0];
}

export function getRecipesByParentModule(module) {
  const recipes = flattenRecipes(recipesByModule);

  return recipes.filter((i) => i.module === module);
}

export function getRelatedRecipes(module, slug) {
  // Implement a filter based on recipe tags or module

  const recipes = flattenRecipes(recipesByModule);

  return recipes.filter((i) => i.module === module && i.slug !== slug);
}

export function getNextRecipe(module, slug) {
  const recipes = flattenRecipes(recipesByModule).filter(
    (i) => i.module === module
  );

  const thisRecipeIndex = recipes
    .map(function (e) {
      return e.slug;
    })
    .indexOf(slug);

  const nextRecipe =
    recipes.length > thisRecipeIndex + 1 ? recipes[thisRecipeIndex + 1] : null;

  return nextRecipe;
}

export function getPreviousRecipe(module, slug) {
  const recipes = flattenRecipes(recipesByModule).filter(
    (i) => i.module === module
  );

  const thisRecipeIndex = recipes
    .map(function (e) {
      return e.slug;
    })
    .indexOf(slug);

  const previousRecipe =
    thisRecipeIndex - 1 >= 0 ? recipes[thisRecipeIndex - 1] : null;

  return previousRecipe;
}

export function getModuleProgress(module, slug) {
  const recipes = flattenRecipes(recipesByModule).filter(
    (i) => i.module === module
  );

  const thisRecipeIndex = recipes
    .map(function (e) {
      return e.slug;
    })
    .indexOf(slug);

  const totalRecipes = recipes.length;

  const proportionComplete = (thisRecipeIndex + 1) / totalRecipes;

  return proportionComplete;
}
