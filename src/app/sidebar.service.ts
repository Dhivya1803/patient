import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private activeItem = new BehaviorSubject<string>('');
  activeItem$ = this.activeItem.asObservable();

  setActiveItem(item: string) {
    this.activeItem.next(item);
  }
}
