import {Pipe, PipeTransform} from '@angular/core';
import {IPrioritizedActivity, Priorities} from "@models/IPrioritizedActivity";
import {
    IPrioritizedActivity as IComponentPrioritizedActivity,
    Priorities as ComponentPriorities
} from 'eisenhower-decision-matrix';

@Pipe({
    name: 'prioritizedActivity'
})
export class PrioritizedActivityPipe implements PipeTransform {

    transform(value: IPrioritizedActivity[], priority: Priorities): IComponentPrioritizedActivity[] {
        const result: IComponentPrioritizedActivity[] = [];
        switch (priority) {
            case Priorities.ImportantAndUrgent:
                value.forEach(v => {
                    if (v.priority === Priorities.ImportantAndUrgent) {
                        result.push({
                            id: v.id,
                            description: v.description,
                            subtitle: v.type,
                            priority: ComponentPriorities.UrgentImportant
                        });
                    }
                });
                break;
            case Priorities.ImportantAndNotUrgent:
                value.forEach(v => {
                    if (v.priority === Priorities.ImportantAndNotUrgent) {
                        result.push({
                            id: v.id,
                            description: v.description,
                            subtitle: v.type,
                            priority: ComponentPriorities.NonUrgentImportant
                        });
                    }
                });
                break;
            case Priorities.NotImportantUrgent:
                value.forEach(v => {
                    if (v.priority === Priorities.NotImportantUrgent) {
                        result.push({
                            id: v.id,
                            description: v.description,
                            subtitle: v.type,
                            priority: ComponentPriorities.UrgentUnimportant
                        });
                    }
                });
                break;
            case Priorities.NotImportantNotUrgent:
                value.forEach(v => {
                    if (v.priority === Priorities.NotImportantNotUrgent) {
                        result.push({
                            id: v.id,
                            description: v.description,
                            subtitle: v.type,
                            priority: ComponentPriorities.NonUrgentUnimportant
                        });
                    }
                });
                break;
        }
        return result;
    }
}
