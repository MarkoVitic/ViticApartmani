import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Apart } from './apart';
import { Pitanje } from './pitanje';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private dbPath = '/apartmani';

  apartmaniRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.apartmaniRef = db.list(this.dbPath);
  }

  getAll() {
    return this.apartmaniRef;
  }

  getOne(key: string) {
    return this.db.object(`${this.dbPath}/${key}`);
  }

  addAp(apart: Apart) {
    this.apartmaniRef.push(apart);
  }

  updateap(key: string, ap: Apart) {
    this.apartmaniRef.update(key, ap);
  }
  deleteAp(key: string) {
    this.apartmaniRef.remove(key);
  }
}
