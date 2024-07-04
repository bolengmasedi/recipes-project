import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { RecipesModule } from "./recipes/recipes.module";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(modules => modules.AuthModule)},
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(modules => modules.RecipesModule)},
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(modules => modules.ShoppingListModule)}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}