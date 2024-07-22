import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmPasswordValidator (): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        console.log(control)
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        
        const areSame = password?.value === confirmPassword?.value;
        
        if(!areSame) {

            confirmPassword?.setErrors({confirm: true});

            return {confirmPassword: "Passwords must match!"};
        }


        confirmPassword?.setErrors(null);
        return null;
    }
}