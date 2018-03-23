import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Customer } from './../model/customer.model';
import { Credit } from './../model/credit.model';
import { JobInfo } from './../model/jobInfo.model';
import { JobInfoService } from './job-info.service';
import { CreditService } from '../credit/credit.service';

@Component({
  selector: 'app-job-info',
  templateUrl: './job-info.component.html',
  styleUrls: ['./job-info.component.css'],
  providers: [JobInfoService, CreditService]
})
export class JobInfoComponent implements OnInit {

  private jobInfo: JobInfo;
  private isRunning: boolean = false;
  private isValid: boolean = true;
  private isSuccess: boolean = false;
  private message: string;
  private entryDate: any;
  private credit: Credit;
  private customer: Customer;

  constructor(private jobInfoService: JobInfoService,
    private router: Router, private creditService: CreditService) {
    this.jobInfo = new JobInfo();
    this.credit = new Credit();
  }

  ngOnInit() {

    if (!sessionStorage.getItem('customer')) {
      this.router.navigate(['/loginComponent']);
    } else {
      this.customer = JSON.parse(sessionStorage.getItem('customer'));
    }
  }

  public create(): void {
    this.isSuccess = false;
    this.isValid = true;

    let serviceResponse = this.jobInfoService.validate(this.jobInfo, this.entryDate);

    if (serviceResponse.isValid) {
      this.jobInfo.entryDate = new Date(this.entryDate.year, this.entryDate.month, this.entryDate.day);

      serviceResponse = this.jobInfoService.validateCredit(this.jobInfo);

      if (serviceResponse.isValid) {

        this.credit.value = this.jobInfoService.approvedValue(this.jobInfo);
        this.credit.status = "Approved";
        this.jobInfo.customer = this.customer.id;

        this.isRunning = true;


        this.jobInfoService.saveJobInfo(this.jobInfo).subscribe(res => {

          if (res.entity) {
            let entity = res.entity;
            this.jobInfo = JSON.parse(JSON.stringify(res.entity));
            this.credit.jobInfo = this.jobInfo.id;

            this.creditService.createCredit(this.credit).subscribe(cred => {
              this.isRunning = false;
              if (cred.entity) {
                this.isSuccess = true;
                alert('Se aprueba el credito del cliente por un valor de ' + this.credit.value);
                this.clear();
              } else {
                this.isValid = false;
                this.message = 'El cliente no pudo ser registrado';
              }
            })
          } else {
            this.isRunning = false;
            this.isValid = false;
            this.message = 'No se pudo ejecutar el credito';
          }
        })
      } else {
        this.isValid = false;
        this.message = serviceResponse.message;
      }

    } else {
      this.isValid = false;
      this.message = serviceResponse.message;
    }
  }

  private clear(): void {
    this.jobInfo = new JobInfo();
    this.entryDate = null;
  }
}
