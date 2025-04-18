import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})

export class RequeteApiService {
  constructor(private httpUtilisateurs: HttpClient) {}

  private baseUrl = 'http://localhost:3000';

  private getToken(): string | null {
    return localStorage.getItem("token");
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();

    if (!token) {
      return new HttpHeaders(); // Retourne un header vide (aucune auth)
    }
    console.log('Token envoyé dans headers :', token);
    // Retourner un objet HttpHeaders
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Inscription
  register(userData: any): Observable<any> {
    return this.httpUtilisateurs.post(`${this.baseUrl}/users/register`, userData);
  }

  login(loginForm: FormGroup): Observable<any> {
    return this.httpUtilisateurs.post(`${this.baseUrl}/users/login`, loginForm, {withCredentials: true});
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Vérifie si un token existe
  }

  // Déconnexion
  logout() {
    localStorage.removeItem('token'); // Supprime le token
  }

  // Méthode pour ajouter un client dans le forulaire-client
  addUser(utilisateur: any): Observable<any> {
    this.ensureToken();
    return this.httpUtilisateurs.post<any>(`${this.baseUrl}/users/users`, utilisateur, { headers: this.getHeaders() });
  }

  // Méthode pour modifier un client directement dans son emplacement//
  updateUser(id: string, utilisateur: any): Observable<any> {
    if (!this.getToken()) {
      throw new Error('No authentification');
    }
    return this.httpUtilisateurs.put<any>(`${this.baseUrl}/users/users/${id}`, utilisateur, { headers: this.getHeaders() });
  }

  getUserById(id: number): Observable<any> {
    if (!this.getToken()) {
      throw new Error('No authentication token');
    }
    return this.httpUtilisateurs.get<any>(`${this.baseUrl}/users/users/${id}`, { headers: this.getHeaders() });
  }

  deleteUser(userId: string): Observable<any> {
    const token = this.getToken();

    if (!token) {
      throw new Error('No authentication token');
    }

    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});

    return this.httpUtilisateurs.delete<any>(`${this.baseUrl}/users/users/${userId}`, { headers });
  }

  // Utilitaires
  private ensureToken(): void {
    if (!this.getToken()) {
      throw new Error('No authentication token');
    }
  }

  getUserInfo(): Observable<any> {
    return this.httpUtilisateurs.get(`${this.baseUrl}/users/usersInfo`, { headers: this.getHeaders() });
  }

  getQrCode(userId: number): Observable<any> {
    return this.httpUtilisateurs.get(`${this.baseUrl}/users/getQRCode/${userId}`);
  }

  createVehicule(data: any): Observable<any> {
    return this.httpUtilisateurs.post(`${this.baseUrl}/vehicule/creation`, data, { headers: this.getHeaders() });
  }

  updateVehicule(id: string, data: any): Observable<any> {
    return this.httpUtilisateurs.put<any>(`${this.baseUrl}/vehicule/modification/${id}`, data, { headers: this.getHeaders()});
  }

  deleteVehicule(id: string): Observable<any> {
    return this.httpUtilisateurs.delete<any>(`${this.baseUrl}/vehicule/suppression/${id}`, { headers: this.getHeaders()});
  }

  getVehiculesByUser(): Observable<any> {
    return this.httpUtilisateurs.get(`${this.baseUrl}/vehicule/user`, { headers: this.getHeaders() });
  }

  uploadImage(data: { image: string }): Observable<any> {
    return this.httpUtilisateurs.post(`${this.baseUrl}/vehicule/upload-image`, data);
  }

  getProfilPublic(token: string) {
    return this.httpUtilisateurs.get(`${this.baseUrl}/users/profil-public?token=${token}`);
  }
}