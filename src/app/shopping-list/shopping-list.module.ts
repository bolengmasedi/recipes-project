import { NgModule } from "@angular/core";
import { EditShoppingListComponent } from "./edit-shopping-list/edit-shopping-list.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { FormsModule} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "./../shared/shared.module";

@NgModule({
    declarations: [
        ShoppingListComponent,
        EditShoppingListComponent,
    ],
    imports: [
        SharedModule,
        FormsModule, 
        RouterModule.forChild([
            { path: 'shopping-list', component: ShoppingListComponent}
        ]),
    ],
    exports: [
        ShoppingListComponent,
        EditShoppingListComponent,
    ],
})
export class ShoppingListModule {}