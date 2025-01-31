import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  private currentDateSubject = new BehaviorSubject<Date>(new Date());
  currentDate$ = this.currentDateSubject.asObservable();

  private viewModeSubject = new BehaviorSubject<'day' | 'week' | 'month'>('day');
  viewMode$ = this.viewModeSubject.asObservable();

  constructor() {}

  setCurrentDate(date: Date) {
    this.currentDateSubject.next(date);
  }

  getCurrentDate(): Date {
    return this.currentDateSubject.getValue();
  }

  setViewMode(mode: 'day' | 'week' | 'month') {
    this.viewModeSubject.next(mode);
  }

  formatDateRange(date: Date): string {
    return date.toDateString(); // Customize based on your needs
  }

  navigateDate(direction: 'prev' | 'next') {
    let currentDate = this.getCurrentDate();
    if (direction === 'prev') {
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.setCurrentDate(new Date(currentDate));
  }
}
