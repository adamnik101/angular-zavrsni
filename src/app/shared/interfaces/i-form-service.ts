import { UntypedFormGroup } from "@angular/forms";

export interface IFormService {

    
    form: UntypedFormGroup;

    init(): UntypedFormGroup;

    getFormReference(): UntypedFormGroup;

    reset(): void;
}