import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

interface Message {
  sender: string;
  text: string;
}

interface Notification {
  text: string;
}

interface ServiceProduct {
  name: string;
  category: string;
  price: number;
  availability: string;
}

@Component({
  selector: 'app-guest-dashboard',
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.scss']
})
export class GuestDashboardComponent {
  // Dropdown toggles
  showMessages = false;
  showNotifications = false;
  showProfile = false;

  // Sample Messages & Notifications
  messages: Message[] = [
    { sender: 'Platform', text: 'Welcome to our service!' },
    { sender: 'Support', text: 'Your account has been verified.' }
  ];
  notifications: Notification[] = [
    { text: 'New services available for listing' },
    { text: 'Delivery partner onboarding completed' }
  ];

  // Sample Services / Products
  services: ServiceProduct[] = [
    { name: 'Rose Bouquet', category: 'Flowers', price: 500, availability: 'Available' },
    { name: 'Perfume Gift Set', category: 'Perfume', price: 1200, availability: 'Available' },
    { name: 'Spa Kit', category: 'Beauty', price: 1500, availability: 'Available' },
    { name: 'Handmade Candles', category: 'Home', price: 800, availability: 'Out of Stock' }
  ];

  // Sample Dashboard Metrics
  totalOrders = 0;
  totalCustomers = 0;
  newCustomers = 0;
  activeOrders = 0;
  pendingDeliveries = 0;

  // Toggle functions
  toggleMessages(event?: Event) {
    event?.stopPropagation();
    this.showMessages = !this.showMessages;
    this.showNotifications = this.showProfile = false;
  }

  toggleNotifications(event?: Event) {
    event?.stopPropagation();
    this.showNotifications = !this.showNotifications;
    this.showMessages = this.showProfile = false;
  }

  toggleProfile(event?: Event) {
    event?.stopPropagation();
    this.showProfile = !this.showProfile;
    this.showMessages = this.showNotifications = false;
  }

  // Actions
  addToCart(service: ServiceProduct) {
    console.log(`Added ${service.name} to cart`);
    this.totalOrders++;
    this.activeOrders++;
  }

  viewDetails(service: ServiceProduct) {
    console.log(`Viewing details for ${service.name}`);
  }

  // Dropdown close on outside click
  @HostListener('document:click', ['$event'])
  clickOutside() {
    this.showMessages = this.showNotifications = this.showProfile = false;
  }

  // Dynamic Calculations
  availableServices(): number {
    return this.services.filter(s => s.availability === 'Available').length;
  }

  totalRevenue(): number {
    return this.services
      .filter(s => s.availability === 'Available')
      .reduce((sum, s) => sum + s.price, 0);
  }

  activeOrdersPercent(): number {
    return this.totalOrders > 0 ? Math.round((this.activeOrders / this.totalOrders) * 100) : 0;
  }

  pendingDeliveriesPercent(): number {
    return this.totalOrders > 0 ? Math.round((this.pendingDeliveries / this.totalOrders) * 100) : 0;
  }
  // Logout function
    constructor(private router: Router) {}
    logout() {
      // Clear any stored auth/session data
      localStorage.removeItem('authToken'); // or whatever you use
      sessionStorage.clear(); // optional
  
      // Navigate back to login page
      this.router.navigate(['/login'],
        { replaceUrl: true});
    }
}
