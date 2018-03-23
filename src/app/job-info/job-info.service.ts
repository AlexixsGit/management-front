import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JobInfo } from './../model/jobInfo.model';
import { ServiceResponse } from '../util/service-response';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Observable } from 'rxjs/Observable';
import { RestResponse } from '../util/rest-response.model';

@Injectable()
export class JobInfoService {

  constructor(private http: HttpClient) { }

  /**
  * Valida los campos obligatorios y que la informacion sea valida
  * @param customer 
  */
  public validate(jobInfo: JobInfo, entryDate: any): ServiceResponse {

    if (!jobInfo.companyName || jobInfo.companyName.length === 0) {
      return new ServiceResponse(false, 'Ingrese el nombre de la empresa');
    }

    if (!jobInfo.nit) {
      return new ServiceResponse(false, 'Ingrese el nit de la empresa');
    }

    if (isNaN(jobInfo.nit)) {
      return new ServiceResponse(false, 'El Nit no es válido');
    }


    if (!jobInfo.salary) {
      return new ServiceResponse(false, 'Ingrese el salario');
    }


    if (isNaN(jobInfo.salary)) {
      return new ServiceResponse(false, 'El Salario no es válido');
    }

    if (!Number.isInteger(jobInfo.salary)) {
      return new ServiceResponse(false, 'El Salario no es válido');
    }

    if (jobInfo.salary < 0) {
      return new ServiceResponse(false, 'El Salario debe ser mayor a cero');
    }


    if (jobInfo.salary >= 100000000) {
      return new ServiceResponse(false, 'El Salario debe ser menor a $100.000.000');
    }

    if (!entryDate) {
      return new ServiceResponse(false, 'Ingrese una fecha válida');
    }

    jobInfo.entryDate = new Date(entryDate.year, entryDate.month, entryDate.day);
    let currentDate = new Date();

    let days = (currentDate.getFullYear() + currentDate.getMonth() + 1 + currentDate.getDate())
      - (jobInfo.entryDate.getFullYear() + jobInfo.entryDate.getMonth() + jobInfo.entryDate.getDate())

    if (days <= 0) {
      return new ServiceResponse(false, 'La fecha de ingreso debe ser menor a hoy');
    }

    return new ServiceResponse(true, '');

  }

  /**
   * Validacion de aprobacion de credito
   * @param jobInfo 
   */
  public validateCredit(jobInfo: JobInfo): ServiceResponse {
    var today = new Date();
    var totalYears = today.getFullYear() - jobInfo.entryDate.getFullYear();

    if (totalYears <= 1.6) {
      return new ServiceResponse(false, 'El cliente no cumple con el tiempo minimo de estar laborando');
    }

    if (jobInfo.salary < 800000) {
      return new ServiceResponse(false, 'El cliente no cumple con el salario minimo para el prestamo');
    }

    return new ServiceResponse(true, '');
  }

  /**
   * Calcula el valor aprovado para el prestamo
   * @param jobInfo 
   */
  public approvedValue(jobInfo: JobInfo): number {
    let approvedValue = 0;
    if (jobInfo.salary > 800000 && jobInfo.salary < 1000000) {
      approvedValue = 5000000;
    }

    if (jobInfo.salary > 1000000 && jobInfo.salary < 4000000) {
      approvedValue = 20000000;
    }

    if (jobInfo.salary > 4000000) {
      approvedValue = 50000000;
    }
    return approvedValue;
  }

  /**
 * Guarda la informacion del empleado
 * @param customer 
 */
  public saveJobInfo(jobInfo: JobInfo): Observable<RestResponse> {
    return this.http.post<RestResponse>("http://localhost:8080/customer/saveJobInfo", JSON.stringify(jobInfo));
  }
}
