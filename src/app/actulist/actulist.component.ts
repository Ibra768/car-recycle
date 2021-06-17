import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActusService} from "../services/actus.service";
import {Router} from "@angular/router";
import { Actu } from '../models/actu.model';
import firebase from "firebase";

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-actulist',
  templateUrl: './actulist.component.html',
  styleUrls: ['./actulist.component.scss']
})
export class ActuListComponent implements OnInit, OnDestroy {

  // @ts-ignore
  actus: Actu[];

  // @ts-ignore
  pageIsHome: boolean;

  // @ts-ignore
  actusSubscription: Subscription;

  constructor(private actusService: ActusService, private router: Router) {
    if(router.url === "/home"){
      this.pageIsHome = true;
    }
    else{
      this.pageIsHome = false;
    }
  }

  // @ts-ignore
  isAuth: boolean;


  ngOnInit() {

    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );

    this.actusSubscription = this.actusService.actusSubject.subscribe(
      (actus: Actu[]) => {
        this.actus = actus;
      }
    );
    this.actusService.getActus();
    this.actusService.emitActus();
  }

  onDeleteActu(actu: Actu) {
    this.actusService.removeActu(actu);
  }

  onViewActu(id: number) {
    this.router.navigate(['/actus', 'view', id]);
    return false;
  }

  onNewActu() {
    this.router.navigate(['/actus', 'new']);
  }

  ngOnDestroy() {
    this.actusSubscription.unsubscribe();
  }

}
