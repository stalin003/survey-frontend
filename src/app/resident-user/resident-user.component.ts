import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resident-user',
  templateUrl: './resident-user.component.html',
  styleUrls: ['./resident-user.component.css']
})
export class ResidentUserComponent implements OnInit {

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
