import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { DetailcarComponent } from './components/detailcar/detailcar.component';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';

import { ToastrModule } from 'ngx-toastr';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { LoginComponent } from './components/login/login.component'
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    ColorComponent,
    NaviComponent,
    BrandComponent,
    CustomerComponent,
    RentalComponent,
    DetailcarComponent,
    ColorFilterPipePipe,
    BrandFilterPipePipe,
    CarFilterPipePipe,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarUpdateComponent,
    ColorUpdateComponent,
    BrandUpdateComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
