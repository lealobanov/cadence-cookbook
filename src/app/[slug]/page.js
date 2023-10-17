import { paths } from "src/routes/paths";
import { SingleRecipeView } from "src/sections/blog/view";
import { fetchExternalRecipe, getAllRecipes, getRelatedRecipes, getSingleRecipe } from "src/data/recipeUtils";
import { redirect } from 'next/navigation';

export const metadata = {
  title: "Cadence Cookbook | Recipe View",
};

export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default async function RecipePage({params}) {
  const recipe = await getSingleRecipe(params.slug);

  if (!recipe) {
    redirect(paths.page404);
  }

  const fetchedRecipe = fetchExternalRecipe(recipe)
  
  const relatedRecipes = await getRelatedRecipes(recipe.module, recipe.slug);

  return <SingleRecipeView recipe={fetchedRecipe} relatedRecipes={relatedRecipes} />;
}
