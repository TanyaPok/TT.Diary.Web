import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {INonPrioritizedActivity} from "@models/INonPrioritizedActivity";
import {IPrioritizedActivity} from "@models/IPrioritizedActivity";


export enum ApiPaths {
    User = 'user',
    NonPrivatizedActivity = 'nonprioritizedactivities',
    PrivatizedActivity = 'prioritizedactivities'
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

    getNonPrioritizedActivities(userId: number): Observable<INonPrioritizedActivity[]> {
        return this.http.get<INonPrioritizedActivity[]>(`${environment.webApiUrl}/${ApiPaths.NonPrivatizedActivity}?userid=${userId}`);
    }

    getPrioritizedActivities(userId: number): Observable<IPrioritizedActivity[]> {
        const finishDate = new Date().toJSON();
        const startDate = this.getPreviousDay().toJSON();
        return this.http.get<IPrioritizedActivity[]>(`${environment.webApiUrl}/${ApiPaths.PrivatizedActivity}?userid=${userId}&startDate=${startDate}&finishDate=${finishDate}`);
    }

    getPreviousDay(date = new Date()): Date {
        const previous = new Date(date.getTime());
        previous.setDate(date.getDate() - 1);
        return previous;
    }
}
