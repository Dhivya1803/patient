import { Component } from '@angular/core';

interface Notification {
  id: string;
  message:string;
  priority: number;
  status:string;
  timestamp:string;
  
}

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  notificationlist: Notification[]=[{
    id:"65c9f7bda1db720434ced8f0",
    message:"Your shared folder with Soundarya DevContent Firm has been updated by Soundarya DevContent SU: 2 documents added",
    priority: 10,
    status: "unread",
    timestamp: "Feb 12, 2024, 11:49 AM" },
    {
      id:"653607f6a1db72230a3b3b55",
      message:"Event Invitation: Madid Sya is inviting you to Gokber matter event - Creating legal briefs event on Oct 23, 2023, 01:00 PM - 01:30 PM (GMT+05:30)",
      priority: 10,
      status: "unread",
      timestamp: "Oct 23, 2023, 07:43 AM"}
    ];

isCheckBox(arg0: boolean,_t14: any) {
throw new Error('Method not implemented.');
}
deleteNotification() {
throw new Error('Method not implemented.');
}
readNotification() {
throw new Error('Method not implemented.');
}

}
