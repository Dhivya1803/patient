import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone:false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard', icon: 'bi-house', route: '/dashboard', exact: true },
    { label: 'Complaints', icon: 'bi-exclamation-circle', route: '/complaints', exact: true },
    { label: 'Messages', icon: 'bi-chat', route: '/messages', exact: true },
    { label: 'Departments', icon: 'bi-building', route: '/departments', exact: true },
    { label: 'Team Members', icon: 'bi-people', route: '/team', exact: true },
    { label: 'Audit Trails', icon: 'bi-clock-history', route: '/audit', exact: true },
    { label: 'Notifications', icon: 'bi-bell', route: '/notifications', exact: true }
  ];

  activeRoute: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
      }
    });
  }

  isActive(route: string): boolean {
    return this.activeRoute === route;
  }
}
