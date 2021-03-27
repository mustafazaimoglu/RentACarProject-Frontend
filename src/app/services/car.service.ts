import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44365/api/cars/";

  constructor(private httpClient: HttpClient) { }

  getCar(carId:number):Observable<SingleResponseModel<Car>> {
    let newPath = this.apiUrl + "getcar?id=" + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "getalldetailsofcar";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "getcarsbybrandid?id=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "getcarsbycolorid?id=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsFiltered(brandId:number,colorId:number):Observable<ListResponseModel<Car>>
  {
    let newPath = this.apiUrl + "getcarsbycoloridandbrandid?brandId=" + brandId + "&colorId=" + colorId;    
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  addCar(car:Car):Observable<ResponseModel>
  {
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  update(car:Car):Observable<ResponseModel>
  {
    let newPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }
}

