import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  loginCheck()
  {
    if(this.auth.isAuthenticated())
    {
      return false;
    }
    else
    {
      return true;
    }
  }

}
