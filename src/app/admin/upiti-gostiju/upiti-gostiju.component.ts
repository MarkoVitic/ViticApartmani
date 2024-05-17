import { Component, OnInit } from '@angular/core';
import { UpitServiceService } from '../../upit-service.service';
import { Upit } from '../../upit';

@Component({
  selector: 'app-upiti-gostiju',
  templateUrl: './upiti-gostiju.component.html',
  styleUrl: './upiti-gostiju.component.css',
})
export class UpitiGostijuComponent implements OnInit {
  upitiGostiju: Upit[] = [];

  constructor(private upitiService: UpitServiceService) {}
  ngOnInit(): void {
    this.getAllUpiti();
  }

  getAllUpiti() {
    this.upitiService
      .getAllUpit()
      .snapshotChanges()
      .subscribe({
        next: (upiti) => {
          this.upitiGostiju = [];
          upiti.forEach((upitt) => {
            let upit = upitt.payload.toJSON() as Upit;
            upit.id = upitt.key || '';
            this.upitiGostiju.push(upit);
          });
        },
      });
  }
  delteUpit(id: string) {
    this.upitiService.deliteUpit(id);
  }
}
