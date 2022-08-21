export enum Priorities {
    UrgentImportant = 0,
    NonUrgentImportant,
    UrgentUnimportant,
    NonUrgentUnimportant
}

export interface IPrioritizedActivity {
    id: number;
    description: string;
    priority: Priorities;
}
