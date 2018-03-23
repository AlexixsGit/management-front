import { ParentEntity } from "./parentEntity.model";

export class Credit extends ParentEntity {
    public jobInfo: number;
    public status: string;
    public value: number;
}