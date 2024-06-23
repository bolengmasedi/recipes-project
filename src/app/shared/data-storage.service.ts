import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";
import { Ingredients } from "./ingredients.model";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService) {}

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
        return this.httpClient.get<Recipe[]>(
            'https://recipe-book-b1e5f-default-rtdb.firebaseio.com/recipes.json'
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
        );
    }
}