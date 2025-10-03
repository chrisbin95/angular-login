import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',  // Use separate HTML file
  styleUrls: ['./admin-dashboard.component.scss']  // Use separate SCSS file
})
export class AdminDashboardComponent {
  showMessages = false;
  showNotifications = false;
  showProfile = false;

  messages = [
    { sender: 'John Doe', text: 'New message from customer' },
    { sender: 'Flower Boutique', text: 'Order #1023 updated' }
  ];

  notifications = [
    { text: 'New order received' },
    { text: 'Revenue report ready' }
  ];

  toggleMessages() {
    this.showMessages = !this.showMessages;
    this.showNotifications = false;
    this.showProfile = false;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    this.showMessages = false;
    this.showProfile = false;
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
    this.showMessages = false;
    this.showNotifications = false;
  }
  // Logout function
    constructor(private router: Router) {}
    logout() {
      // Clear any stored auth/session data
      localStorage.removeItem('authToken'); // or whatever you use
      sessionStorage.clear(); // optional
  
      // Navigate back to login page
      this.router.navigate(['/login']);
    }
}

