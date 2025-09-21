import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { ErrorDailogComponent } from 'app/layout-store/dialog/error-dailog/error-dailog.component';
import { SaveDailogComponent } from 'app/layout-store/dialog/save-dailog/save-dailog.component';
import { AdminService } from '../../services/admin.service';
import { Observable } from 'rxjs';
import { CommonService } from 'app/service/common.service';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrl: './gym.component.scss'
})
export class GymComponent {

   @ViewChild('addressInput') addressInput!: ElementRef;
  
    selectedTabIndex = 0;
    GymDetailsTabDisabled = true; // controls tab enable/disable
  
    list: any[] = [];
    filteredList: any[] = [];
  
    searchText: string = '';
    statusFilter: string = '';
  
    reactiveForm1: FormGroup;
  
    hidePassword = true;
    hideConfirmPassword = true;
  
    selectedGymId: number | null = null;
    isEditing = false;
  
 columns: MtxGridColumn[] = [
  {
  header: 'Logo',
  field: 'logo',
  width: '80px',
  formatter: (rowData: any) => {
    const photoSrc = rowData.logo || 'images/teckfuel_usericon.png';
    return `<img 
              src="${photoSrc}" 
              width="50" 
              height="50" 
              style="border-radius: 50%; object-fit: cover; display: block;" 
              alt="Gym Logo" />`;
  }
},
  { header: 'Gym ID', field: 'gymId', sortable: true },
  { header: 'Gym Name', field: 'name', sortable: true },
  { header: 'Owner Email', field: 'ownerEmail', sortable: true },
  { header: 'Phone', field: 'phone', sortable: true },
  { header: 'Subscription Status', field: 'subscriptionStatus', sortable: true },
  {
    header: 'Subscription Period',
    field: 'subscriptionStartDate',
    sortable: true,
    formatter: (rowData: any) =>
      `${rowData.subscriptionStartDate ? new Date(rowData.subscriptionStartDate).toLocaleDateString() : ''} 
       - 
       ${rowData.subscriptionEndDate ? new Date(rowData.subscriptionEndDate).toLocaleDateString() : ''}`
  },
  {
    header: 'Trial',
    field: 'isTrial',
    sortable: true,
    formatter: (rowData: any) => rowData.isTrial ? 'Yes' : 'No'
  },
 {
  header: 'Address',
  field: 'line1',
  sortable: false,
  formatter: (rowData: any) => rowData.line1 || ''
},
  {
    header: 'Actions',
    field: 'actions',
    width: '120px',
    pinned: 'right',
    type: 'button',
    buttons: [
      {
        icon: 'edit',
        tooltip: 'Edit',
        type: 'icon',
        click: (record: any) => this.onEdit(record),
      }
    ]
  }
];

    constructor(
      private fb: FormBuilder,
      private adminservice: AdminService,
      private commonservice: CommonService,
      private dialog: MatDialog,
    ) {
         this.reactiveForm1 = this.fb.group({
      gymId: [''],
      name: ['', Validators.required],
      ownerEmail: ['', [Validators.required, Validators.email]],
      subscriptionStatus: ['active', Validators.required],
      subscriptionStartDate: ['', Validators.required],
      subscriptionEndDate: ['', Validators.required],
      isTrial: [false],
      phone: ['', [Validators.pattern(/^\+?[0-9\s-]+$/)]],
      website: ['', [Validators.pattern(/^https?:\/\/.+/)]],
      logo: [''],
      // Address fields
      line1: [''],
      city: [''],
      district: [''],
      state: [''],
      country: ['India'],
      zip: ['']
    });
    }

  onSubmitGymform() {
    if (this.reactiveForm1.valid) {
      // TODO: API call
    }
  }
  
    ngOnInit(): void {

    this.reactiveForm1.get('subscriptionStatus')?.valueChanges.subscribe(value => {
        this.reactiveForm1.patchValue({ isTrial: value === 'trial' });
    });

      this.GetGymList()
      this.GetIndianCitiesList()
      this.GetIndianStateDistList()
    }
  



onLogoSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) {
    return;
  }

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const img = new Image();
    img.src = e.target.result;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      // ✅ Resize image if too large (optional)
      const maxWidth = 800;   // adjust as needed
      const maxHeight = 800;  // adjust as needed
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height *= maxWidth / width;
          width = maxWidth;
        } else {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // ✅ Convert to compressed base64 (JPEG, quality 0.7)
      let base64String = canvas.toDataURL('image/jpeg', 0.7);

      // Ensure it's within 1 MB (retry with lower quality if needed)
      let quality = 0.7;
      while (base64String.length / 1024 > 1024 && quality > 0.2) {
        quality -= 0.1;
        base64String = canvas.toDataURL('image/jpeg', quality);
      }

      this.reactiveForm1.patchValue({
        logo: base64String
      });

      this.reactiveForm1.get('logo')?.markAsDirty();
    };
  };

  reader.readAsDataURL(file);
}


    // Handle tab change
    onTabChange(index: number): void {
      this.selectedTabIndex = index;
  
      // If switched to Client List tab (index 0) -> disable details tab
      if (index === 0) {
        this.GymDetailsTabDisabled = true;
      }
    }
  


    loading = false; 
  onSubmit(): void {
  if (this.reactiveForm1.invalid) return;

  this.loading = true; // show spinner

  const formData = { ...this.reactiveForm1.value };

  let request$: Observable<any>;
  let successMessage = '';

  if (this.isEditing && this.selectedGymId) {
    // Ensure ID is sent to backend for update
    request$ = this.adminservice.updateGym({
      id: this.selectedGymId,
      obj:formData
    });
    successMessage = 'Gym updated successfully';
  } else {
    request$ = this.adminservice.createGym(formData);
    successMessage = 'Gym created successfully';
  }

  request$.subscribe({
    next: () => {
      this.loading = false;
      this.resetForm();
      const dialogRef = this.dialog.open(SaveDailogComponent, {
        width: '400px',
        data: { message: successMessage }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.selectedTabIndex = 0;
        this.GymDetailsTabDisabled = true;
        this.GetGymList()
      });
    },
    error: (err) => {
      this.loading = false;
      const errorMsg = this.isEditing
        ? 'Failed to update Gym'
        : 'Failed to create Gym';
      this.openErrorDialog(errorMsg);
      console.error(err);
    }
  });
}

    
      resetForm(): void {
        this.reactiveForm1.reset({ status: 'Active' });
        this.selectedGymId = null;
        this.isEditing = false;
      }
    
      onEdit(gym: any): void {
        this.GymDetailsTabDisabled = false; // enable
        this.reactiveForm1.patchValue(gym);
        this.selectedGymId = gym.gymId;
        this.isEditing = true;
        this.selectedTabIndex = 1;
      }
    
      onRowClick(event: any) {
        if (event?.event?.detail === 2) {
          const rowData = event?.row || event?.data;
          if (rowData) this.onEdit(rowData);
        }
      }
    
      openSuccessDialog(message: string): void {
        this.dialog.open(SaveDailogComponent, { width: '400px', data: { message } });
      }
    
      openErrorDialog(message: string): void {
        this.dialog.open(ErrorDailogComponent, { width: '400px', data: { message } });
      }
    
      applyFilters(): void {
        this.filteredList = this.list.filter((item) => {
          const fullName = `${item.first_name || ''} ${item.last_name || ''}`.toLowerCase();
          const matchesSearch = this.searchText
            ? fullName.includes(this.searchText.toLowerCase()) ||
              item.email.toLowerCase().includes(this.searchText.toLowerCase())
            : true;
          const matchesStatus = this.statusFilter ? item.status === this.statusFilter : true;
          return matchesSearch && matchesStatus;
        });
      }
    
      getErrorMessage(): string {
        const emailControl = this.reactiveForm1.get('email');
        if (emailControl?.hasError('required')) return 'Email is required';
        if (emailControl?.hasError('email')) return 'Invalid email';
        return '';
      }
    
      GetGymList(): void {
        this.adminservice.getGymList().subscribe({
          next: (res: any) => {
            console.log(res,'==Gymlist');
            
            this.list = res;
            this.filteredList = [...res];
          },
          error: () => this.openErrorDialog('Failed to fetch Gym List'),
        });
      }

      IndianCitiesList:any
      IndianStateDistList:any
       GetIndianCitiesList(): void {
        this.commonservice.getIndianCitiesList().subscribe({
          next: (res: any) => {            
            this.IndianCitiesList = res;
          },
          error: (err) => console.log(err.error),
        });
      }

       GetIndianStateDistList(): void {
        this.commonservice.getIndianStatesDistList().subscribe({
          next: (res: any) => {
            
            this.IndianStateDistList = res;
          },
          error: (err) => console.log(err.error),
          
        });
      }
  
      addGym(): void {
        this.GymDetailsTabDisabled = false; // enable
        this.selectedTabIndex = 1;
      }
    
    

    filteredDistricts: string[] = [];
    filtredCities:any[]=[]
onStateChange(selectedState: string) {
  const state = this.IndianStateDistList.find((s:any) => s.state === selectedState);
  this.filteredDistricts = state ? state.districts : [];

}
  

}
