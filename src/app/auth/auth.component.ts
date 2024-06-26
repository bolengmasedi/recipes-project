import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return
        }
        this.isLoading = true;
        let authObservable: Observable<AuthResponseData>;
        if(this.isLoginMode) {
            authObservable = this.authService.logIn(form.value.email, form.value.password)
        } else {
            authObservable = this.authService.signUp(form.value.email, form.value.password);
        }
        authObservable.subscribe(response => {
            console.log(response);
            this.router.navigate(['/recipes'])
            this.isLoading = false;
        }, 
        error => {
            console.log(error);
            this.error = error;
            this.isLoading = false;
        });
        form.reset()
    }
}