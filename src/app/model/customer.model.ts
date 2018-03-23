import { ParentEntity } from './parentEntity.model';

export class Customer extends ParentEntity {
    public identification: number;
    public name: string;
    public lastname: string;
    public birthday: Date;
}