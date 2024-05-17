import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private router: Router, private activeRoute: ActivatedRoute) {}  

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onAddNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.activeRoute});
  }
}
