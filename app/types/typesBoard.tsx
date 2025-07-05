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
export type {Task,List}