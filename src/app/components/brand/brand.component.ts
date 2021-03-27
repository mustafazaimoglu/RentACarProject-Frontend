import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[] = [];
  currentBrand:Brand;
  dataLoaded = false;
  filterText = "";

  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands()
  {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
      this.dataLoaded = response.success;
    })
  }

  setCurrentBrand(brand)
  {
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand)
  {
    if(brand == this.currentBrand)
    {
      return "d-flex justify-content-between list-group-item active"
    }
    else
    {
      return "d-flex justify-content-between list-group-item";
    }
  }

}
