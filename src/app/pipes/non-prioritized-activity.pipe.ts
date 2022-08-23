import {Pipe, PipeTransform} from '@angular/core';
import {INonPrioritizedActivity} from "@models/INonPrioritizedActivity";
import {IActivity} from "activity-list";

@Pipe({
    name: 'nonPrioritizedActivity'
})
export class NonPrioritizedActivityPipe implements PipeTransform {

    transform(value: INonPrioritizedActivity[]): IActivity[] {
        const result: IActivity[] = [];
        value.forEach((el) => {
            result.push({id: el.id, title: el.category, subtitle: el.type, description: el.description});
        });
        return result;
    }

}
