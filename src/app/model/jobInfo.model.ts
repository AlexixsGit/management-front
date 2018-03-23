import { ParentEntity } from './parentEntity.model';
import { Customer } from './customer.model';

export class JobInfo extends ParentEntity {
    public companyName: string;
    public nit: number;
    public salary: number;
    public entryDate: Date;
    public customer: Customer;
}