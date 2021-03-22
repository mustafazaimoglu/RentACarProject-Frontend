import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = []
  currentCar:Car;
  brands:Brand[];
  colors:Color[];
  dataLoaded = false;
  selectedColor:number = 0;
  selectedBrand:number = 0;

  constructor(private carService: CarService, private toastrService:ToastrService, private activatedRoute: ActivatedRoute,private brandService:BrandService,private colorService:ColorService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"]);
      }
      else if(params["colorId"])
      {
        this.getCarsByColor(params["colorId"]);
      }
      else {
        this.getCars();
      }
    })

    this.getBrands();
    this.getColors();


  }

  getBrands()
  {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors()
  {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = response.success;
    })
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = response.success;
    })
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = response.success;
    })
  }

  setCurrentCar(car)
  {
    this.currentCar = car;
  }

  getCarsFiltered()
  {    
    this.carService.getCarsFiltered(this.selectedBrand,this.selectedColor).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = response.success;
    })

    this.toastrService.success("Filtreli Arama","Başarılı");
  }

}
