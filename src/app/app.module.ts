import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CardComponent } from './components/card/card.component';
import { DateNavigatorComponent } from './components/date-navigator/date-navigator.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { TeamComponent } from './components/team/team.component';
import { AuditComponent } from './components/audit/audit.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { DialogComponent } from './shared/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    CardComponent,
    DateNavigatorComponent,
    ComplaintsComponent,
    MessagesComponent,
    DepartmentsComponent,
    TeamComponent,
    AuditComponent,
    NotificationsComponent,
    DropdownComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatMenuModule,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
