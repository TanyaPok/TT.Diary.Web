import {Injectable} from '@angular/core';
import {IActivity} from "./IActivity";

@Injectable({
    providedIn: 'root'
})
export class ActivityListService {

    constructor() {
    }

    sort(isAsc: boolean, activities: IActivity[]) {
        activities.sort((activity1, activity2) => {
            if (activity1.description > activity2.description) {
                return (isAsc) ? 1 : -1;
            }

            if (activity1.description < activity2.description) {
                return (isAsc) ? -1 : 1;
            }

            return 0;
        });
    }

    performFilter(filterBy: string, source: IActivity[]): IActivity[] {
        filterBy = filterBy.toLocaleLowerCase();
        return source.filter((activity: IActivity) => {
            return activity.description?.toLocaleLowerCase().includes(filterBy) ||
            activity.title?.toLocaleLowerCase().includes(filterBy) ||
            activity.subtitle?.toLocaleLowerCase().includes(filterBy);
        });
    }
}
