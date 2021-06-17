import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Actu} from '../models/actu.model';
import firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;
import {Data} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ActusService {

  constructor() {
    this.getActus();
  }

  actus: Actu[] = [];

  actusSubject = new Subject<Actu[]>();

  emitActus(){
    this.actusSubject.next(this.actus);
  }

  saveActus() {
    firebase.database().ref('/actus').set(this.actus);
  }

  getActus(){
    firebase.database().ref("/actus")
      .on("value", (data: DataSnapshot) => {
        this.actus = data.val() ? data.val() : [];
        this.emitActus();
      });
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

}
