export enum Activities {
    ToDO = "to-do",
    Habit = "habit",
    Appointment = "appointment",
    Wish = "wish"
}

export interface INonPrioritizedActivity {
    id: number;
    description: string;
    category: string;
    type: Activities;
}
