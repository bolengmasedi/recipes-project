import { EventEmitter } from "@angular/core";
import { Ingredients } from "../shared/ingredients.model";

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredients[]>();

    private ingredients: Ingredients[] = [
        new Ingredients('Apples', 5),
        new Ingredients('Milk', 1),
        new Ingredients('Flour', 1)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredients) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredients[]) {
        console.log('Getting new ingredients: ', ingredients);
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    editIngredient() {

    }
}