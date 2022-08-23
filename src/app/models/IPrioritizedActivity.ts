import {INonPrioritizedActivity} from "@models/INonPrioritizedActivity";

export enum Priorities {
    None,
    ImportantAndUrgent,
    ImportantAndNotUrgent,
    NotImportantUrgent,
    NotImportantNotUrgent
}

export interface IPrioritizedActivity extends INonPrioritizedActivity {
    priority: Priorities;
}
