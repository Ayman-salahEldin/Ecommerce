
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterEvent, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _AuthService =inject(AuthService)
  private readonly _FormBuilder =inject(FormBuilder)
  private readonly _Router =inject(Router)
  msgError:string=""
  isLoading:boolean=false
  msgSuc:boolean=false

  loginForm:FormGroup =this._FormBuilder.group({
   
    email:[null,[Validators.required,Validators.email]],
    
    password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
 
  },)


  // loginForm:FormGroup = new FormGroup({
  //   name :new FormControl(null,[Validators.required , Validators.minLength(3),Validators.maxLength(20)]),
  //   email :new FormControl(null,[Validators.required,Validators.email]),
  //   phone : new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  //   password : new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  //   rePassword : new FormControl(null)
    
  // },this.confirmPassword)

  submitFunc():void{
    console.log(this.loginForm);
    
  }
  
  loginSubmit():void{
    if(this.loginForm.valid)
    {
      this.isLoading=true
      this._AuthService.setloginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res) // tmam --> log in
          if(res.message='success'){
            this.msgSuc=true
            setTimeout(() => {
              localStorage.setItem('userToken',res.token)  //save tok
               this._AuthService.saveUserData()                                           //decode
              this._Router.navigate(['/home'])           //navgate to home
            }, 2000);
            
          }
          this.isLoading=false
        },
        error:(err:HttpErrorResponse)=>{
          this.msgError=err.error.message
          console.log(err)
          this.isLoading=false
        }
      })
      // console.log(this.loginForm)
    }
    else
    {
      this.loginForm.setErrors({mismatch:true})
      this.loginForm.markAllAsTouched()
    }
  }


}
