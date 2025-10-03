import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDashboardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the admin dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the profile name', () => {
    const profileEl = debugElement.query(By.css('.profile-dropdown .profile-name'));
    expect(profileEl.nativeElement.textContent).toContain('Admin');
  });

  it('should display 4 stats cards', () => {
    const cards = debugElement.queryAll(By.css('.stats-cards .card'));
    expect(cards.length).toBe(4);
  });

  it('should display analytics boxes', () => {
    const boxes = debugElement.queryAll(By.css('.analytics .box'));
    expect(boxes.length).toBeGreaterThan(0);
  });

  it('should toggle messages dropdown', () => {
    expect(component.showMessages).toBe(false);
    component.toggleMessages();
    expect(component.showMessages).toBe(true);
  });

  it('should toggle notifications dropdown', () => {
    expect(component.showNotifications).toBe(false);
    component.toggleNotifications();
    expect(component.showNotifications).toBe(true);
  });

  it('should toggle profile dropdown', () => {
    expect(component.showProfile).toBe(false);
    component.toggleProfile();
    expect(component.showProfile).toBe(true);
  });
});
