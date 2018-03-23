export class ServiceResponse {
    public isValid: boolean = true;
    public message: string = "";

    constructor(isValid: boolean, message: string) {
        this.isValid = isValid;
        this.message = message;
    }
}