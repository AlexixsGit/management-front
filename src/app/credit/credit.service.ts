import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credit } from '../model/credit.model';
import { Observable } from 'rxjs/Observable';
import { RestResponse } from '../util/rest-response.model';

@Injectable()
export class CreditService {

  constructor(private http: HttpClient) { }


  /**
* Guarda la informacion del credito
* @param customer 
*/
  public createCredit(credit: Credit): Observable<RestResponse> {
    return this.http.post<RestResponse>("http://localhost:8080/customer/saveCredit", JSON.stringify(credit));
  }
}
