import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

interface ServiceProduct {
  name: string;
  category: string;
  price: number;
  availability: string;
}

interface Message {
  sender: string;
  text: string;
}

interface Notification {
  text: string;
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
  username = 'John Doe';

  // Dropdowns
  showMessages = false;
  showNotifications = false;
  showProfile = false;

  // Sample Data
  services: ServiceProduct[] = [
    { name: 'Rose Bouquet', category: 'Flowers', price: 500, availability: 'Available' },
    { name: 'Perfume Set', category: 'Perfume', price: 1200, availability: 'Available' }
  ];

  messages: Message[] = [
    { sender: 'Admin', text: 'Your profile is approved!' },
    { sender: 'Support', text: 'New guidelines for listing services.' }
  ];

  notifications: Notification[] = [
    { text: 'Order received for Rose Bouquet' },
    { text: 'Perfume Set stock running low' }
  ];

  totalOrders = 5;
  totalCustomers = 3;

  // New Service
  newService: ServiceProduct = { name: '', category: '', price: 0, availability: 'Available' };

  // Dropdown toggles
  toggleMessages(event?: Event) { event?.stopPropagation(); this.showMessages = !this.showMessages; this.showNotifications = this.showProfile = false; }
  toggleNotifications(event?: Event) { event?.stopPropagation(); this.showNotifications = !this.showNotifications; this.showMessages = this.showProfile = false; }
  toggleProfile(event?: Event) { event?.stopPropagation(); this.showProfile = !this.showProfile; this.showMessages = this.showNotifications = false; }

  @HostListener('document:click', ['$event'])
  clickOutside() { this.showMessages = this.showNotifications = this.showProfile = false; }

  // Service Actions
  updateService(service: ServiceProduct) {
    console.log('Updated service:', service);
    // TODO: Save changes to backend
  }

  removeService(service: ServiceProduct) {
    this.services = this.services.filter(s => s !== service);
    console.log('Removed service:', service);
  }

  addNewService() {
    if (!this.newService.name || !this.newService.category || this.newService.price <= 0) return;
    this.services.push({ ...this.newService });
    console.log('Added new service:', this.newService);
    this.newService = { name: '', category: '', price: 0, availability: 'Available' };
  }

  // Helper
  totalRevenue(): number {
    return this.services.reduce((sum, s) => sum + (s.availability === 'Available' ? s.price : 0), 0);
  }

  activeServices(): number {
    return this.services.filter(s => s.availability === 'Available').length;
  }
  constructor(private router: Router) {}

  // Logout function
  logout() {
    // Clear any stored auth/session data
    localStorage.removeItem('authToken'); // or whatever you use
    sessionStorage.clear(); // optional

    // Navigate back to login page
    this.router.navigate(['/login']);
  }
}
