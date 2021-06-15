import { Injectable } from '@angular/core';
import firebase from "firebase";


@Injectable()
export class AuthService {

  createNewUser(nickname: string, email: string, password: string) {
    return new Promise(
      (resolve, reject) => {

        firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
          const db = firebase.firestore();
          // @ts-ignore
            db.collection("Users").doc(cred.user.uid).set({
              nickname: nickname
            }).then(() =>{

            })
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
    firebase.auth().signOut().then(function(){

    })
  }

}
