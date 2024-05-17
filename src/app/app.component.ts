import { Component, OnInit } from '@angular/core';
import { LoginService } from './admin/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public userStatus: boolean = false;
  constructor(private loginservice: LoginService) {}
  ngOnInit(): void {}

  status(): boolean {
    return (this.userStatus = this.loginservice.UserStatus());
  }
}
