export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instruction: string;
  cuisineId: number;
  dietId: number;
  difficultyId: number;
  image?: string;
}

export interface Difficulties {
  id: number;
  name: string[];
}
