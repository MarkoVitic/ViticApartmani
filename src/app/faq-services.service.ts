import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';
import { Pitanje } from './pitanje';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FaqServicesService {
  private dbPath = '/pitanja';

  pitanjeOdgovor: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.pitanjeOdgovor = db.list(this.dbPath);
  }

  getAllFaq() {
    return this.pitanjeOdgovor;
  }

  getOneFaq(id: string) {
    return this.db.object(`${this.dbPath}/${id}`);
  }

  addFaq(pitanje: Pitanje) {
    this.pitanjeOdgovor.push(pitanje);
  }

  updateFaq(id: string, faq: Pitanje) {
    return this.pitanjeOdgovor.update(id, faq);
  }
  delite(id: string) {
    return this.pitanjeOdgovor.remove(id);
  }
}
