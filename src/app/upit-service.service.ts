import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Upit } from './upit';

@Injectable({
  providedIn: 'root',
})
export class UpitServiceService {
  dbPath: string = '/upiti';
  upit: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.upit = db.list(this.dbPath);
  }

  getAllUpit() {
    return this.upit;
  }
  getUpit(id: string) {
    return this.db.object(`${this.dbPath}/${id}`);
  }

  addUpit(upit: Upit) {
    this.upit.push(upit);
  }

  deliteUpit(id: string) {
    this.upit.remove(id);
  }
}
