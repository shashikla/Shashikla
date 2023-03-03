import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs';

import { DataService } from '../service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  hide = true;



  constructor(private service: DataService) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }

  loginUser(data) {
    console.log("hello", data);
    this.service.loginUser(data)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log(data);
        },
        error : err => {
          console.log(err);
        }
      })
  }

}
