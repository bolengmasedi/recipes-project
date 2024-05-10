import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://www.simplyrecipes.com/wp-content/uploads/2019/03/shrimp-scampi-horiz-a-1600.jpg'),
    new Recipe('Another Recipe', 'This is simply another test', 'https://www.simplyrecipes.com/wp-content/uploads/2019/03/shrimp-scampi-horiz-a-1600.jpg'),
  ];

  constructor() {}  

  ngOnInit() {}

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
