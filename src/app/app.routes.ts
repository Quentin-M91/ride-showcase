import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './composants/accueil/accueil.component';
import { ConditionGeneraleComponent } from './composants/condition-generale/condition-generale.component';
import { RegisterComponent } from './composants/register/register.component';
import { LoginComponent } from './composants/login/login.component';
import { ProfilComponent } from './profil/profil.component';

export const routes: Routes = [
    { path: "", component: AccueilComponent, pathMatch: 'full' },
    { path: "accueil", component: AccueilComponent, pathMatch: 'full' },
    { path : "condition-generale", component: ConditionGeneraleComponent, pathMatch: 'full' },
    { path : "inscription", component: RegisterComponent, pathMatch: 'full' },
    { path : "connexion", component: LoginComponent, pathMatch: 'full' },
    { path : "profil", component: ProfilComponent, pathMatch: 'full' },
];

