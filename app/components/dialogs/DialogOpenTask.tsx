import { useListTaskContext } from "@/app/contexts/ListTaskContext";
import { Task } from "@/app/types/typesBoard";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    CheckIcon,
    ChevronDownIcon,
    DocumentTextIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import EditorDescription from "../board/editor/EditorDescription";

export default function DialogOpenTask({
    taskToOpenDialog,
}: {
    taskToOpenDialog: { task: Task; listId: string };
}) {
    const { setTaskToDialog, board, updateStateTask, updateValueTask } = useListTaskContext();
    const [editDescriptionTask, SetEditDescriptionTask] = useState<boolean>(false);

    const listMain = board.lists.find(
        (value) => value.id === taskToOpenDialog.listId
    );
    const baseDot =
        "w-3 h-3 mr-1 rounded-full transition-colors duration-1000 ease-in-out cursor-pointer z-40";
    const completedDot = "bg-green-500";
    const hoverDot =
        "bg-white border border-gray-400 transition duration-1000 ease-in-out  hover:scale-105";

    const changeStateTask = (task: Task, state: boolean, listId?: string) => {
        updateStateTask(task, state, listId);
        taskToOpenDialog.task.completed = state;
    };



    return (
        <>
            <Dialog
                modal
                open={taskToOpenDialog !== null}
                onOpenChange={(isOpen) => {
                    if (!isOpen) setTaskToDialog(null);
                }}
            >
                <DialogContent className="p-0 top-8  translate-y-0 gap-0 max-w-fit">
                    <div
                        className={`flex items-center justify-between p-2  text-white  w-full h-auto border-b-1 `}
                    >
                        <DialogHeader>
                            <div>
                                <Button
                                    className={`w-auto h-auto bg-${listMain?.color}App-50 gap-0 flex items-center text-primary hover:bg-${listMain?.color}App-100
                         text-xs`}
                                >
                                    {listMain?.title}
                                    <ChevronDownIcon />
                                </Button>
                            </div>
                        </DialogHeader>
                    </div>
                    <div>
                        <div className="p-6 pt-0 pb-0">
                            <div className="flex ">
                                <div className="flex-3/4 border-r-1 pr-6 pt-4">
                                    <DialogHeader className="flex">
                                        <DialogTitle>
                                            <div className="flex items-center">
                                                <div
                                                    title={
                                                        taskToOpenDialog.task.completed
                                                            ? "Mark imcomplete"
                                                            : "Mark complete"
                                                    }
                                                    className={`${baseDot} ${taskToOpenDialog.task.completed
                                                        ? completedDot
                                                        : hoverDot
                                                        }`}
                                                    onClick={() =>
                                                        changeStateTask(
                                                            taskToOpenDialog.task,
                                                            !taskToOpenDialog.task.completed,
                                                            taskToOpenDialog.listId
                                                        )
                                                    }
                                                >
                                                    {taskToOpenDialog.task.completed && (
                                                        <div className="">
                                                            <CheckIcon className="text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <span>{taskToOpenDialog.task.title}</span>
                                            </div>
                                            <div className="flex pl-5 pr-5 w-full pt-3">
                                                <Button className="w-auto h-auto gap-0 p-1 rounded-none bg-transparent hover:bg-black/10 border-1 text-primary flex justify-center items-center">
                                                    <PlusIcon />
                                                    Add
                                                </Button>
                                            </div>
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="pt-5 flex">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center ">
                                                <DocumentTextIcon className="w-4" />
                                                <span>Description</span>
                                            </div>
                                            {!editDescriptionTask &&
                                                <div className="flex">
                                                    <Button
                                                        onClick={() => SetEditDescriptionTask(true)}
                                                        className="bg-listbaseApp-50 hover:bg-black/10 w-auto h-auto text-primary  gap-0 p-1 pl-3 pr-3 border-1 rounded-none">Edit</Button>
                                                </div>
                                            }

                                        </div>

                                    </div>
                                    {!editDescriptionTask && <div onClick={() => SetEditDescriptionTask(true)} className="pl-5 pr-5 cursor-pointer">
                                        <div
                                            className="prose max-w-none"               /* opcional: tailwind-typography */
                                            dangerouslySetInnerHTML={{
                                                __html: taskToOpenDialog.task.description || '<p></p>',
                                            }}
                                        />
                                    </div>

                                    }
                                    {editDescriptionTask &&
                                        <div>
                                            <EditorDescription onSave={(html) => {
                                                const updatedTask: Task = {
                                                    ...taskToOpenDialog.task,
                                                    description: html,
                                                };
                                                updateValueTask(updatedTask, taskToOpenDialog.listId)
                                                setTaskToDialog(updatedTask, taskToOpenDialog.listId);
                                                SetEditDescriptionTask(false);
                                            }}
                                                task={taskToOpenDialog.task} />
                                        </div>

                                    }
                                    <div className="h-6">
                                    </div>
                                </div>
                                <div className="flex-1/4"></div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
