import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public user: boolean = false;
  constructor(private firelogin: AngularFireAuth, private router: Router) {}

  login(email: string, passwor: string) {
    this.firelogin
      .signInWithEmailAndPassword(email, passwor)
      .then(() => {
        this.router.navigate(['/list']);
        this.user = true;
      })
      .catch((error) => {
        alert('Wrog UserName and Password');
        console.log('wrong username or paswword');
      });
  }
  logOut() {
    this.firelogin
      .signOut()
      .then(() => {
        console.log('you are loged out');
        this.user = false;
        this.router.navigate(['/']);
        console.log(this.user);
      })
      .catch((error) => {
        console.log('You aye not loged out');
      });
  }

  UserStatus(): boolean {
    return this.user;
  }
}
