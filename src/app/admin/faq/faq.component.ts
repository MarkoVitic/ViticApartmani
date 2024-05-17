import { Pitanje } from './../../pitanje';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaqServicesService } from '../../faq-services.service';
import { LoginService } from '../login.service';
import { subscribe } from 'diagnostics_channel';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { right } from '@popperjs/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent implements OnInit {
  faqForm: FormGroup = new FormGroup({});
  pitanjaIodgovori: Pitanje[] = [];
  pitanjeID = '';

  constructor(
    private form: FormBuilder,
    private faqService: FaqServicesService,
    private LoginService: LoginService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.faqForm = form.group({
      pitanje: ['', [Validators.required]],
      odgovor: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe({
      next: (data) => {
        this.pitanjeID = data['id'];
        if (this.pitanjeID) {
          this.getOne(this.pitanjeID);
        }
      },
    });
    this.getAll();
  }

  getAll() {
    this.faqService
      .getAllFaq()
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          this.pitanjaIodgovori = [];
          data.forEach((dataa) => {
            let nesto = dataa.payload.toJSON() as Pitanje;
            nesto.id = dataa.key || '';
            this.pitanjaIodgovori.push(nesto);
          });
        },
      });
  }

  onSubmit() {
    if (this.pitanjeID !== undefined) {
      this.faqService.updateFaq(this.pitanjeID, this.faqForm.value);
    } else {
      this.faqService.addFaq(this.faqForm.value);
    }

    this.router.navigate(['/faq']);
    this.faqForm.reset();
  }
  logOut() {
    this.LoginService.logOut();
  }
  delite(id: string) {
    window.alert(`Usmjesno ste izbrisali pitanje i odgovor`);
    this.faqService.delite(id);
  }

  getOne(id: string) {
    this.router.navigate([`faq/${id}`]);
    this.faqService
      .getOneFaq(id)
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          let pitanjeiodg = data.payload.toJSON() as Pitanje;
          this.faqForm.setValue(pitanjeiodg);
        },
      });
  }
}
