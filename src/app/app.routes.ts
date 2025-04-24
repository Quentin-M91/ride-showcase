import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './composants/accueil/accueil.component';
import { ConditionGeneraleComponent } from './composants/condition-generale/condition-generale.component';
import { RegisterComponent } from './composants/register/register.component';
import { LoginComponent } from './composants/login/login.component';
import { ProfilComponent } from './composants/profil/profil.component';
import { authGuard } from './guards/auth.guard';
import { GarageComponent } from './composants/garage/garage.component';
import { ContactComponent } from './composants/contact/contact.component';
import { ActualiteComponent } from './composants/actualite/actualite.component';
import { PublicProfileComponent } from './composants/public-profile/public-profile.component';

export const routes: Routes = [
    { path: "", component: AccueilComponent, pathMatch: 'full' },
    { path: "condition-generale", component: ConditionGeneraleComponent, pathMatch: 'full' },
    { path: "inscription", component: RegisterComponent, pathMatch: 'full' },
    { path: "connexion", component: LoginComponent, pathMatch: 'full' },
    { path: "profil", component: ProfilComponent, canActivate: [authGuard], pathMatch: 'full' },
    { path: "garage", component: GarageComponent, canActivate: [authGuard], pathMatch: 'full' },
    { path: "contact", component: ContactComponent, canActivate: [authGuard], pathMatch: 'full' },
    { path: "actualite", component: ActualiteComponent, canActivate: [authGuard], pathMatch: 'full' },
    { path: 'profil-public', component: PublicProfileComponent },
];

