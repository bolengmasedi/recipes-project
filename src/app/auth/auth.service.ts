import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { UserModel } from "./user.model";
import { Router } from "@angular/router";

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
    user = new BehaviorSubject<UserModel>(null);
    private expirationTimer: any;
    

    constructor(private httpClient: HttpClient, private router: Router) {}

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
            catchError(this.handleError),
            tap(response => {
                this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
            })
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
            catchError(this.handleError),
            tap(response => {
                this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
            })
        )
    }

    // Check local storage to see if there's an existing user snapshot stored
    autoLogin() {
        // Convert stored data from JSON to JavaScript object
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData) {
            return;
        } 
        const loadedUser = new UserModel(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    // Takes an expiration duration in seconds
    autoLogout(expirationDuration: number) {
        this.expirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration)
    }

    logout() {
        // Ensures the user is unauthenticated throughout the whole application
        this.user.next(null);
        // Redirect user to AuthComponent
        this.router.navigate(['/auth']);
        // Remove user data from local storage
        localStorage.removeItem('userData');
        // Clear timer
        if(this.expirationTimer) {
            clearTimeout(this.expirationTimer);
        }
        this.expirationTimer = null;
    }


    // Get the current date, add the expiresIn in milliseconds after converting it to a number
    private handleAuthentication(email: string, id: string, token: string, expiresIn: number ) {
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
        const user = new UserModel(email, id, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
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