import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-council-officer',
  templateUrl: './council-officer.component.html',
  styleUrls: ['./council-officer.component.css']
})
export class CouncilOfficerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logout(): void {

    if (confirm('sure want to logout?')) {
      localStorage.clear();
      window.location.reload();
    }

  }

}
