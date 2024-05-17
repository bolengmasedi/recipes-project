import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredients } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Burger', 
            'Salivating!', 
            'https://unsplash.com/photos/cooked-food-on-black-bowl-ZuIDLSz3XLg',
            [new Ingredients('Meat', 2), new Ingredients('Fries', 2)]
        ),
        new Recipe(
            'French Toast', 
            'Amazing breakfast', 
            'https://unsplash.com/photos/toast-bread-with-blueberry-on-black-plate-zcUgjyqEwe8',
            [new Ingredients('Bread', 1), new Ingredients('Eggs', 1), new Ingredients('Syrup', 2)]
        ),
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addToShoppingList(ingredients: Ingredients[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}