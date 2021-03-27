import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm: FormGroup;
  color:Color;
  dataLoaded:boolean = false;

  constructor(private formBuilder: FormBuilder,private activatedRoute:ActivatedRoute ,private colorService: ColorService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["colorId"]) {
        this.getColor(params["colorId"]);
      }
    })
  }

  getColor(colorId: number) {
    
    this.colorService.getById(colorId).subscribe(response => {
      this.color = response.data[0];

      this.colorUpdateForm = this.formBuilder.group({
        colorId: [this.color.colorId],
        colorName: [this.color.colorName, Validators.required],
      })

      this.dataLoaded = response.success;
      console.log(this.color);
      
    })

  }

  update() {
    if(this.colorUpdateForm.valid)
    {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
    
      this.colorService.update(colorModel).subscribe(response => {
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
