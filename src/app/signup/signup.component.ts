import {Component, ContentChild, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ConfirmedValidator} from '../confirmed.validator';
import {computeStartOfLinePositions} from '@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: any = FormGroup;
  submitted = false;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
        mobileNumber: ['', Validators.required],
        // userName: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required, Validators.minLength(6)],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword')
      });
  }

  ngOnInit(): void {
  }

  get f() {
    return this.registerForm.controls;
  }

  // Accepting only numbers in input field

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
  //7989577541
  onSubmit(): void {
    this.submitted = true;
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      this.http.post('http://localhost:3000/signupUsers', this.registerForm.value).subscribe(res => {
        alert('Signup Successfully');
        console.log(res);
        this.registerForm.reset();
        this.router.navigate(['login']);
      }, error => {
        alert('Something went Wrong');
      });
    }else {
      return;
    }
    // this.http.post('http://localhost:3000/signupUsers', this.registerForm.value).subscribe(res => {
    //   alert('Signup Successfully');
    //   this.registerForm.reset();
    //   this.router.navigate(['login']);
    // }, error => {
    //   alert('Something went Wrong');
    // });
    console.log(this.registerForm.value);
    //   this.submitted = true;
    //   if (this.registerForm.invalid) {
    //     return;
    //   }
    //   this.router.navigate(['login']);
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }

  // routingToLogin(): void{
  //   this.router.navigate(['login']);
  // }
  onCancel(): void {
    this.router.navigate(['login']);
  }

  toggleShowPassword(): void {
    if (this.showPassword) {
      // @ts-ignore
      document.getElementById('password').setAttribute('type', 'password');
      this.showPassword = false;

    } else {
      // @ts-ignore
      document.getElementById('password').setAttribute('type', 'text');
      this.showPassword = true;
    }
  }
}
