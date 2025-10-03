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

          // save user data in localStorage (or sessionStorage)
          localStorage.setItem('user', JSON.stringify(res));

          // redirect based on role
          if (res.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (res.role === 'user') {
            this.router.navigate(['/user-dashboard']);
          } else {
            this.router.navigate(['/guest-dashboard']);
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          this.errorMessage = 'Invalid username or password';
        }
      });
    } else {
      this.errorMessage = 'Please fill all fields!';
    }
  }
}
