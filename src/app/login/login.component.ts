// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  roles = ['user', 'admin', 'guest'];
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  submit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.authService.login(loginData).subscribe({
        next: (res) => {
          console.log('Login success:', res);
          // 💡 ADD: Show a success message
          alert('Login Successful! Redirecting...');

          // 💡 Best Practice: Store essential auth data using the service
          this.authService.setAuthData(res); 

          // Redirect based on role
          const userRole = res.role ? res.role.toLowerCase() : '';
          
          if (userRole === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (userRole === 'user') {
            this.router.navigate(['/user-dashboard']);
          } else if (userRole === 'guest') {
            this.router.navigate(['/guest-dashboard']);
          } else {
            this.errorMessage = "Invalid role received from the server.";
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          this.errorMessage = 'Invalid credentials. Please check your username and password.';
        }
      });
    } else {
      this.errorMessage = 'Please fill all fields!';
    }
  } 
}