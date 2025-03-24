import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './composants/accueil/accueil.component';
import { ConditionGeneraleComponent } from './composants/condition-generale/condition-generale.component';

export const routes: Routes = [
    { path: "", component: AccueilComponent, pathMatch: 'full' },
    { path: "accueil", component: AccueilComponent, pathMatch: 'full' },
    { path : "condition-generale", component: ConditionGeneraleComponent, pathMatch: 'full' },



];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule],
// })
// export class AppRoutingModule { }