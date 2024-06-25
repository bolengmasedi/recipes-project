import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private API_KEY: string = 'AIzaSyATOt2_l8KqHsyOCtcutUlKr7BD0PDHXH0';

    constructor(private httpClient: HttpClient) {}

    signUp(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }   
        )
        .pipe(
            catchError(this.handleError)
        )
    }

    logIn(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }   
        )
        .pipe(
            catchError(this.handleError)
        )
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if(!errorResponse.error || !errorResponse.error.error) {
            return throwError('An unknown error occurred!');
        }
        switch(errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                return throwError('Email already exists');
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                return throwError('Too many attempts, try later');
            case 'EMAIL_NOT_FOUND':
                return throwError('Email not found');
            case 'INVALID_PASSWORD':
                return throwError('Password is invalid.');
            case 'USER_DISABLED': 
                return throwError('User account has been disabled');
            default: 
                return throwError('Operation failed. Please try again later');
        }
    }
}