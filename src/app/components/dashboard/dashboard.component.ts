import { Component } from '@angular/core';
import { DateService } from '../../date.service';
import { Subscription } from 'rxjs/internal/Subscription';

interface DepartmentCard {
  title: string;
  icon: string;
  backgroundColor: string;
  totalComplaints: number;
  active: number;
  resolved: number;
}
@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  cards: DepartmentCard[] = [
    {
      title: 'Housekeeping',
      icon: 'bi-basket',
      backgroundColor: '#D5F2FF',
      totalComplaints: 5,
      active: 2,
      resolved: 3
    },
    {
      title: 'Food & Beverage',
      icon: 'bi-cup-hot',
      backgroundColor: '#fff0e6',
      totalComplaints: 9,
      active: 3,
      resolved: 6
    },
    {
      title: 'Nursing',
      icon: 'bi-heart-pulse',
      backgroundColor: '#ffe6f0',
      totalComplaints: 7,
      active: 2,
      resolved: 5
    },
    {
      title: 'Doctor/ Medical Team',
      icon: 'bi-hospital',
      backgroundColor: '#e6ffe6',
      totalComplaints: 6,
      active: 2,
      resolved: 4
    },
    {
      title: 'Pharmacy',
      icon: 'bi-capsule',
      backgroundColor: '#ffe6e6',
      totalComplaints: 3,
      active: 1,
      resolved: 2
    },
    {
      title: 'Facilities & Maintenance',
      icon: 'bi-tools',
      backgroundColor: '#fff9e6',
      totalComplaints: 4,
      active: 0,
      resolved: 4
    },
    {
      title: 'Billing & Administration',
      icon: 'bi-receipt',
      backgroundColor: '#f0e6ff',
      totalComplaints: 5,
      active: 2,
      resolved: 3
    },
    {
      title: 'Miscellaneous',
      icon: 'bi-boxes',
      backgroundColor: '#ffe6f6',
      totalComplaints: 3,
      active: 1,
      resolved: 2
    }
  ];
  private subscriptions: Subscription[] = [];
  
  constructor(private dateService: DateService) {}

  ngOnInit() {
    // Subscribe to date and view mode changes to update data
    this.subscriptions.push(
      this.dateService.currentDate$.subscribe(date => {
        this.updateDashboardData(date);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getHeaderTitle(): string {
    const viewMode = this.dateService.getViewMode();
    const date = this.dateService.getCurrentDate();
    
    switch (viewMode) {
      case 'day':
        return "Today's Highlights";
      case 'week':
        return 'Weekly Overview';
      case 'month':
        return 'Monthly Summary';
      default:
        return "Today's Highlights";
    }
  }

  private updateDashboardData(date: Date) {
    // Here you would typically fetch new data based on the date
    // For example:
    // this.dashboardService.getDataForDate(date).subscribe(data => {
    //   this.cards = this.transformData(data);
    // });
    
    console.log('Updating dashboard data for:', date);
  }
}
