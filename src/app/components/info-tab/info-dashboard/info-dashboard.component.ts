import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-info-dashboard',
  templateUrl: './info-dashboard.component.html',
  styleUrls: ['./info-dashboard.component.css']
})
export class InfoDashboardComponent implements OnInit {
  infoService = ["Pet Care Service","Pet Help Service","Pet Info Service","Pet Care Service","Pet Care Service"]
  loading:boolean = true
  @ViewChild('sidenav',{static:false}) sidenav : ElementRef
  @ViewChild('sidebar',{static:false}) sidebar : ElementRef
  @ViewChild('sideDiv',{static:false}) sidediv : ElementRef
  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.loading = false
    },2000)
  }

  onClick(){
    this.sidenav.nativeElement.style.display = "none"
  }

  onClose(){
    this.sidediv.nativeElement.attributes.class.value =  "col-md-3 col-xs-1 p-l-0 p-r-0 collapse in"
    this.sidenav.nativeElement.style.display = "inline"
  }
}
