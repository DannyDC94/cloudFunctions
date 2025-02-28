import {Timestamp} from "firebase-admin/firestore";

export interface Task {
    id?: string;
    title: string;
    description: string;
    status: boolean;
    createdAt: Timestamp;
}
