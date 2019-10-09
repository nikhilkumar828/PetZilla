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

  constructor(private auth: AuthenticationService, private router: Router , private formBuilder: FormBuilder ) {}

  ngOnInit() {
  }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/ourmedia');
    }, (err) => {
      alert(err.error.message);
      console.error(err);
    });
  }
}
