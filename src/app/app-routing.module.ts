import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { DetailcarComponent } from './components/detailcar/detailcar.component';

const routes: Routes = [
  {path: "",pathMatch:"full",component:CarComponent},
  {path: "cars",component:CarComponent},
  {path: "cars/brand/:brandId", component:CarComponent},
  {path: "cars/color/:colorId", component:CarComponent},
  {path: "detailcar/:carId", component:DetailcarComponent},
  {path: "car/update/:carId", component:CarUpdateComponent},
  {path: "cars/add", component:CarAddComponent},
  {path: "colors/add", component:ColorAddComponent},
  {path: "color/update/:colorId", component:ColorUpdateComponent},
  {path: "brands/add", component:BrandAddComponent},
  {path: "brand/update/:brandId", component:BrandUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
