import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { RequeteApiService } from '../../services/requete-api.service';
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-profil',
  imports: [HeaderComponent, CommonModule, FooterComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  showQrCode = false;
  qrCodeBase64 = ''; // Contiendra l’image du QR
  utilisateur: any = null; // Variable pour stocker les informations de l'utilisateur
  isLoggedIn = false; // Variable pour vérifier si l'utilisateur est connecté
  vehicules: any[] = []; // Tableau pour stocker les véhicules de l'utilisateur

  constructor(private QrCodeService: RequeteApiService, private userService: RequeteApiService, private vehiculeService: RequeteApiService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token'); // Check si l'utilisateur est connecté avec la présence d'un token

    if (this.isLoggedIn) {
      this.userService.getUserInfo().subscribe({
        next: (user) => {
          const userId = user.id;
          this.loadQrCode(userId); // ✅ Envoie l’ID ici
          this.utilisateur = user;  // Contient nom, prénom, email et username
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de l’utilisateur :', err);
        }
      });
    }

    if (this.isLoggedIn) {
      this.vehiculeService.getVehiculesByUser().subscribe({
        next: (data) => {
          this.vehicules = data;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des véhicules :', error);
        }
      });
    }
  }

  toggleQrCode(): void {
    this.showQrCode = !this.showQrCode;
  }

  loadQrCode(userId: number): void {
    this.QrCodeService.getQrCode(userId).subscribe({
      next: (res) => {
        this.qrCodeBase64 = res.qrCode;
        console.log("QR Code reçu :", this.qrCodeBase64);
      },
      error: (err) => {
        console.error("Erreur lors du chargement du QR Code :", err);
      }
    });
  }

  downloadQrCode(): void {
    const a = document.createElement('a');
    a.href = this.qrCodeBase64;
    a.download = 'mon_qrcode.png';
    a.click();
  }

  modifierMotDePasse() {
    // Redirection ou ouverture de modale de changement
    console.log("Changement de mot de passe à implémenter");
  }

  private router = inject(Router);
    pageGarage() {
      this.router.navigate(["/garage"]);
    }
}
