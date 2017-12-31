import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {


  constructor(private _authService: AuthService) {
  }


  logOut() : void {

console.log("log out calling...");
   this._authService.logout();
  }
}
