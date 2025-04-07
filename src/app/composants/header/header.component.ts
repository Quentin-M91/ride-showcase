import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  //Sert à la navigation entre les routes et permettre leur sécurité. Lié avec html
  private router = inject(Router);
  pageAccueil() {
    this.router.navigate(["/accueil"]);
  }

  pageProfil() {
    this.router.navigate(["/profil"]);
  }
  
  pageGarage() {
    this.router.navigate(["/garage"]);
  }

  pageChat() {
    this.router.navigate(["/chat"]);
  }

  pageContact() {
    this.router.navigate(["/contact"]);
  }
  
  pageConnexion() {
    this.router.navigate(["/connexion"]);
  }
}
