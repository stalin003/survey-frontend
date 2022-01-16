import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {JWTInterface, LoginInterface, RefreshToken} from "../common/login.interface";
import {commonStrings} from "../common/api.url";
import {JwtHelperService} from "@auth0/angular-jwt";
import {BackendService} from "../core/api/backend.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private backend: BackendService,
    private router: Router
  ) { }

  doLogin(body: LoginInterface): void {

    this.backend.login(body).subscribe((token: RefreshToken) => {
      console.log(token);

      const decodedJWT: JWTInterface = this.decodeJWT(token);
      console.log(decodedJWT);

      this.saveToken(token, decodedJWT);
      if (this.isOfficer()) {
        this.router.navigate(['council-officer']);
      } else {
        this.router.navigate(['resident-user']);

      }
    })

  }
  decodeJWT(token: RefreshToken): JWTInterface {

    const jwtHelperService = new JwtHelperService();

    return jwtHelperService.decodeToken(token.accessToken)
  }

  doLogout(): boolean {
    localStorage.removeItem(commonStrings.JWT_TOKEN);
    localStorage.removeItem(commonStrings.REFRESH_TOKEN);
    localStorage.removeItem(commonStrings.ROLES);
    localStorage.removeItem(commonStrings.SUB);
    localStorage.removeItem(commonStrings.EXP);
    return true;
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem(commonStrings.JWT_TOKEN)) {
      return true;
    }
    return false;
  }

  saveToken(token: RefreshToken, decodedJWT: JWTInterface): void {
    localStorage.setItem(commonStrings.JWT_TOKEN, token.accessToken);
    localStorage.setItem(commonStrings.REFRESH_TOKEN, token.refreshToken);
    localStorage.setItem(commonStrings.EXP, String(decodedJWT.exp));
    localStorage.setItem(commonStrings.ROLES, JSON.stringify(decodedJWT.roles));
    localStorage.setItem(commonStrings.SUB, decodedJWT.sub);
  }

  getLoggedInUser(): any {
    return localStorage.getItem(commonStrings.SUB);
  }

  getRoles(): any {
    return localStorage.getItem(commonStrings.ROLES);
  }

  isOfficer(): boolean {
    if (this.getRoles()) {
      const jsonString: string[] = JSON.parse(this.getRoles());

      if (jsonString.includes(commonStrings.ROLE_OFFICER)) {
        return true;
      }

    }
    return false;
  }
}
