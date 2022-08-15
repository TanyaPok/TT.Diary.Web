import {Pipe, PipeTransform} from '@angular/core';
import {INonPrivatizedActivity} from "@models/INonPrivatizedActivity";
import {IActivity} from "activity-list";

@Pipe({
    name: 'nonPrivatizedActivity'
})
export class NonPrivatizedActivityPipe implements PipeTransform {

    transform(value: INonPrivatizedActivity[]): IActivity[] {
        const result: IActivity[] = [];
        value.forEach((el, index) => {
            result[index] = {id: el.id, title: el.category, subtitle: el.type, description: el.description}
        });
        return result;
    }

}
