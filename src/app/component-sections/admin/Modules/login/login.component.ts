import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorDailogComponent } from 'app/layout-store/dialog/error-dailog/error-dailog.component';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'app/service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  constructor( private fb:FormBuilder,private router:Router,private tokenservice:TokenService,
   private adminservice:AdminService,private dailog:MatDialog){
  
      
      const rememberName= localStorage.getItem('adminUsername')
      this.toggleSide=localStorage.getItem('AdminRememberMe')
    this.loginForm = this.fb.group({
      username: [rememberName, [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe:[this.toggleSide=='true'?true:false]
  
    });
    }
  
    toggleSide:string | null =''
    isSubmitting = false;
  
    loginForm:FormGroup
  
  
    get email() {
      return this.loginForm.get('username')!;
    }
  
    get password() {
      return this.loginForm.get('password')!;
    }
  
    get rememberMe() {
      return this.loginForm.get('rememberMe')!;
    }
  
  
    submitLogin(){
  
      this.isSubmitting = true;
  
      if(this.loginForm.valid){
  
  
      this.adminservice.AdminLogin(this.loginForm.value).subscribe((res:any)=>{
        console.log(res,'==login response');
  
        this.tokenservice.SetAdminToken(res.token)
        this.tokenservice.SetRole(res.Role)

  
            if(this.loginForm.get('rememberMe')?.value)
                {
                  localStorage.setItem('AdminRememberMe',this.loginForm.get('rememberMe')?.value)
                  localStorage.setItem('adminUsername',this.loginForm.get('username')?.value)
                }
                else
                {
                  localStorage.setItem('AdminRememberMe',this.loginForm.get('rememberMe')?.value)
                  localStorage.setItem('adminUsername','') 
                }
               this.isSubmitting = false;
  
                 this.router.navigateByUrl('admin/dashboard');
        
      },(err:any)=>{
        console.log(err.error.message,'=error');
  
        this.dailog.open(ErrorDailogComponent, {
      width: '350px',
      data: {
        message:err.error?.message|| "Server connection failed"
      }
  
      });
        this.isSubmitting = false;
    })
  
    }else{
      this.isSubmitting = false;
  
      this.loginForm.markAllAsTouched();
      return;
  
    }
  
    }
  
}
