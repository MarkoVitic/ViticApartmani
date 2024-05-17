import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { Apart } from '../../apart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css',
})
export class AdminListComponent implements OnInit {
  apartmani: Apart[] = [];
  constructor(
    private service: ServicesService,
    private router: Router,
    private LoginService: LoginService
  ) {}
  ngOnInit(): void {
    this.getAllApartments();
  }

  getAllApartments() {
    this.service
      .getAll()
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          this.apartmani = [];
          data.forEach((item) => {
            let apartman = item.payload.toJSON() as Apart;
            apartman.key = item.key || '';

            this.apartmani.push(apartman);
          });
        },
      });
  }

  removeApartman(id: string) {
    this.service.deleteAp(id);
  }
  logOut() {
    this.LoginService.logOut();
  }
  editApartman(id: string) {
    this.router.navigate(['form-update/' + id]);
  }
}
