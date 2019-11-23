import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, AsyncSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<firebase.User>;

    constructor(
      private afAuth: AngularFireAuth
    ) { 
      this.user$ = this.afAuth.authState;
    }

    login() {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    logout() {
      return this.afAuth.auth.signOut();
    }
}
