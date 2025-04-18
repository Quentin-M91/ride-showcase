import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequeteApiService } from '../../services/requete-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-profile',
  imports: [CommonModule],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css'
})
export class PublicProfileComponent implements OnInit {
  profil: any = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private publicProfileService: RequeteApiService
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.publicProfileService.getProfilPublic(token).subscribe({
        next: (res: any) => {
          this.profil = res.utilisateur;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error.message || 'Erreur de chargement';
          this.loading = false;
        }
      });
    } else {
      this.error = "Token manquant dans l'URL";
      this.loading = false;
    }
  }
}

