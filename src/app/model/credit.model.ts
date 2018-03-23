import { JobInfo } from './jobInfo.model';
import { ParentEntity } from "./parentEntity.model";

export class Credit extends ParentEntity {
    public jobInfo: JobInfo;
    public status: string;
    public value: number;
}