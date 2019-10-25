import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  userId: string;
  code: string;

  constructor(private activatedRoute: ActivatedRoute , private authService: AuthenticationService , private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.userId && params.code) {
        this.userId = params.userId;
        this.code = params.code;
        this.verifyMail(this.userId, this.code);
      } else {
        alert('Please contact administrator.');
      }
    });
  }

  verifyMail(userId: string , code: string) {
    const verifyObj = {
      userMail : userId,
      code,
    };

    this.authService.confirmMail(verifyObj).subscribe((obj) => {
      console.log(obj);
      this.router.navigateByUrl('/login');
    }, (err) => {
      console.error(err);
    });
  }

}
