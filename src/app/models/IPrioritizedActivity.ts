import {INonPrioritizedActivity} from "@models/INonPrioritizedActivity";

export interface IPrioritizedActivity extends INonPrioritizedActivity {
    priority: number;
}
