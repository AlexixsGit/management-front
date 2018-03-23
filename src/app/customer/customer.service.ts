import { ServiceResponse } from './../util/service-response';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Customer } from './../model/customer.model';
import { QueryResult } from '../util/query-result.model';
import { HttpClient } from '@angular/common/http';
import { RestResponse } from '../util/rest-response.model';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }


  /**
   * Valida los campos obligatorios y que la informacion sea valida
   * @param customer 
   */
  public validate(customer: Customer, birthday: any): ServiceResponse {

    if (!customer.identification) {
      return new ServiceResponse(false, 'Ingrese una identificacion válida');
    }

    if (isNaN(customer.identification)) {
      return new ServiceResponse(false, 'La identificacion no es válida');
    }

    if (!customer.name || customer.name.length === 0) {
      return new ServiceResponse(false, 'Ingrese el nombre');
    }

    if (!customer.lastname || customer.lastname.length === 0) {
      return new ServiceResponse(false, 'Ingrese el apellido');
    }


    if (!birthday) {
      return new ServiceResponse(false, 'Ingrese la fecha de nacimiento');
    }

    customer.birthday = new Date(birthday.year, birthday.month, birthday.day);
    if (!customer.birthday.getDate()) {
      return new ServiceResponse(false, 'Ingrese una fecha válida');
    }

    let currentDate = new Date();
    if ((currentDate.getFullYear() - birthday.year) < 18) {
      return new ServiceResponse(false, 'Debe ser mayor de edad');
    }


    return new ServiceResponse(true, '');

  }

  /**
   * Obtiene los clientes que tengan la identificacion ingresada
   * @param customer 
   */
  public getCustomersByIdentification(customer: Customer): Observable<QueryResult<Customer>> {
    return this.http.post<QueryResult<Customer>>("http://localhost:8080/customer/getCustomersByIdentification", JSON.stringify(customer));
  }

  /**
   * Guarda un cliente
   * @param customer 
   */
  public createCustomer(customer: Customer): Observable<RestResponse> {
    return this.http.post<RestResponse>("http://localhost:8080/customer/createCustomer", JSON.stringify(customer));
  }
}
