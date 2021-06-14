import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private api: ApiService) { }

  // @ts-ignore
  searchForm: FormGroup;
  // @ts-ignore
  msgSearchForm: string;
  // @ts-ignore
  vehicle_infos: string;
  // @ts-ignore
  rfrForm: FormGroup;
  // @ts-ignore
  rfr_valid: boolean;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {

    this.rfr_valid = false;

    this.vehicle_infos = "Le véhicule doit vous appartenir depuis plus d'un an et ne pas être gagé.";
    this.searchForm = this.formBuilder.group({
      licenseplate: ['', [Validators.required, Validators.pattern("^[0-9a-zA-Z-]{8,}$")]],
    });

    this.rfrForm = this.formBuilder.group({
      rfr: ['', [Validators.required]],
    });

  }

  onSearchSubmit(){

    this.api.apiCall().subscribe(
      (data) => {

        let array = Object.values(data);

        // @ts-ignore
        const plate = this.searchForm.get('licenseplate').value;

        for (let i = 0; i < array.length; i++) {

          if(array[i].plate == plate.toUpperCase()){

            if((array[i].energy == "diesel" && array[i].year > "2011") || (array[i].energy == "essence" && array[i].year > "2006")){

              // @ts-ignore
              this.rfr_valid = false;

              this.vehicle_infos = array[i].brand + " " + array[i].model + " - Année " +  array[i].year + " - " + array[i].energy.charAt(0).toUpperCase() + array[i].energy.slice(1);
              this.msgSearchForm = "Votre " + array[i].brand + " " + array[i].model + " n'est pas éligible à la prime à la conversion." +
                "Seuls les véhicules diesel immatriculés avant 2011 et les véhicules essence immatriculés avant 2006 sont éligibles au dispositif.";
              break;

            }
            else{

              // @ts-ignore
              this.rfr_valid = true;

              this.vehicle_infos = array[i].brand + " " + array[i].model + " - Année " + array[i].year + " - " + array[i].energy.charAt(0).toUpperCase() + array[i].energy.slice(1);
              this.msgSearchForm = "Votre " + array[i].brand + " " + array[i].model + " est éligible à la prime à la conversion.";
              break;
            }
          }
          else{

            // @ts-ignore
            this.rfr_valid = false;

            // @ts-ignore
            this.searchForm.get('licenseplate').value = "";
            this.msgSearchForm = "Aucun véhicule ne correspond à votre saisie.";
            this.vehicle_infos = "Le véhicule doit vous appartenir depuis plus d'un an et ne pas être gagé.";
          }

        }

    },
      (error) => {

      },
      () => {
        console.log("finish");
      })
  }

  onRfrSubmit(){

    var els = document.getElementsByTagName("td");

    for(var i = 0; i < els.length; i++)
    {
      els[i].innerHTML = "";
    }

    // @ts-ignore
    const rfr_value = this.rfrForm.get('rfr').value;


    const rfr_sup_13489 = [5000,2500,1500,0,0,0];
    const rfr_inf_13489 = [5000,2500,1500,1500,1500,0];
    const rfr_inf_6300 = [5000,5000,3000,3000,3000,0];


    if(rfr_value > 13489){

      for(var i = 0; i < els.length; i++)
      {
        els[i].innerHTML = String(rfr_sup_13489[i]);
      }


    }
    else if(rfr_value <= 13489 && rfr_value > 6300){

      for(var i = 0; i < els.length; i++)
      {
        els[i].innerHTML = String(rfr_inf_13489[i]);
      }

    }
    else{

      for(var i = 0; i < els.length; i++)
      {
        els[i].innerHTML = String(rfr_inf_6300[i]);
      }

    }

  }

}
