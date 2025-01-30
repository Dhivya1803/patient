import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private currentDateSubject = new BehaviorSubject<Date>(new Date());
  currentDate$ = this.currentDateSubject.asObservable();

  private viewModeSubject = new BehaviorSubject<'day' | 'week' | 'month'>('day');
  viewMode$ = this.viewModeSubject.asObservable();

  getCurrentDate(): Date {
    return this.currentDateSubject.value;
  }

  setCurrentDate(date: Date) {
    this.currentDateSubject.next(date);
  }

  getViewMode() {
    return this.viewModeSubject.value;
  }

  setViewMode(mode: 'day' | 'week' | 'month') {
    this.viewModeSubject.next(mode);
  }

  navigateDate(direction: 'prev' | 'next') {
    const currentDate = new Date(this.getCurrentDate());
    const viewMode = this.getViewMode();

    switch (viewMode) {
      case 'day':
        currentDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        currentDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        currentDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
    }

    this.setCurrentDate(currentDate);
  }

  formatDateRange(date: Date): string {
    const viewMode = this.getViewMode();
    
    switch (viewMode) {
      case 'day':
        return new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }).format(date);
      
      case 'week': {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        
        return `${new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric'
        }).format(weekStart)} - ${new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }).format(weekEnd)}`;
      }
      
      case 'month':
        return new Intl.DateTimeFormat('en-US', {
          month: 'long',
          year: 'numeric'
        }).format(date);
      
      default:
        return '';
    }
  }
}
