import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RequeteApiService } from '../../services/requete-api.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;
  username: any; // Variable pour stocker le nom d'utilisateur

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

  constructor(private authService: RequeteApiService) { }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.username = data.username;  // Store user info for use in the template
      },
      error: (error) => {
        // Handle errors (e.g., not authenticated, no token)
        console.error('Error fetching user info:', error);
      }
    });
  }
}
