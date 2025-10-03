import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5077/api/auth/login'; // change port if needed

  constructor(private http: HttpClient) {}

  // login method
  login(credentials: { username: string; password: string; role: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  // store user in localStorage
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // get logged user
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // logout
  logout() {
    localStorage.removeItem('user');
  }
}
