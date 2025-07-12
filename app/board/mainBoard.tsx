"use client";

import { useEffect, useState } from "react";

import {
    DndContext,
    DragOverlay,
    pointerWithin,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import DroppableList from "../components/board/DroppableList";
import { List, Task } from "../types/typesBoard";
import TaskDragable from "../components/board/TaskDragable";
import SortableList from "../components/board/SortableList";

import { DragEndInList, handleDragStart } from "../functions/DragAndDrop";
import { Button } from "@/components/ui/button";
import { useListTaskContext } from "../contexts/ListTaskContext";
import { v4 as uuidv4 } from "uuid";
import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/outline";
import DialogOpenTask from "../components/dialogs/DialogOpenTask";
import DropdownListActions from "../components/Dropdowns/DropwdownListActions";
import HeaderBoard from "../components/board/HeaderBoard";


export default function MainBoard() {
    const { board, updateBoard, updateBoardObj, lists, updateLists, taskToOpenDialog } = useListTaskContext();
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [activeList, setActiveList] = useState<List | null>(null);

    const [mainBackGround, setMainBackGround] = useState<string>(`/bGradients/${board.color}.svg`)

    useEffect(() => { }, [updateLists]);

    const newElement = () => {
        const obj: List = {
            id: `listNew-${uuidv4()}`,
            title: "New list",
            color: "listbase",
            tasks: [
            ]
        };
        updateBoardObj({
            // replace only the property lists with a new array
            lists: [...board.lists, obj],
        });
    };

    // with this i can control that the list o task when im gonna move , its moved ,and if i just click doesn't drag overlay
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        })
    );

    return (
        <div style={{
            backgroundImage: `url(${mainBackGround})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }} className={`w-full sm:w-6/12 md:w-10/12   flex flex-col  rounded-2xl`}>
            <HeaderBoard />
            <div className={`flex-1 overflow-x-auto `}>
                <div className="flex items-start gap-5 p-5">
                    <DndContext
                        sensors={sensors}
                        onDragStart={(event) =>
                            handleDragStart(event, board, setActiveTask, setActiveList)
                        }
                        onDragEnd={(event) =>
                            DragEndInList(event, board,updateBoardObj, setActiveTask, setActiveList)
                        }
                        //its important this , its gonna detect the elements that are directly under the mouse pointer.
                        collisionDetection={pointerWithin}
                    >
                        <SortableContext
                            items={board.lists.map((l) => l.id)}
                            strategy={horizontalListSortingStrategy}
                        >
                            {board.lists.map((list) => (
                                <SortableList key={list.id} list={list} />
                            ))}
                            <div onClick={(e) => newElement()}
                                className={`flex-none cursor-grab transform w-[200px]
                           p-2 rounded-md  bg-blue-400 brightness-[0.9] text-white `}>
                                <div className="flex gap-1 justify-center text-sm">
                                    <PlusIcon className="w-5" />
                                    <button className="cursor-pointer" >
                                        Add another list
                                    </button>
                                </div>
                            </div>
                        </SortableContext>

                        <DragOverlay>
                            {activeTask ? (
                                <div className="p-1 transform scale-105">
                                    <TaskDragable task={activeTask} itsOverlay={true} />
                                </div>
                            ) : activeList ? (
                                <SortableList itsOverlay={true} list={activeList} />
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                    {taskToOpenDialog &&
                        <DialogOpenTask taskToOpenDialog={taskToOpenDialog} />
                    }
                </div>

            </div>
        </div>
    );
}
