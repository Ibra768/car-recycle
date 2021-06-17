import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActusService} from "../services/actus.service";
import {Router} from "@angular/router";
import {Actu} from "../models/actu.model";
import {DatePipe} from "@angular/common";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-actu-form',
  templateUrl: './actu-form.component.html',
  styleUrls: ['./actu-form.component.scss'],
  providers: [DatePipe]
})
export class ActuFormComponent implements OnInit {

  // @ts-ignore
  actuForm: FormGroup;

  fileIsUploading = false;
  fileUrl: string | undefined;
  fileUploaded = false;

  // @ts-ignore
  user;

  constructor(private formBuilder: FormBuilder, private actusService: ActusService,
              private router: Router) { }



  ngOnInit() {

    this.initForm();

  }


  initForm() {
    this.user = localStorage.getItem('admin');
    this.actuForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: [this.user],
      content: ['', Validators.required],
    });
  }

  onSaveBook() {

    // @ts-ignore
    const title = this.actuForm.get('title').value;
    // @ts-ignore
    const author = this.actuForm.get('author').value;
    // @ts-ignore
    const content = this.actuForm.get('content').value;

    let date = new Date();
    let day = date.getDay();

    if(day < 10){
      // @ts-ignore
      day = "0" + day;
    }

    const mois = date.getMonth();

    let hour = date.getHours();

    if(hour < 10){
      // @ts-ignore
      hour = "0" + hour;
    }

    let minutes = date.getMinutes();

    if(minutes < 10){
      // @ts-ignore
      minutes = "0" + minutes;
    }

    const year = date.getFullYear();
    const options = {month: 'long'};
    // @ts-ignore
    const format = new Intl.DateTimeFormat('fr-fr',options).format(mois);

    const formatdate = day + " " + format.charAt(0).toUpperCase() + format.slice(1) + " " + year + " à " + hour + ":"+ minutes;

    const newActu = new Actu(title, author, content, formatdate);
    newActu.content = content;

    if(this.fileUrl && this.fileUrl !== '') {
      newActu.photo = this.fileUrl;
    }

    this.actusService.createNewActu(newActu);
    this.router.navigate(['/actus']);
  }

  // @ts-ignore
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.actusService.uploadFile(file).then(
      (url) => {
        // @ts-ignore
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

}
