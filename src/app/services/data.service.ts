import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {INonPrivatizedActivity} from "@models/INonPrivatizedActivity";


export enum ApiPaths {
    User = 'user',
    NonPrivatizedMatter = 'nonprivatizedactivities'
}

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) {
    }

    postUser(givenName: string, sub: string): Observable<number> {
        return this.http.post<number>(`${environment.webApiUrl}/${ApiPaths.User}`, {
            "given_name": givenName,
            "sub": sub
        });
    }

    getNonPrioritizedMatters(userId: number): Observable<INonPrivatizedActivity[]> {
        return this.http.get<INonPrivatizedActivity[]>(`${environment.webApiUrl}/${ApiPaths.NonPrivatizedMatter}?userid=${userId}`);
    }
}
