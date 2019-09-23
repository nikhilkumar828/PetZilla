import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { TokenPayload } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  model: any = {};
  
  constructor(private auth: AuthenticationService, private router: Router ,private formBuilder: FormBuilder ) {}

  ngOnInit() {
  }
  
  onLogin() {
    console.log(this.model);
    const userName = this.model.userName;
    // const password = Md5.hashStr(this.model.password);
    const password = this.model.password;
    // this.router.navigate(['body', 'cnn']);
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

  signUp() {
    
  }
}