export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
  cuisineId: number;
  dietId: number;
  difficultyId: number;
  image?: string;
}

export interface Difficultie {
  id: number;
  name: string;
}

export interface Diet {
  id: number;
  name: string;
}

export interface Cuisine {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  rating: number;
  comment: string;
  recipeId: number;
}
