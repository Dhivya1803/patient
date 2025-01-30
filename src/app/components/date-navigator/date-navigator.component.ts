import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateService } from '../../date.service';

@Component({
  selector: 'app-date-navigator',
  standalone: false,
  
  templateUrl: './date-navigator.component.html',
  styleUrl: './date-navigator.component.css'
})
export class DateNavigatorComponent {
  currentViewMode: 'day' | 'week' | 'month' = 'day';
  formattedDateRange: string = '';
  showCalendar = false;
  private subscriptions: Subscription[] = [];

  constructor(private dateService: DateService) {}

  ngOnInit() {
    // Subscribe to date changes
    this.subscriptions.push(
      this.dateService.currentDate$.subscribe(date => {
        this.formattedDateRange = this.dateService.formatDateRange(date);
      })
    );

    // Subscribe to view mode changes
    this.subscriptions.push(
      this.dateService.viewMode$.subscribe(mode => {
        this.currentViewMode = mode;
        this.formattedDateRange = this.dateService.formatDateRange(this.dateService.getCurrentDate());
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  navigate(direction: 'prev' | 'next') {
    this.dateService.navigateDate(direction);
  }

  onViewModeChange() {
    this.dateService.setViewMode(this.currentViewMode);
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }
}
