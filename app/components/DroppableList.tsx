"use client";
import { List, Task } from "../types/typesBoard";
import { useDroppable } from "@dnd-kit/core";
import TaskDragable from "./TaskDragable";
import { SortableContext } from "@dnd-kit/sortable";
import {
    ArrowRightIcon,
    PlusCircleIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuidv4 } from "uuid";
import { useListTaskContext } from "../contexts/ListTaskContext";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";

export default function DroppableList({ list }: { list: List }) {
    //i use context to controlate the list where i am creating a new task ,i needed because when i want to move the element dragoverlay of list
    //   i want to see if i create a new field to add and see i've written something inside
    const {
        lists,
        updateLists,
        addNewCardTaskList,
        startAddingCardTask,
        updateAddingCardTask,
        stopAddingCardTask,
        addNewTaskToListByCard,
        editTitleList
    } = useListTaskContext();
    const { setNodeRef } = useDroppable({
        id: list.id,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const inputEditTitleList = useRef<HTMLInputElement>(null);

    //its combined the ref of the useDroppable with a new node ref to control when its click the list
    const setCombinedRef = useCallback(
        (node: HTMLDivElement | null) => {
            // 1) Ref to dnd-kit
            setNodeRef(node);
            // 2) Ref to click-outside
            containerRef.current = node;
        },
        [setNodeRef]
    );

    const [addNewCard, SetAddNewCard] = useState<boolean>(false);
    const [editingTitleListField, SetEditingTitleListField] =
        useState<boolean>(false);

    const createTaskObj = (list: List): Task => {
        const objNewCardTask: Task = {
            id: `taskNew-${uuidv4()}`,
            title: "",
            description: "",
            completed: false,
            // new task obj its created with this param to control that is being created by card
            belongListId: list.id,
        };
        return objNewCardTask;
    };

    const debouncedUpdate = useMemo(
        () =>
            debounce((value: string) => {
                updateAddingCardTask(value);
            }, 100),
        [updateAddingCardTask]
    );
    // update title every time something is written
    const debouncedUpdateTitle = useMemo(
        () =>
            debounce((value: string) => {
                editTitleList(list, value);
            }, 100),
        [editTitleList]
    );
    // Handler that i want drop when  i ckick outside list, always verify if the card that is adding it has written in  the card something
    //this method works when you click outside o type  KEY ENTER
    const finishAdding = () => {
        if (addNewCard && addNewCardTaskList?.belongListId === list.id) {
            if (addNewCardTaskList.title !== "") {
                addNewTaskToListByCard();
            }
            stopAddingCardTask();
            SetAddNewCard(false);
        }
    };

    // mount / dismount listener of globals clicks
    useEffect(() => {
        if (!addNewCard) return;
        const onClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                finishAdding();
            }
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        };
    }, [addNewCard, addNewCardTaskList]);

    //control  input edit  title of list
    useEffect(() => {
        if (!editingTitleListField) return;
        const onClickOutside = (e: MouseEvent) => {
            if (
                inputEditTitleList.current &&
                !inputEditTitleList.current.contains(e.target as Node)
            ) {
                SetEditingTitleListField(false)
            }
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        };
    }, [editingTitleListField]);

    return (
        <div className="w-full  flex flex-col justify text-sm" ref={setCombinedRef}>
            {!editingTitleListField ? (
                <div
                    className="pb-2 pl-2.5 cursor-pointer"
                    onClick={(e) => SetEditingTitleListField(true)}
                >
                    <h2 className="font-semibold text-sm text-gray-700">{list.title}</h2>
                </div>
            ) : (
                <div
                    className="p-1 cursor-pointer"
                // onClick={(e) => SetEditingTitleListField(true)}
                >
                    <Input
                        readOnly={false}
                        ref={inputEditTitleList}
                        autoFocus
                        onChange={(e) => {
                            debouncedUpdateTitle(e.target.value); // call to  updateAddingCardTask
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                SetEditingTitleListField(false)
                            }
                        }}
                        defaultValue={list.title}
                        className="bg-white focus-visible:border-ring focus-visible:ring-ring/0 focus:outline-nonefocus:bg-white focus:shadow-[inset_0_0_0_2px_#388bff] "
                    />
                </div>
            )}

            {list.tasks.map((task: Task) => (
                <TaskDragable key={`${task.id}`} task={task} />
            ))}
            {!addNewCard &&
                (addNewCardTaskList === null ||
                    addNewCardTaskList.belongListId !== list.id) && (
                    <div className={` p-1 cursor-pointer transform `}>
                        <div
                            className="p-1 flex gap-1"
                            style={{ color: list.color, filter: "brightness(50%)" }}
                            onClick={() => {
                                const objNewCardTask = createTaskObj(list);
                                startAddingCardTask(objNewCardTask);
                                SetAddNewCard(true);
                            }}
                        >
                            <PlusIcon className="w-5" />
                            <button className="cursor-pointer">Add a card</button>
                        </div>
                    </div>
                )}
            {addNewCard || addNewCardTaskList?.belongListId === list.id ? (
                <div className={` p-1 cursor-pointer transform `}>
                    <Textarea
                        onChange={(e) => {
                            debouncedUpdate(e.target.value); // call to  updateAddingCardTask
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                finishAdding();
                            }
                        }}
                        defaultValue={
                            addNewCardTaskList?.belongListId === list.id
                                ? addNewCardTaskList.title
                                : ""
                        }
                        placeholder="Enter a title or paste a link"
                        className="bg-white resize-none h-12 focus-visible:border-ring focus-visible:ring-ring/0"
                    />
                </div>
            ) : null}
        </div>
    );
}
