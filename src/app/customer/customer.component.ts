import { ServiceResponse } from './../util/service-response';
import { Component, OnInit } from '@angular/core';

import { Customer } from './../model/customer.model';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {

  public birthdayDate: any;
  public customer: Customer;
  private isRunning: boolean = false;
  private isValid: boolean = true;
  private isSuccess: boolean = false;
  private message: string;

  constructor(private customerService: CustomerService) {
    this.customer = new Customer();
  }

  ngOnInit() {
  }

  public create(): void {
    this.isSuccess = false;
    this.isValid = true;

    let serviceResponse = this.customerService.validate(this.customer, this.birthdayDate);

    if (serviceResponse.isValid) {
      this.customer.birthday = new Date(this.birthdayDate.year, this.birthdayDate.month, this.birthdayDate.day);
      this.isRunning = true;
      this.customerService.getCustomersByIdentification(this.customer).subscribe(res => {
        if (res.list.length === 0) {

          this.customerService.createCustomer(this.customer).subscribe(cust => {
            this.isRunning = false;
            if (cust.entity) {
              this.isSuccess = true;
              this.clear();
              this.message = 'Cliente registrado exitosamente';
            } else {
              this.isValid = false;
              this.message = 'El cliente no pudo ser registrado';
            }
          })
        } else {
          this.isRunning = false;
          this.isValid = false;
          this.message = 'Ya existe un cliente con la identificación ingresada';
        }

      })

    } else {
      this.isValid = false;
      this.message = serviceResponse.message;
    }
  }

  private clear(): void {
    this.customer = new Customer();
    this.birthdayDate = null;
  }

}
