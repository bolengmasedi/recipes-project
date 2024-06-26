import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { Ingredients } from "./ingredients.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    /**
     * 
     */
    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        // Create a request to store all recipes and override all the data stored in the database
        this.httpClient
            .put(
                'https://recipe-book-b1e5f-default-rtdb.firebaseio.com/recipes.json',
                recipes
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        // Create a request to fetch all recipes from the database
        // We need to get the user from the authService and use it in the http observable but we can't.
        // Therefore, we need to pipe both observables using an exhaustMap
        // exhaustMap waits for the first observable to complete, therefore we will get the user first
        // After we will use that result, we will put in our second observable
        // The second observable will replace the first one in the chain
        return this.httpClient.get<Recipe[]>(
            'https://recipe-book-b1e5f-default-rtdb.firebaseio.com/recipes.json',
        )
        .pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }; // Add an empty array if ingredients is null
                })
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        )
    }
}