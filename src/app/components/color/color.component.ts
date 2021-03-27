import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors: Color[] = [];
  currentColor:Color;
  dataLoaded = false;
  filterText = "";

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
    this.getColors()
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
      this.dataLoaded = response.success;
    })
  }

  getCurrentColor(color)
  {
    this.currentColor = color;
  }

  getCurrentColorClass(color)
  {
    if(color == this.currentColor)
    {
      return "d-flex justify-content-between list-group-item active"
    }
    else
    {
      return "d-flex justify-content-between list-group-item";
    }
  }

}
