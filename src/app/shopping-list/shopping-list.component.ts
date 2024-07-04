import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../shared/logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredients[] = [];
  ingredientChangeSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService) {}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChangeSubscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredients[]) => {
      this.ingredients = ingredients;
    });
    this.loggingService.printLog('Hello (ShoppingListComponent NgOnInit)');
  }

  onEditItem(index: number) {
    // Pass the index of the item you want to edit to the subject
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.ingredientChangeSubscription.unsubscribe();
  }
}
