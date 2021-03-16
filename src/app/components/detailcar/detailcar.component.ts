import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { DetailcarService } from 'src/app/services/detailcar.service';

@Component({
  selector: 'app-detailcar',
  templateUrl: './detailcar.component.html',
  styleUrls: ['./detailcar.component.css']
})
export class DetailcarComponent implements OnInit {

  car: Car[];
  carImage: CarImage[];
  dataLoaded = false

  constructor(private detailcarService: DetailcarService, private activatedRoute: ActivatedRoute,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCar(params["carId"]);
        this.getImage(params["carId"]);
      }
    })
  }

  getCar(id: number) {
    this.detailcarService.getCar(id).subscribe(response => {
      this.car = response.data;
      this.dataLoaded = response.success;
    })
  }
  getImage(id: number) {
    this.detailcarService.getCarPhotos(id).subscribe(response => {
      this.carImage = response.data;
    })
  }

  updateUrl(url: string) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
