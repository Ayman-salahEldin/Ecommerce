import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _AuthService =inject(AuthService)
  private readonly _FormBuilder =inject(FormBuilder)
  private readonly _Router =inject(Router)
  msgError:string=""
  isLoading:boolean=false
  msgSuc:boolean=false
  registerSub!:Subscription     // to do unsubscibe on destroy

  registerForm:FormGroup =this._FormBuilder.group({
    name:[null,[Validators.required , Validators.minLength(3),Validators.maxLength(20)]],
    email:[null,[Validators.required,Validators.email]],
    phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
    rePassword:[null],
  },{Validators:this.confirmPassword})


  // registerForm:FormGroup = new FormGroup({
  //   name :new FormControl(null,[Validators.required , Validators.minLength(3),Validators.maxLength(20)]),
  //   email :new FormControl(null,[Validators.required,Validators.email]),
  //   phone : new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  //   password : new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  //   rePassword : new FormControl(null)
    
  // },this.confirmPassword)

  submitFunc():void{
    console.log(this.registerForm);
    
  }

  confirmPassword(g:AbstractControl){   // function confirm password
    if(g.get("password")?.value === g.get("rePassword")?.value)  
      {
        return null
      }  
      else{
        return {mismatch:true}
      }
  }

  registerSubmit():void{
    if(this.registerForm.valid)
    {
      this.isLoading=true
     this.registerSub =  this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res) // tmam --> log in
          if(res.message='success'){
            this.msgSuc=true
            setTimeout(() => {
              this._Router.navigate(['/login'])
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
      // console.log(this.registerForm)
    }
    else
    {
      this.registerForm.setErrors({mismatch:true})
      this.registerForm.markAllAsTouched()
    }
  }
  ngOnDestroy(): void {
    this.registerSub?.unsubscribe()
    
  }

}
