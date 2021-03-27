import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class DetailcarService {

  constructor(private httpClient: HttpClient) { }

  getCar(id:number):Observable<SingleResponseModel<Car>> {
    let newPath = "https://localhost:44365/api/cars/getcarbycarid?id=" + id;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getCarPhotos(id:number):Observable<ListResponseModel<CarImage>> {
    let newPath = "https://localhost:44365/api/carimages/getallimagesbycarid?id=" + id;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

}
