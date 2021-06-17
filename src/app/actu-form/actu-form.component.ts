import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActusService} from "../services/actus.service";
import {Router} from "@angular/router";
import {Actu} from "../models/actu.model";
import firebase from "firebase";

@Component({
  selector: 'app-actu-form',
  templateUrl: './actu-form.component.html',
  styleUrls: ['./actu-form.component.scss']
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

    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.user = user.displayName;
        }
      }
    );


  }

  initForm() {
    this.actuForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: [{value: '', disabled: true}, Validators.required],
      content: ['', Validators.required]
    });
  }

  onSaveBook() {

    // @ts-ignore
    const title = this.actuForm.get('title').value;
    // @ts-ignore
    const author = this.actuForm.get('author').value;
    // @ts-ignore
    const content = this.actuForm.get('content').value;

    const newActu = new Actu(title, author, content);
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
