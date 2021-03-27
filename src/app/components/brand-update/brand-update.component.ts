import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm: FormGroup;
  brand:Brand;
  dataLoaded:boolean = false;

  constructor(private formBuilder: FormBuilder,private activatedRoute:ActivatedRoute ,private brandService: BrandService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getBrand(params["brandId"]);
      }
    })
  }

  getBrand(brandId: number) {
    
    this.brandService.getById(brandId).subscribe(response => {
      this.brand = response.data[0];

      this.brandUpdateForm = this.formBuilder.group({
        brandId: [this.brand.brandId],
        brandName: [this.brand.brandName, Validators.required],
      })

      this.dataLoaded = response.success;
      console.log(this.brand);
      
    })
  }

  update() {
    if(this.brandUpdateForm.valid)
    {
      let colorModel = Object.assign({}, this.brandUpdateForm.value);
    
      this.brandService.update(colorModel).subscribe(response => {
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
