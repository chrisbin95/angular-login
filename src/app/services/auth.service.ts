// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 💡 Ensure this URL is correct for your backend
  private apiUrl = 'http://localhost:5077/api/auth/login'; 

  constructor(private http: HttpClient) {}

  // Login method: Sends plaintext credentials (requires HTTPS for security)
  login(credentials: { username: string; password: string; role: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  // Store essential data from the login response (assuming it contains a token and role)
  setAuthData(response: any) {
    if (response.token) {
      localStorage.setItem('auth-token', response.token); 
      localStorage.setItem('user-role', response.role); 
    }
  }

  // Get the token for use in HTTP requests
  getToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  // Logout: clear authentication keys
  logout() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-role');
  }
}