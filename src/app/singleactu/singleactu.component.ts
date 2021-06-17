import { Component, OnInit } from '@angular/core';
import {Actu} from "../models/actu.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ActusService} from "../services/actus.service";

@Component({
  selector: 'app-singleactu',
  templateUrl: './singleactu.component.html',
  styleUrls: ['./singleactu.component.scss']
})
export class SingleActuComponent implements OnInit {

  // @ts-ignore
  actu: Actu;
  // @ts-ignore
  data;

  constructor(private route: ActivatedRoute,
              private actusService: ActusService,
              private router: Router) { }

  ngOnInit() {

    this.actu = new Actu('', '', '');
    const id = this.route.snapshot.params['id'];
    this.actusService.getSingleActu(+id).then(
      (actu) => {
        this.data = actu;
        this.actu.title = this.data.title;
        this.actu.author = this.data.author;
        this.actu.content = this.data.synopsis;
        this.actu.photo = this.data.photo;
      }
    );
  }

  onBack() {
    this.router.navigate(['/actus']);
  }

}
