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
      email: ['', Validators.required], // Peut être un email ou un username
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.apiService.login(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token); // Stocke le token JWT
          this.router.navigate(['/accueil']); // Redirige après connexion
        },
        error: (err) => {
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
