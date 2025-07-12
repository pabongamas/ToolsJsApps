"use client";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { Board, List, Task } from "../types/typesBoard";
import { arrayMove } from "@dnd-kit/sortable";

function DragEndInList(
    event: DragEndEvent,
    board: Board,
    updateBoardObj: (changes: Partial<Board>) => void,
    setActiveTask: (task: Task | null) => void,
    setActiveList: (list: List | null) => void
) {
    const { active, over } = event;
    if (!over || active.id === over.id) {
        setActiveTask(null);
        return;
    }

    const activeId = active.id;
    const overId = over.id;


    const isDraggingList = String(active.id).startsWith("list");
    const isOverList = String(over?.id).startsWith("list");

    if (isDraggingList && !isOverList) return;


    if (isDraggingList && isOverList) {
        // estás moviendo listas
        const oldIndex = board.lists.findIndex((list) => list.id === active.id);
        const newIndex = board.lists.findIndex((list) => list.id === over.id);


        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
            const reordered = arrayMove(board.lists, oldIndex, newIndex);
            // setLists(reordered);
            updateBoardObj({
                lists: reordered,
            });
        }
        return;
    }

    let sourceListIndex = -1;
    let destinationListIndex = -1;
    // iterate list
    board.lists.forEach((list, index) => {
        // find the task in the list to know where is the source list
        //active id is   the ref that is used in taskDragable
        if (list.tasks.find((task) => task.id === activeId)) {
            sourceListIndex = index;
        }
        //verify list id if its drop in a list and verify the list.id  == to dropable list
        if (list.id === overId || list.tasks.find((task) => task.id === overId)) {
            destinationListIndex = index;
        }
    });

    //verify posicion from source and destination diferent to -1 and source
    // and destination equals to move in the same list

    if (
        sourceListIndex === -1 ||
        destinationListIndex === -1 ||
        sourceListIndex === destinationListIndex
    ) {
        // move inside of the same list

        //get the list source
        const list = board.lists[sourceListIndex];

        //source index its gonne be the old index ,will be changed to new index
        const oldIndex = list.tasks.findIndex((task) => task.id === activeId);
        //destination index ,will be the new index
        const newIndex = list.tasks.findIndex((task) => task.id === overId);

        //get the task of the lists ,and pass the new index and old index to change the order using the funcion arrayMove
        const updatedTasks = arrayMove(list.tasks, oldIndex, newIndex);

        //get all lists
        const updatedLists = [...board.lists];
        //and replace in the espcefific list ,in this case the source list , and remplace task for the
        //updatedTasks with data already ordered
        updatedLists[sourceListIndex] = { ...list, tasks: updatedTasks };

        //set data

        updateBoardObj({
            lists: updatedLists,
        });
        // setLists(updatedLists);
    } else {
        // move between different list , get the lists from  the source and destination
        const sourceList = board.lists[sourceListIndex];
        const destinationList = board.lists[destinationListIndex];

        //find the task to move , must be searched within the sorce list ,where task,id equals to activeId(task that
        // is movingk)
        const taskToMove = sourceList.tasks.find((task) => task.id === activeId);

        if (!taskToMove) return;

        //its filtered with the task.id diferent to active id within source list
        const updatedSourceTasks = sourceList.tasks.filter(
            (task) => task.id !== activeId
        );
        //index to insert ,find in the destinationlist where taskid = task destination
        const insertIndex = destinationList.tasks.findIndex(
            (task) => task.id === overId
        );
        //get the tasks of the destinationlist
        const updatedDestinationTasks = [...destinationList.tasks];

        //if insert index ==-1 means that was moved not a task,so the task to move its gonna push to arry of destinationlist
        if (insertIndex === -1) {
            updatedDestinationTasks.push(taskToMove);
        } else {
            //its push in the destinationlist en la position to insert ,its moved the taskToMove
            updatedDestinationTasks.splice(insertIndex, 0, taskToMove);
        }

        //get the lists in initial state
        const updatedLists = [...board.lists];
        //and update list in the position sourcelistindex ,its only modified the tasks
        //its replaced with the different tasks instead the task that is moving
        updatedLists[sourceListIndex] = {
            ...sourceList,
            tasks: updatedSourceTasks,
        };
        //and update list in the position destinationListIndex ,its only modified the tasks
        //its replaced with array of tasks destination with the task moved inside
        updatedLists[destinationListIndex] = {
            ...destinationList,
            tasks: updatedDestinationTasks,
        };
        // setLists(updatedLists);
        updateBoardObj({
            lists: updatedLists,  // <-- aquí también
        });
    }

    setActiveTask(null);
    setActiveList(null);
}
function handleDragStart(
    event: DragStartEvent,
    board: Board,
    setActiveTask: (task: Task | null) => void,
    setActiveList: (list: List | null) => void
) {
    const { active } = event;


    if (typeof active.id === "string" && active.id.startsWith("task")) {
        const taskId = active.id
        const task = board.lists.flatMap((l) => l.tasks).find((t) => t.id === taskId);
        setActiveTask(task || null);
    }

    if (typeof active.id === "string" && active.id.startsWith("list")) {
        const listId = active.id
        const list = board.lists.find((l) => l.id === listId);
        setActiveList(list || null);
    }


}

export { DragEndInList, handleDragStart };
