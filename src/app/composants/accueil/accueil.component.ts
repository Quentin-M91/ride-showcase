import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

  //Sert à la navigation entre les routes et permettre leur sécurité. Lié avec html
  private router = inject(Router);
  pageInscription() {
    this.router.navigate(["/inscription"]);
  }
}
