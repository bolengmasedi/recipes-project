import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredients } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe', 
            'This is simply a test', 
            'https://www.simplyrecipes.com/wp-content/uploads/2019/03/shrimp-scampi-horiz-a-1600.jpg',
            [new Ingredients('Spice', 2)]
        ),
        new Recipe(
            'Another Recipe', 
            'This is simply another test', 
            'https://www.simplyrecipes.com/wp-content/uploads/2019/03/shrimp-scampi-horiz-a-1600.jpg',
            [new Ingredients('Salt', 1), new Ingredients('Pepper', 1)]
        ),
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    addToShoppingList(ingredients: Ingredients[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}