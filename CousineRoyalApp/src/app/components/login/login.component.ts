import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    userName: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required)
  })

  constructor(private formBuilder: FormBuilder, private AccountService: AccountService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("logging in");
    let result = this.AccountService.login(this.loginForm.controls['userName'].value, 
                this.loginForm.controls['Password'].value);
   console.log("result: ", result);
    } 
  }


