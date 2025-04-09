import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequeteApiService } from '../../services/requete-api.service';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder, private apiService: RequeteApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required], 
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.apiService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Token en génération');

          const token = res ?.token;
          if (token) {
            localStorage.setItem('token', res.token); // Stocke le token JWT
            console.log('Token reçu:', res.token);
          }

          this.router.navigate(['/accueil']); // Redirige après connexion
        },
        error: (err : any) => {
          alert('Échec de la connexion : ' + err.error.message);
        }
      });
    }
  }


  //Sert à la navigation entre les routes et permettre leur sécurité. Lié avec html
    pageAccueil() {
      this.router.navigate(["/accueil"]);
    }
}
