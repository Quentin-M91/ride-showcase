import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  url = environment.apiUrl
  path = "/auth"


  constructor(private httpClient: HttpClient) { }

  public login(loginForm: FormGroup): Observable<any> {
    return this.httpClient.post(this.url + this.path + '/login', loginForm.value, { withCredentials: true })
  }

  public register(userData: { name: string; email: string; password: string; age?: number }): Observable<any> {
    return this.httpClient.post(this.url + this.path + '/register', userData);
  }

}
