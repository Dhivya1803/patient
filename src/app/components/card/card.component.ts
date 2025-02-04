import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: false,
  
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent {

  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() backgroundColor: string = '#fff';
  @Input() totalComplaints: number = 0;
  @Input() active: number = 0;
  @Input() resolved: number = 0;

  constructor(private router: Router) {}

  navigateToComplaints() {
    this.router.navigate(['/complaints'], {
      queryParams: { 
        department: this.title,
        tab: 'Active'
      }
    });
  }

}
