import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-dropdown',
  standalone: false,
  
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(8px)' }))
      ])
    ])
  ]
})
export class DropdownComponent {
  @ViewChild(MatMenu) menu!: MatMenu;
  @Input() options: { label: string, icon: string, action: () => void }[] = [];
  @Output() optionSelected = new EventEmitter<any>();

  onOptionClick(option: any) {
    if (option.action) option.action();
    this.optionSelected.emit(option);
  }
}
