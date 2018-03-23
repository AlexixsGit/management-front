import { Injectable } from '@angular/core';
import { RestResponse } from '../util/rest-response.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { QueryResult } from '../util/query-result.model';
import { Customer } from '../model/customer.model';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }


  /**
   * Busca los clientes por identificacion
   * @param identification 
   */
  public getCustomersByIdentification(identification: number): Observable<QueryResult<Customer>> {
    let customer = new Customer();
    customer.identification = identification;
    return this.http.post<QueryResult<Customer>>("http://localhost:8080/customer/getCustomersByIdentification", JSON.stringify(customer));
  }
  /**
   * Valida los campos obligatorios
   * @param identification 
   */
  public validate(identification: number): boolean {
    let isValid = true;

    if (identification === null) {
      isValid = false;
    }
    return isValid;
  }
}
