import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../user';
import { datePickerValidator } from './age.validator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../service.service';


// import { AgeValidator } from './age.validator';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  addUserForm!: FormGroup;
  userData: User[] = [];
  user = new User();
  hide = true;
  c_hide = true;
  showAge?: number ;
  submitted = false;

  matcher = new MyErrorStateMatcher();

  email = new FormControl('', [Validators.required, Validators.email]);
  dob = new FormControl('', [Validators.required]);



  getError() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getDobError(controlName: string) {

    return (formGroup: FormGroup) => {
      const age = formGroup.controls[controlName];
      var today = new Date();
      const current_year = today.getFullYear();
      const date = new Date(this.addUserForm.value.dob).toLocaleString('en-us', { year: 'numeric' });
      this.showAge = Math.abs(current_year) - Number(date);
      console.log(Math.abs(current_year) - Number(date));
      if (this.showAge < 13) {
        age.setErrors({ ageLimit: true });
      } else {
        age.setErrors(null);
      }
      console.log(this.showAge);
    }
  }



  constructor(private formBuilder: FormBuilder, 
              private _snackBar: MatSnackBar, 
              private router: Router,
              private service: DataService) {

  }

  ngOnInit(): void {

    // const promise = new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve("Promise, Its working fine....");
    //   }, 3000)
    // });

    // promise.then((result) => {
    //   console.log(result);
      
    // });

    // const observable = new Observable((observer) => {
    //   let couter = 0;
    //   setInterval(()=>{
    //     couter = couter + 1;
    //     observer.next(couter)
    //     // observer.next("Observable, Its Working fine...")
    //   },1000)
    // })

    // observable.subscribe((result) => {
    //   console.log("observable "+result);
    // })

    
   
    var today: string | null = new DatePipe("en-US").transform(new Date(), "yyyy-MM-dd");
    this.addUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      dob: ['', Validators.required ],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', Validators.required]
    }, {
      validator: [this.MustMatch('password', 'cpassword'), this.ageCalculator('dob')]
    })
   
  }

 

  get f() { return this.addUserForm.controls; }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];


      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  ageCalculator(controlName:string){
    return (formGroup: FormGroup) => {
      const age = formGroup.controls[controlName];
      console.log("check here age",age);
      
        const convertAge = new Date(age.value);
        console.log("ConvertAge..", convertAge);
        
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      
        if (this.showAge < 13) {
          age.setErrors({ ageLimit: true });
      } else {
          age.setErrors(null);
      }
      console.log(this.showAge);
  }
  }

  saveUser(data) {
    
    console.log(this.addUserForm.value.dob);
    if(this.addUserForm.valid){
      this.submitted = true;
      // this.service.addData(data).subscribe((data)=>{
      //   return data;
      // });      
        this._snackBar.open('Register Successfully', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
        this.router.navigate(['/login']);
        this.submitted = false;
      this.addUserForm.reset();
    }else{
      console.log("eror");
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addUserForm.value, null, 4));
  }

}
