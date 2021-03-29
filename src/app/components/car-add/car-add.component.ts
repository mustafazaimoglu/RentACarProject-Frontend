import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm: FormGroup;
  brands: Brand[];
  colors: Color[];

  constructor(private formBuilder: FormBuilder,private router:Router ,private toastrService: ToastrService,private carService:CarService , private brandService: BrandService, private colorService: ColorService) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colorId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
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

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      carModel.brandId = Number(carModel.brandId);
      carModel.colorId = Number(carModel.colorId);

      this.carService.addCar(carModel).subscribe(response => {
        this.toastrService.success(response.message);      
        this.router.navigate(["cars"]);  
        }, responseError => {
          if(responseError.error.Errors.length > 0)
          {
            for (let index = 0; index < responseError.error.Errors.length; index++) {
              this.toastrService.error(responseError.error.Errors[index].ErrorMessage);
            }
          }
        })
    }
    else {
      this.toastrService.error("Form da hata var.");
    }

  }

}
