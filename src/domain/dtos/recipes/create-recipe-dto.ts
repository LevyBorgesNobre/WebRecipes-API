export interface CreateRecipesDTO {
  recipe_title: string;
  description: string;
  recipe_image: string;
  cook_time: string;
  servings: string;
  ingredients: string[];
  cook_instructions: string[];
  userId: string
}