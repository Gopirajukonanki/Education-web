import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
// public logingForm: any = FormGroup;
  loginForm: any = FormGroup;
  submitted = false;
  showPassword = false;
  constructor(
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private  router: Router
              ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      mobileNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  login(): void{
    this.submitted = true;
    if (this.loginForm.invalid){
      return;
    }
    this.http.get('http://localhost:3000/signupUsers').subscribe(res => {
      // @ts-ignore
      const user = res.find((a: any) => {
        return a.mobileNumber === this.loginForm.value.mobileNumber && a.password === this.loginForm.value.password;
      });
      if (user){
        alert('Login Success');
        this.router.navigate(['home']);
      }else {
        alert('user not found! please signup');
      }
    }, error => {
      alert('something went wrong please signup');
    });
  }
  keyPressNumbers(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  routingToSignup(): void {
    this.router.navigate(['signup']);
  }

  toggleShowPassword(): void{
    if (this.showPassword){
      // @ts-ignore
      document.getElementById('password').setAttribute('type', 'password');
      this.showPassword = false;

    }else {
      // @ts-ignore
      document.getElementById('password').setAttribute('type', 'text');
      this.showPassword = true;
    }
  }
}
