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

    PutInOrder(source: IActivity[], beforeDragAndDrop: IActivity[], filteredActivities: IActivity[]): IActivity[] {
        const exclude = beforeDragAndDrop.filter(a => filteredActivities.indexOf(a) === -1);
        source = source.filter(a => exclude.indexOf(a) === -1);
        const include = filteredActivities.filter(a => beforeDragAndDrop.indexOf(a) === -1);
        include.forEach(a => source.push(a));
        return source;
    }
}
