import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { ErrorDailogComponent } from 'app/layout-store/dialog/error-dailog/error-dailog.component';
import { SaveDailogComponent } from 'app/layout-store/dialog/save-dailog/save-dailog.component';
import { AdminService } from '../../services/admin.service';
import { Observable } from 'rxjs';
import { CommonService } from 'app/service/common.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

    @ViewChild('actionTpl', { static: true }) actionTpl!: TemplateRef<any>;
    @ViewChild('addressInput', { static: false }) addressInput!: ElementRef;
  
    selectedTabIndex = 0;
    searchText = '';
    statusFilter = '';
    list: any[] = [];
    filteredList: any[] = [];
    columns: MtxGridColumn[] = [];
  
    hidePassword = true;
    hideConfirmPassword = true;
  
    // track whether we're editing an existing row (optional)
    editingIndex: number | null = null;
    isEditing = false;

    UserForm!: FormGroup;
    selectedUserId: number | null = null;


  constructor(private fb: FormBuilder,private dialog:MatDialog,
    private adminservice:AdminService,private commonservice:CommonService,
  ) {

    this.UserForm = this.fb.group({
      userId: [{ value: '', disabled: true }], // readonly
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      gymId:['',[Validators.required]],
      phone: [''],
      gender: [''],
      dob: [''],
      role: ['', Validators.required],
      line1: [''],
      city: [''],
      district: [''],
      state: [''],
      country: [''],
      zip: [''],
      photo:[''],
      IsStatus:['Active']
    });
  }


  

loading=false
  onUserSubmit(): void {
  if (this.UserForm.invalid) return;

  this.loading = true; // show spinner

  const formData = { ...this.UserForm.value };

  let request$: Observable<any>;
  let successMessage = '';

  if (this.isEditing && this.selectedUserId) {
    
    // Update existing user
    request$ = this.adminservice.updateUser({
      id: this.selectedUserId,
      obj: formData
    });
    successMessage = 'User updated successfully';
  } else {
    // Create new user
    request$ = this.adminservice.createUser(formData);
    successMessage = 'User created successfully';
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
        this.UserDetailsTabDisabled = true;
        this.GetUserList(); // refresh user list
      });
    },
    error: (err) => {
      this.loading = false;
      const errorMsg = this.isEditing
        ? 'Failed to update User'
        : 'Failed to create User';
      this.openErrorDialog(errorMsg);
      console.error(err);
    }
  });
}


Gymlist:any
GetGymList(): void {
        this.adminservice.getGymList().subscribe({
          next: (res: any) => {
            console.log(res,'==Gymlist');
            
            this.Gymlist = res;
          },
          error: () => this.openErrorDialog('Failed to fetch Gym List'),
        });
      }


 GetUserList(): void {
        this.adminservice.getUserList().subscribe({
          next: (res: any) => {
            console.log(res,'==userlist');
            
            this.list = res;
            this.filteredList = [...res];
          },
          error: () => this.openErrorDialog('Failed to fetch User List'),
        });
      }

 resetForm(): void {
        this.UserForm.reset({ status: 'Active' });
        this.selectedUserId = null;
        this.isEditing = false;
      }
    
      onEdit(user: any): void {
        this.UserDetailsTabDisabled = false; // enable
        this.UserForm.patchValue(user);
        this.UserForm.patchValue({gymId:user.gymId?._id});
        this.selectedUserId = user.userId;
        this.isEditing = true;
        this.selectedTabIndex = 1;
      }

   openSuccessDialog(message: string): void {
        this.dialog.open(SaveDailogComponent, { width: '400px', data: { message } });
      }
    
      openErrorDialog(message: string): void {
        this.dialog.open(ErrorDailogComponent, { width: '400px', data: { message } });
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

      this.UserForm.patchValue({
        photo: base64String
      });

      this.UserForm.get('photo')?.markAsDirty();
    };
  };

  reader.readAsDataURL(file);
}

    

  getErrorMessage(): string {
    if (this.UserForm.get('email')?.hasError('required')) {
      return 'Email is required';
    }
    return this.UserForm.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }
  
    ngOnInit(): void {

      this.GetGymList()
      this.GetUserList()
      this.GetIndianStateDistList()
      

  
   this.columns = [
  {
  header: 'Photo',
  field: 'photo',
  width: '80px',
  formatter: (rowData: any) => {
    const photoSrc = rowData.photo || 'images/teckfuel_usericon.png';
    return `<img 
              src="${photoSrc}" 
              width="50" 
              height="50" 
              style="border-radius: 50%; object-fit: cover; display: block;" 
              alt="User photo" />`;
  }
},
  { header: 'User ID', field: 'playerid', sortable: true },
  { header: 'Name', field: 'name', sortable: true },
  { 
    header: 'Gym Name', 
    field: 'gymName', 
    sortable: true,
    formatter: (rowData) => rowData.gymId?.name || '-' 
  },
  { header: 'Email', field: 'email', sortable: true },
  { header: 'Phone', field: 'phone', sortable: true },
  { header: 'Role', field: 'role', sortable: true },
  { header: 'Status', field: 'IsStatus', sortable: true },
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

  
    }
  
   

  
    
    GymSelect=''
  
    applyFilters() {
      const search = this.searchText.toLowerCase().trim();
      const status = this.statusFilter;
      const GymSelect = this.GymSelect;      
  
      this.filteredList = this.list.filter(item => {
        const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
        const matchesSearch = !search || fullName.includes(search) || item.email.toLowerCase().includes(search);
        const matchesStatus = !status || item.status === status;
        const matchesGym = !GymSelect || item.gymId?._id === GymSelect;
        return matchesSearch && matchesStatus && matchesGym
      });
    }
  
    UserDetailsTabDisabled=true
    addUser() {
      this.selectedTabIndex = 1;
       this.UserDetailsTabDisabled = false; // enable
    }

      
  
  
  
  
    
  
    onRowDoubleClick(rowData: any) {
      this.onEdit(rowData);
    }
  
  
    passwordMatchValidator(form: FormGroup) {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirm_password')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    }
  

    onRowClick(event: any) {
      if (event?.event?.detail === 2) {
        this.onEdit(event.rowData);
      }
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
  
        filteredDistricts: string[] = [];
    filtredCities:any[]=[]
onStateChange(selectedState: string) {
  const state = this.IndianStateDistList.find((s:any) => s.state === selectedState);
  this.filteredDistricts = state ? state.districts : [];

}
}
