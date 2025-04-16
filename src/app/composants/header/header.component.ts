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
  isLoggedIn = false; // Variable pour vérifier si l'utilisateur est connecté

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  //Sert à la navigation entre les routes et permettre leur sécurité. Lié avec html
  private router = inject(Router);
  pageAccueil() {
    this.router.navigate(["/"]);
  }

  pageConnexion() {
    this.router.navigate(["/connexion"]);
  }

  constructor(private authService: RequeteApiService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token'); // Check si l'utilisateur est connecté avec la présence d'un token

    if (this.isLoggedIn) {
      this.authService.getUserInfo().subscribe({
        next: (data) => {
          this.username = data.username;  // Store user info for use in the template
        },
        error: (error) => {
          console.error('Error fetching user info:', error);
        }
      });
    }
  }

  navigateOrRedirect(path: string): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/connexion']);
    } else {
      this.router.navigate([path]);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.toggleMenu(); // Ferme le menu après déconnexion
    // Redirige vers la page de connexion ou accueil
    this.router.navigate(['/connexion']);
  }
}
