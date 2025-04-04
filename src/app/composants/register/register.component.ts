import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { RequeteApiService } from '../../services/requete-api.service';
import { catchError, of, switchMap } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
// export class RegisterComponent implements OnInit {
//   formu: string | null = '';
//   id: string | null = '';
//   nom: string | null = '';
//   prenom: string | null = '';
//   username: string | null = '';
//   email: string | null = '';
//   confirmEmail: string | null = '';
//   password: string | null = '';
//   confirmPassword: string | null = '';
//   cgu: boolean | null = false;
//   isCreateFormVisible = false;
//   isModifierFormVisible = false;

//   registerForm: FormGroup;
//   editUserForm: FormGroup;
//   createErrorMessage = '';
//   createSuccessMessage = '';
//   editErrorMessage = '';
//   editSuccessMessage = '';

//   constructor(private fb: FormBuilder, private apiService: RequeteApiService, private router: Router) {
//     // Initialisation des formulaires
//     this.registerForm = this.fb.group({
//       nom: ['', Validators.required],
//       prenom: ['', Validators.required],
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       confirmEmail: ['', Validators.required],
//       password: ['', [Validators.required, Validators.minLength(8)]],
//       confirmPassword: ['', Validators.required],
//       cgu: [false, Validators.requiredTrue]
//     }, { validators: this.matchFields('email', 'confirmEmail') && this.matchFields('password', 'confirmPassword') });

//     this.editUserForm = this.fb.group({
//       UserId: ['', [Validators.required]],
//       nom: ['', Validators.required],
//       prenom: ['', Validators.required],
//       username: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//     });
//   }

//   matchFields(field1: string, field2: string) {
//     return (formGroup: FormGroup) => {
//       const control1 = formGroup.controls[field1];
//       const control2 = formGroup.controls[field2];

//       if (control2.errors && !control2.errors['mismatch']) {
//         return;
//       }

//       if (control1.value !== control2.value) {
//         control2.setErrors({ mismatch: true });
//       } else {
//         control2.setErrors(null);
//       }
//     };
//   }

//   ngOnInit() {
//     const urlParams = new URLSearchParams(window.location.search);
//     this.formu = urlParams.get('formu');
//     this.id = urlParams.get('id');
//     this.nom = urlParams.get('nom');
//     this.prenom = urlParams.get('prénom');
//     this.username = urlParams.get('Nom utilisateur');
//     this.email = urlParams.get('email');
//     this.confirmEmail = urlParams.get('Confirmez email');
//     this.password = urlParams.get('Mot de passe');
//     this.confirmPassword = urlParams.get('Confirmez le mot de passe');

//     if (this.id) {
//       const UserId = parseInt(this.id, 10);
//       if (!isNaN(UserId)) {
//         this.loadClientData(UserId);
//       } else {
//         console.error('ID de client invalide');
//       }
//     }

//     if (this.formu === "0") {
//       this.isCreateFormVisible = true;
//     } else if (this.formu === "1") {
//       this.isModifierFormVisible = true;
//     }
//   }

//   loadClientData(UserId: number) {
//     this.apiService.getUserById(UserId).pipe(
//       catchError(err => {
//         this.editErrorMessage = `Erreur: impossible de charger les données de l'utilisateur avec l'ID ${UserId}.`;
//         this.editUserForm.reset();
//         return of(null); // Retourner un observable vide
//       })
//     ).subscribe(utilisateur => {
//       if (utilisateur) {
//         this.editUserForm.patchValue({
//           UserId: utilisateur.id,
//           nom: utilisateur.name,
//           prenom: utilisateur.prenom,
//           username: utilisateur.username,
//           email: utilisateur.email,
//         });
//         this.editErrorMessage = '';
//       }
//     });
//   }

//   handleError(message: string) {
//     this.createErrorMessage = message;
//     this.createSuccessMessage = '';
//   }

//   handleSuccess(message: string) {
//     this.createSuccessMessage = message;
//     this.createErrorMessage = '';
//   }

//   onCreateSubmit() {

//     const { nom, prenom, username, email, confirmEmail, password, confirmPassword, cgu } = this.registerForm.value;

//     this.apiService.addUser({ nom, prenom, username, email, confirmEmail, password, confirmPassword, cgu }).pipe(
//       catchError(() => {
//         this.handleError('Erreur lors de la création du client.');
//         return of(null);
//       })
//     ).subscribe(response => {
//       if (response) {
//         this.handleSuccess('Utilisateur créé avec succès.');
//         this.registerForm.reset();
//         this.router.navigate(['/utilisateurs']); // Redirige vers la page des clients après l'ajout
//       }
//     });

//     // if (this.registerForm.valid) {
//     //   const formData = this.registerForm.value;
//     //   delete formData.confirmEmail;  // On ne l'envoie pas au back-end
//     //   delete formData.confirmPassword; // Pareil ici

//     //   this.apiService.register(formData).subscribe({
//     //     next: (response) => {
//     //       console.log('Inscription réussie', response);
//     //     },
//     //     error: (error) => {
//     //       console.error('Erreur lors de l’inscription', error);
//     //       this.editErrorMessage = 'Une erreur est survenue.';
//     //     }
//     //   });
//     // }
//   }

//   onEditSubmit(): void {
//     const { UserId, nom, prenom, username, email, } = this.editUserForm.value;

//     this.apiService.updateUser(UserId, { nom, prenom, username, email }).pipe(
//       catchError(() => {
//         this.editErrorMessage = "Erreur lors de la modification de l'utilisateur.";
//         return of(null);
//       })
//     ).subscribe(() => {
//       this.editSuccessMessage = 'Utilisateur modifié avec succès.';
//       this.editErrorMessage = '';
//       this.editUserForm.reset();
//     });
//   }
// }

export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private apiService: RequeteApiService, private router: Router ) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      cgu: [false, Validators.requiredTrue]
    }, { validators: this.matchFields('email', 'confirmEmail') && this.matchFields('password', 'confirmPassword') });
  }

  matchFields(field1: string, field2: string) {
    return (formGroup: FormGroup) => {
      const control1 = formGroup.controls[field1];
      const control2 = formGroup.controls[field2];

      if (control1.value !== control2.value) {
        control2.setErrors({ mismatch: true });
      } else {
        control2.setErrors(null);
      }
    };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      delete formData.confirmEmail;  // On ne l'envoie pas au back-end
      delete formData.confirmPassword; // Pareil ici

      this.apiService.register(formData).subscribe({
        next: (response) => {
          this.router.navigate(['/accueil']); // Redirige après connexion
          console.log('Inscription réussie', response);
        },
        error: (error) => {
          console.error('Erreur lors de l’inscription', error);
          this.errorMessage = 'Une erreur est survenue.';
        }
      });
    }
  }
}