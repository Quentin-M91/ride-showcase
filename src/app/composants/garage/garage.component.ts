import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequeteApiService } from '../../services/requete-api.service';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-garage',
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule, FormsModule, FooterComponent],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.css'
})
export class GarageComponent {
  voitureForm!: FormGroup;
  voitures: any[] = [];
  imagePreviews: string[] = [];
  selectedFiles: File[] = [];
  maxImages = 5;
  showForm = false;

  constructor(private fb: FormBuilder, private carService: RequeteApiService) { }

  ngOnInit(): void {
    this.voitureForm = this.fb.group({
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      annee: ['', [Validators.required]],
      type_de_vehicule: ['', Validators.required],
      couleur: ['', Validators.required],
      type_de_moteur: ['', Validators.required],
      puissance: ['', Validators.required],
      transmission: ['', Validators.required],
      modification_du_vehicule: ['', Validators.required],
    });

    this.carService.getVehiculesByUser().subscribe({
      next: (vehicules) => {
        this.voitures = vehicules;
      },
      error: (err) => {
        console.error("Erreur chargement véhicules utilisateur", err);
      }
    });
  }

  // Affichage du formulaire d'ajout de voiture
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  // Ajout d'une voiture
  ajouterVoiture(): void {
    if (this.voitureForm.valid && this.selectedFiles.length <= this.maxImages) {
      const formData = this.voitureForm.value;

      // Convertir les images en base64
      const imagePromises = this.selectedFiles.map(file => this.convertToBase64(file));

      Promise.all(imagePromises).then((imagesBase64) => {
        formData.images = imagesBase64; // Ajout des images au formData
        this.carService.createVehicule(formData).subscribe({
          next: (res) => {
            this.voitures.push(res.vehicule); // Tu peux aussi relancer getVehiculesByUser() si besoin
            this.voitureForm.reset();
            this.selectedFiles = [];
            this.imagePreviews = [];
            this.showForm = false;
          },
          error: (err) => {
            console.error('Erreur création véhicule', err);
          }
        });
      });
    }
  }

  // Conversion d'une image en base64
  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  // Ajout d'un maximum de 5 images
  onFileSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];
    const totalImages = this.selectedFiles.length + files.length;

    if (totalImages > this.maxImages) {
      alert("Vous ne pouvez uploader que 5 images maximum.");
      return;
    }

    this.selectedFiles.push(...files);

    // Pour prévisualiser
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreviews.push(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  updateVehicule(voiture: any): void {
    const id = voiture.id; // ou voiture._id selon comment c’est stocké
    this.carService.updateVehicule(id, voiture).subscribe({
      next: () => {
        console.log('Véhicule mis à jour');
      },
      error: (err) => {
        console.error("Erreur modification véhicule", err);
      }
    });
  }

  confirmDelete(index: number): void {
    const confirmed = confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?");
    if (confirmed) {
      const voitureId = this.voitures[index].id; // ou autre identifiant
      this.carService.deleteVehicule(voitureId).subscribe({
        next: () => {
          this.voitures.splice(index, 1);
        },
        error: (err) => {
          console.error("Erreur suppression véhicule", err);
        }
      });
    }
  }
}
