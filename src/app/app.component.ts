import { Component } from '@angular/core';
import firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(){
      const firebaseConfig = {
        apiKey: "AIzaSyDIHFZmu3SfKq6AHxZ60an2lqig0leV2f0",
        authDomain: "car-recycle.firebaseapp.com",
        projectId: "car-recycle",
        storageBucket: "car-recycle.appspot.com",
        messagingSenderId: "176257747168",
        appId: "1:176257747168:web:0762a0f598726818bfa885"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }
}
