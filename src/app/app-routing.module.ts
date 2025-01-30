import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { TeamComponent } from './components/team/team.component';
import { AuditComponent } from './components/audit/audit.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'complaints', component: ComplaintsComponent, data: { title: 'Complaints' } },
  { path: 'messages', component: MessagesComponent, data: { title: 'Messages' } },
  { path: 'departments', component: DepartmentsComponent, data: { title: 'Departments' } },
  { path: 'team', component: TeamComponent, data: { title: 'Team Members' } },
  { path: 'audit', component: AuditComponent, data: { title: 'Audit Trails' } },
  { path: 'notifications', component: NotificationsComponent, data: { title: 'Notifications' } },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
