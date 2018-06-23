import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class AuthProvider {

  constructor(
    private afAuth: AngularFireAuth
  ) {
  }

  //Create user
  register(data){
    let email = data.email;
    let pass = data.pass;
    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
  }

  //Login
  login(data){
    let email = data.email;
    let pass = data.pass;
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  }
}