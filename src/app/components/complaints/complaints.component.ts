// complaints.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { SidebarService } from '../../sidebar.service';

interface Complaint {
  wardNo: string;
  patientName: string;
  description: string;
  issueDescription: string;
  receivedOn: string;
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
  
  selectedDepartment: string = '';
  searchQuery: string = '';
  activeTab: 'Active' | 'Resolved' = 'Active';
  
  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 10;
  
  allComplaints: Complaint[] = [
    {
      wardNo: '106',
      patientName: 'Ishaan Kapoor',
      description: 'Poor food quality or taste. Utensils or trays not clean.',
      issueDescription: 'NA',
      receivedOn: '24 Jan 2024 - 04:42 PM',
      status: 'Active'
    },
    {
      wardNo: '102',
      patientName: 'Ashwin Singh',
      description: 'Trash bins were not replaced for past two weeks.',
      issueDescription: 'Due to this the ward is smelling bad.',
      receivedOn: '24 Jan 2024 - 06:42 PM',
      status: 'Active'
    },
    {
      wardNo: '108',
      patientName: 'Rishab Pant',
      description: 'Trash bins were not replaced for past two weeks.',
      issueDescription: 'Due to this the ward is smelling bad.',
      receivedOn: '24 Jan 2024 - 07:02 AM',
      status: 'Resolved'
    },
    {
      wardNo: '110',
      patientName: 'Anushka Sharma',
      description: 'flies in the ward. Ward is not clean.',
      issueDescription: 'NA',
      receivedOn: '23 Jan 2024 - 05:02 AM',
      status: 'Resolved'
    },
    // Add more sample data
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sidebarService: SidebarService // Create this service
  ) {}

  ngOnInit() {
    // Set sidebar active state
    this.sidebarService.setActiveItem('Complaints');
    
    // Get the department and tab from route parameters
    this.route.queryParams.subscribe(params => {
      if (params['department']) {
        this.selectedDepartment = params['department'];
      }
      if (params['tab']) {
        this.activeTab = params['tab'] as 'Active' | 'Resolved';
      }
    });
  }


  get filteredComplaints() {
    return this.allComplaints.filter(complaint => {
      const matchesDepartment = !this.selectedDepartment || 
        complaint.description.toLowerCase().includes(this.selectedDepartment.toLowerCase());
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
