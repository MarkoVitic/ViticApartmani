import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from '../../services.service';
import { Apart } from '../../apart';
import { ActivatedRoute, Router } from '@angular/router';
import { snapshotChanges } from '@angular/fire/compat/database';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css',
})
export class AdminFormComponent implements OnInit {
  apartmanForm: FormGroup = new FormGroup({});
  apartmanId = '';

  constructor(
    private formBuidelr: FormBuilder,
    private apartmanService: ServicesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.apartmanForm = this.formBuidelr.group({
      naziv: ['', [Validators.required]],
      tip: ['', [Validators.required]],
      max: ['', [Validators.required]],
      sprat: ['', [Validators.required]],
      cijena: ['', [Validators.required]],
      opis: ['', [Validators.required]],
      img_url: ['', [Validators.required]],
    });

    this.activeRoute.params.subscribe({
      next: (params) => {
        this.apartmanId = params['id'];

        this.getApartmani(this.apartmanId);
      },
    });
  }

  onSubmit() {
    if (this.apartmanId !== undefined) {
      this.apartmanService.updateap(this.apartmanId, this.apartmanForm.value);
    } else {
      console.log(this.apartmanForm.value);
      this.apartmanService.addAp(this.apartmanForm.value);
    }

    this.apartmanForm.reset();
    this.router.navigate(['/list']);
  }
  getApartmani(key: string) {
    this.apartmanService
      .getOne(key)
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          let apartman = data.payload.toJSON() as Apart;
          this.apartmanForm.setValue(apartman);
        },
      });
  }
}
