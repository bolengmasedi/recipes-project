import { NgModule } from "@angular/core";
import { EditShoppingListComponent } from "./edit-shopping-list/edit-shopping-list.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        ShoppingListComponent,
        EditShoppingListComponent,
    ],
    imports: [
        CommonModule, 
        FormsModule, 
        RouterModule.forChild([
            { path: 'shopping-list', component: ShoppingListComponent}
        ])
    ],
    exports: [
        ShoppingListComponent,
        EditShoppingListComponent,
    ],
})
export class ShoppingListModule {}