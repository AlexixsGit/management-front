import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  private isRunning: boolean = false;
  private isValid: boolean = true;
  private isSuccess: boolean = false;
  private message: string;
  private identification: number = null;

  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
  }

  public login(): void {
    this.isSuccess = false;
    this.isValid = this.loginService.validate(this.identification);
    if (this.isValid) {
      this.isRunning = true;
      this.loginService.getCustomersByIdentification(this.identification).subscribe(res => {
        this.isRunning = false;

        if (res.list.length > 0) {
          this.isSuccess = true;
          this.router.navigate(['/jobInfoComponent']);
        } else {
          this.isValid = false;
          this.message = 'No se encontró ningún cliente con la identificación ingresada';
        }

      })

    } else {
      this.message = "Ingresa los datos obligatorios";
    }

  }
}
