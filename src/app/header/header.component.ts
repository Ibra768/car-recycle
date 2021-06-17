import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import firebase from "firebase";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // @ts-ignore
  isAuth: boolean;

  constructor(private authService: AuthService, private router: Router) { }

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
  }

  onSignOut() {
    this.authService.signOutUser();
    // @ts-ignore
    localStorage.removeItem('admin');
  }

  onNewActu() {
    this.router.navigate(['/actus', 'new']);
  }

}
