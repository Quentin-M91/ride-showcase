import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RequeteApiService {
  constructor(private httpUtilisateurs: HttpClient) { }
  private baseUrl = 'http://localhost:3000/api';
  private token = localStorage.getItem("token")

  private getHeaders(): HttpHeaders {
    if (!this.token) {
      throw new Error('No authentication token');
    }
    // Retourner un objet HttpHeaders
    return new HttpHeaders({
      Authorization: `${this.token}`
    });
  }

  login(body: any) {
    return this.httpUtilisateurs.post<any>((`${this.baseUrl}/auth/login`), body);
  }

  // Méthode pour ajouter un client dans le forulaire-client
  addUser(utilisateur: any): Observable<any> {
    this.ensureToken();
    const headers = this.getHeaders();
    return this.httpUtilisateurs.post<any>(`${this.baseUrl}/users`, utilisateur, { headers });
  }

  // Méthode pour modifier un client directement dans son emplacement//
  updateUser(id: string, utilisateur: any): Observable<any> {
    if(!this.token) {
      throw new Error('No authentification');
    }
    const headers = this.getHeaders();
    return this.httpUtilisateurs.put<any>(`${this.baseUrl}/users/${id}`, utilisateur, { headers });
  }

  getUserById(id: number): Observable<any> {
    if (!this.token) {
      throw new Error('No authentication token');
    }
    const headers= this.getHeaders();
    return this.httpUtilisateurs.get<any>(`${this.baseUrl}/users/${id}`, { headers });
  }

  deleteUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = { Authorization: token };
    return this.httpUtilisateurs.delete<any>(`${this.baseUrl}/users/${userId}`, { headers });
  }

  // Utilitaires
  private ensureToken(): void {
    if (!this.token) {
      throw new Error('No authentication token');
    }
  }
}