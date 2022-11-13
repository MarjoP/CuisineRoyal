import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() SelectedLanguage = new EventEmitter<string>();

  constructor(private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.loggedIn();
  }

  loggedIn = () : boolean => {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    return false;
  }

  logOut = (): void => {
    console.log("removing jwt");
    localStorage.removeItem("jwt");
  }

  setLanguage(selectedLanguage: string) {
    this.SelectedLanguage.emit(selectedLanguage);
  }
  
}
