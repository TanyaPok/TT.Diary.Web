import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {CredentialResponse} from "google-one-tap";
import {CookieService} from 'ngx-cookie-service';
import {DataService} from "@services/data.service";
import {Subscription} from "rxjs";
import {ParamService} from "@services/param.service";
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from "@angular/material/snack-bar";


@Component({
    selector: 'tt-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [CookieService]
})
export class LoginComponent implements OnInit {
    private readonly clientId = '875368413718-vad7b0c2kkll04bt2tcr9f23fcuuipui.apps.googleusercontent.com';
    @ViewChild("singIn") singInButton: ElementRef | undefined;
    private dataServiceSubscription!: Subscription;
    private snackBarRef!: MatSnackBarRef<TextOnlySnackBar>;

    constructor(private router: Router, private dataService: DataService, private paramService: ParamService,
                private snackBar: MatSnackBar) {
        // to display the google button
        if (this.router.getCurrentNavigation()?.previousNavigation){
            window.location.reload();
        }
    }

    ngOnInit(): void {
        window.onload = () => {
            window.google.accounts.id.initialize({
                client_id: this.clientId,
                callback: (response: CredentialResponse) => {
                    const responsePayload = this.decodeJwtResponse(response.credential);
                    this.paramService.givenName = responsePayload.given_name;
                    this.paramService.picture = responsePayload.picture;

                    this.dataServiceSubscription = this.dataService.postUser(responsePayload.given_name, responsePayload.sub).subscribe({
                        next: userId => {
                            this.paramService.userId = userId;
                            this.router.navigate(['workplace']).catch(
                                reason => {
                                    this.snackBarRef = this.snackBar.open(reason?.message, 'X', {
                                        panelClass: 'errorSnackBar',
                                        duration: 5000
                                    });
                                    console.error(reason);
                                }
                            ).then((isNavigated) => {
                                if (isNavigated) {
                                    window.location.reload();
                                }
                            });
                        }, error: reason => {
                            this.snackBarRef = this.snackBar.open(`Server is unavailable. Try later. ${reason?.message}`, 'X', {
                                panelClass: 'errorSnackBar',
                                duration: 5000
                            });
                            console.error(reason);
                        }
                    });
                }
            });
            window.google.accounts.id.renderButton(
                this.singInButton?.nativeElement,
                {theme: "filled_black", size: "large"}
            );
            window.google.accounts.id.prompt();
        };
    }

    ngOnDestroy(): void {
        this.dataServiceSubscription.unsubscribe();
        this.snackBarRef?.dismiss();
        window.onload = null;
    }

    private decodeJwtResponse(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
}
