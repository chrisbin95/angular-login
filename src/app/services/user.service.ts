import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:5001/api/users'; // ASP.NET API URL

  constructor(private http: HttpClient) {}

  login(data: {username: string, password: string, role: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
}
