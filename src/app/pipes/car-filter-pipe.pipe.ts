import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'carFilterPipe'
})
export class CarFilterPipePipe implements PipeTransform {

  transform(value: Car[], brand:string, color:string): Car[] {
    brand = brand.toLowerCase();
    color = color.toLowerCase();
    return brand || color ? value.filter((c:Car) => (c.colorName.toLocaleLowerCase().indexOf(color) && c.brandName.toLocaleLowerCase().indexOf(brand)) !== -1) : value;
  }

}
