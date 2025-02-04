// complaints.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { SidebarService } from '../../sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialog/dialog.component';

interface Complaint {
  wardNo: string;
  patientName: string;
  complaints: string;
  issueDescription: string;
  receivedOn: string;
  resolutionNotes?: string;
  resolvedOn?: string;  
  status: 'Active' | 'Resolved';
}

@Component({
  selector: 'app-complaints',
  standalone: false,
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('tableRow', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class ComplaintsComponent implements OnInit {
  protected Math = Math;
  departments = [
    'Housekeeping',
    'Food & Beverage',
    'Nursing',
    'Doctor/ Medical Team',
    'Pharmacy',
    'Facilities & Maintenance',
    'Billing & Administration',
    'Miscellaneous'
  ];

  dropdownOptions = [
    { 
      label: 'Mark As Resolved', 
      icon: 'bi bi-check2-circle',
      action: (complaint: Complaint) => this.onMarkAsResolved(complaint)
    },
    { 
      label: 'View', 
      icon: 'bi bi-eye',
      action: (complaint: Complaint) => this.onView(complaint)
    },
  ];
  
  selectedDepartment: string = '';
  searchQuery: string = '';
  activeTab: 'Active' | 'Resolved' = 'Active';
  
  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 10;

  activeComplaints: Complaint[]=[ {
    wardNo: '106',
    patientName: 'Ishaan Kapoor',
    complaints: 'Poor food quality or taste. Utensils or trays not clean.',
    issueDescription: 'NA',
    receivedOn: '24 Jan 2024 - 04:42 PM',
    status: 'Active'
  },
  {
    wardNo: '102',
    patientName: 'Ashwin Singh',
    complaints: 'Trash bins were not replaced for past two weeks.',
    issueDescription: 'Due to this the ward is smelling bad.',
    receivedOn: '24 Jan 2024 - 06:42 PM',
    status: 'Active'
  },];
  resolvedComplaints: Complaint[]=[{
    wardNo: '108',
    patientName: 'Rishab Pant',
    complaints: 'Trash bins were not replaced for past two weeks.',
    resolutionNotes: 'New trash bins have been placed in the ward.',
    resolvedOn: '24 Jan 2024 - 07:02 AM',
    status: 'Resolved',
    issueDescription: '',
    receivedOn: ''
  },
  {
    wardNo: '110',
    patientName: 'Anushka Sharma',
    complaints: 'flies in the ward. Ward is not clean.',
    resolutionNotes: 'NA',
    resolvedOn: '23 Jan 2024 - 05:02 AM',
    status: 'Resolved',
    issueDescription: '',
    receivedOn: ''
  },];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sidebarService: SidebarService,
    private dialog: MatDialog // Create this service
  ) {}

  ngOnInit() {
    // Set sidebar active state
    this.sidebarService.setActiveItem('Complaints');
  
    // Get the department and tab from route parameters
    this.route.queryParams.subscribe(params => {
      if (params['department']) {
        this.selectedDepartment = params['department'];
      }
  
      // If no tab is set in the URL, default to 'Active'
      if (params['tab']) {
        this.activeTab = params['tab'] as 'Active' | 'Resolved';
      } else {
        this.activeTab = 'Active';
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { tab: 'Active' },
          queryParamsHandling: 'merge'
        });
      }
    });
  }
  

  get allComplaints(): Complaint[] {
    return [...this.activeComplaints, ...this.resolvedComplaints];
  }

  setActiveTab(tab: 'Active' | 'Resolved') {
    this.activeTab = tab;
  }

  onView(complaint: Complaint){
    console.log('View', complaint);
  }

  onMarkAsResolved(complaint: Complaint): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { complaintId: complaint.wardNo } // You might want to add a proper ID to your Complaint interface
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.resolved) {
        // Find and update the complaint in the array
        const complaintIndex = this.allComplaints.findIndex(c => 
          c.wardNo === complaint.wardNo && c.patientName === complaint.patientName
        );
        
        if (complaintIndex !== -1) {
          this.allComplaints[complaintIndex] = {
            ...complaint,
            status: 'Resolved',
            // You might want to add a notes field to your Complaint interface
            // notes: result.notes
          };
        }
      }
    });
  }


  get filteredComplaints() {
    return this.allComplaints.filter(complaint => {
      const matchesDepartment = !this.selectedDepartment || 
        complaint.complaints.toLowerCase().includes(this.selectedDepartment.toLowerCase());
      const matchesSearch = !this.searchQuery ||
        Object.values(complaint).some(value => 
          value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      const matchesTab = complaint.status === this.activeTab;
      return matchesDepartment && matchesSearch && matchesTab;
    });
  }

  get paginatedComplaints() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredComplaints.slice(startIndex, endIndex);
  }

  getMaxItems(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredComplaints.length);
  }

  get totalPages() {
    return Math.ceil(this.filteredComplaints.length / this.itemsPerPage);
  }

  switchTab(tab: 'Active' | 'Resolved') {
    this.activeTab = tab;
    this.currentPage = 1; // Reset to first page when switching tabs
    this.sidebarService.setActiveItem('Complaints');
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...this.route.snapshot.queryParams, tab },
      queryParamsHandling: 'merge'
    });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
