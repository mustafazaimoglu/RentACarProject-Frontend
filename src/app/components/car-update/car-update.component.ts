import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm: FormGroup;
  car: Car;
  dataLoaded: boolean;
  brands: Brand[];
  colors: Color[];
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private toastrService: ToastrService, private carService: CarService, private brandService: BrandService, private colorService: ColorService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();

    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCar(params["carId"]);
      }
    })

  }

  getCar(carId: number) {
    this.carService.getCar(carId).subscribe(response => {
      this.car = response.data;
      let bId: Number = 0;
      let cId: Number = 0;

      for (let i = 0; i < this.brands.length; i++) {
        if (this.brands[i].brandName == this.car.brandName) {
          bId = this.brands[i].brandId;
        }
      }

      for (let i = 0; i < this.colors.length; i++) {
        if (this.colors[i].colorName == this.car.colorName) {
          cId = this.colors[i].colorId;          
        }
      }

      this.carUpdateForm = this.formBuilder.group({
        id: [this.car.carId, Validators.required],
        brandId: [bId, Validators.required],
        colorId: [cId, Validators.required],
        modelYear: [this.car.modelYear, Validators.required],
        dailyPrice: [this.car.dailyPrice, Validators.required],
        description: [this.car.description, Validators.required],
      })

      
      this.dataLoaded = response.success;
      console.log(this.car);
      
    })

  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  update() {
    if(this.carUpdateForm.valid)
    {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      carModel.brandId = Number(carModel.brandId);
      carModel.colorId = Number(carModel.colorId);

      console.log(carModel);
      
      
      this.carService.update(carModel).subscribe(response => {
        this.toastrService.success(response.message);   
      },responseError => {
        if(responseError.error.Errors.length > 0)
          {
            for (let index = 0; index < responseError.error.Errors.length; index++) {
              this.toastrService.error(responseError.error.Errors[index].ErrorMessage);
            }
          }
      })

    }
    else
    {
      this.toastrService.error("Formda hata var.")
      
    }


    
  }

}
