type Task={
    id:string;
    title:string;
    description?:string;
    completed:boolean;
    belongListId?:string
}
type List={
    id:string;
    title:string;
    tasks:Task[];
    color:string
}
type Board={
    id:string;
    title:string;
    lists:List[];
    color:string;
}
export type {List,Task,Board}