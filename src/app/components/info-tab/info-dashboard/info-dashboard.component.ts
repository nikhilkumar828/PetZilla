import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-dashboard',
  templateUrl: './info-dashboard.component.html',
  styleUrls: ['./info-dashboard.component.css']
})
export class InfoDashboardComponent implements OnInit {
  loading:boolean = true
  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.loading = false
    },2000)
  }

}
