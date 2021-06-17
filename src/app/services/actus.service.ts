import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Actu} from '../models/actu.model';
import firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class ActusService {

  constructor() {
    //this.getActus();
  }

  actus: Actu[] = [];

  actusSubject = new Subject<Actu[]>();

  emitActus(){
    this.actusSubject.next(this.actus);
  }

  saveActus() {
    console.log(this.actus);
    firebase.database().ref('/actus').set(this.actus);
  }

  getActus(pageIsHome: boolean){

    if(pageIsHome === true){

      firebase.database().ref().child("/actus").limitToFirst(3)
        .on("value", (data: DataSnapshot) => {
          this.actus = data.val() ? data.val() : [];
          this.emitActus();
        });

    }
    else{
      firebase.database().ref("/actus")
        .on("value", (data: DataSnapshot) => {
          this.actus = data.val() ? data.val() : [];
          this.emitActus();
        });
    }

  }

  getSingleActu(id: number){

    return new Promise(
      (resolve,reject) => {
        firebase.database().ref("/actus/" + id).once("value").then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }
        );
      }
    );
  }

  createNewActu(newActu : Actu){
    this.actus.push(newActu);
    this.saveActus();
    this.emitActus();
  }

  removeActu(actu : Actu){

    if(actu.photo) {
      const storageRef = firebase.storage().refFromURL(actu.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }

    const actuIndexToRemove = this.actus.findIndex(
      (actuEl) => {
        if(actuEl === actu) {
          return true;
        }
        else{
          return;
        }
      }
    );
    this.actus.splice(actuIndexToRemove, 1);
    this.saveActus();
    this.emitActus();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

}
