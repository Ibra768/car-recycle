import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActusService} from "../services/actus.service";
import {Router} from "@angular/router";
import {Actu} from "../models/actu.model";

@Component({
  selector: 'app-actu-form',
  templateUrl: './actu-form.component.html',
  styleUrls: ['./actu-form.component.scss']
})
export class ActuFormComponent implements OnInit {

  // @ts-ignore
  actuForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private actusService: ActusService,
              private router: Router) { }


  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.actuForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }

  onSaveBook() {

    // @ts-ignore
    const title = this.actuForm.get('title').value;
    // @ts-ignore
    const author = this.actuForm.get('author').value;
    // @ts-ignore
    const synopsis = this.actuForm.get('synopsis').value;

    const newActu = new Actu(title, author);
    newActu.synopsis = synopsis;
    this.actusService.createNewActu(newActu);
    this.router.navigate(['/actus']);
  }

}
