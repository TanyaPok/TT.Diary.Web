import {Pipe, PipeTransform} from '@angular/core';
import {IPrioritizedActivity} from "@models/IPrioritizedActivity";
import {IPrioritizedActivity as IComponentPrioritizedActivity, Priorities} from 'eisenhower-decision-matrix';

@Pipe({
    name: 'prioritizedActivity'
})
export class PrioritizedActivityPipe implements PipeTransform {

    transform(value: IPrioritizedActivity[], priority: string): IComponentPrioritizedActivity[] {
        const result: IComponentPrioritizedActivity[] = [];
        switch (priority) {
            case 'urgentImportant':
                value.forEach(v => {
                    if (v.priority === 1) {
                        result.push({id: v.id, description: v.description, priority: Priorities.UrgentImportant});
                    }
                });
                break;
            case 'nonUrgentImportant':
                value.forEach(v => {
                    if (v.priority === 2) {
                        result.push({id: v.id, description: v.description, priority: Priorities.NonUrgentImportant});
                    }
                });
                break;
            case 'urgentUnimportant':
                value.forEach(v => {
                    if (v.priority === 3) {
                        result.push({id: v.id, description: v.description, priority: Priorities.UrgentUnimportant});
                    }
                });
                break;
            case 'nonUrgentUnimportant':
                value.forEach(v => {
                    if (v.priority === 4) {
                        result.push({id: v.id, description: v.description, priority: Priorities.NonUrgentUnimportant});
                    }
                });
                break;
        }
        return result;
    }

}
