import { Security } from './../../../utils/security.utils';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor() { }

  public user: User;

  ngOnInit(): void {
    this.user = Security.getUser();
    console.log(this.user);
  }

  logout() {
    Security.clear();
  }

}
