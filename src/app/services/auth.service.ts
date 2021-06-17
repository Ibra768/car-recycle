import { Injectable } from '@angular/core';
import firebase from "firebase";


@Injectable()
export class AuthService {

  constructor() {
  }
  createNewUser(nickname: string, email: string, password: string) {
    return new Promise(
      (resolve, reject) => {

        firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {

          const user = firebase.auth().currentUser;
          // @ts-ignore
            user.updateProfile({
              displayName: nickname,
            });

            resolve(true);

          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
          console.log(cred.user);
            resolve(cred);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }

}
