import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpitServiceService } from '../../upit-service.service';
import { FaqServicesService } from '../../faq-services.service';
import { ServicesService } from '../../services.service';
import { Pitanje } from '../../pitanje';
import { Apart } from '../../apart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  upitForm: FormGroup = new FormGroup({});

  faq: Pitanje[] = [];
  apartmani: Apart[] = [];
  active = 'active';

  constructor(
    private forma: FormBuilder,
    private upitService: UpitServiceService,
    private faqService: FaqServicesService,
    private apartmentService: ServicesService
  ) {
    this.upitForm = forma.group({
      ime: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      brojOdraslih: ['', [Validators.required]],
      brojDjece: ['', [Validators.required]],
      datumOd: ['', [Validators.required]],
      datumDo: ['', [Validators.required]],
      imeApartmana: ['', [Validators.required]],
      brojTel: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getAllFaq();
    this.getAllApartments();
  }

  onSubmit() {
    if (this.upitForm.valid) {
      this.upitService.addUpit(this.upitForm.value);
      console.log(this.upitForm.value);
      window.alert(
        'Vas upit je Uspjesno Proslijedjen. Odgovor ce te dobiti u roku od jedno dana'
      );
      this.upitForm.reset();
    } else {
      window.alert(
        'Pogresan Upit. Molimo Vas popunite pravilo trazena polja. Hvala!'
      );
    }
  }

  getAllFaq() {
    this.faqService
      .getAllFaq()
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          this.faq = [];
          data.forEach((pit) => {
            let pitanje = pit.payload.toJSON() as Pitanje;
            (pitanje.id = pit.key || ''), this.faq.push(pitanje);
          });
        },
      });
  }
  getAllApartments() {
    this.apartmentService
      .getAll()
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          this.apartmani = [];
          data.forEach((apart) => {
            let apartman = apart.payload.toJSON() as Apart;
            this.apartmani.push(apartman);
          });
        },
      });
  }
  showOdgovor(index: number) {
    document.querySelector(`#collapseOne${index}`)?.classList.toggle('show');
  }
}
