"use client";
import { useDraggable } from "@dnd-kit/core";
import { Task } from "../../types/typesBoard";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useListTaskContext } from "../../contexts/ListTaskContext";
import DialogOpenTask from "../dialogs/DialogOpenTask";

export default function TaskDragable({
  task,
  itsOverlay,
  listId,
}: {
  task: Task;
  itsOverlay?: boolean;
  listId?: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };
  const { updateStateTask,setTaskToDialog } = useListTaskContext();

  const [isHoveredTask, setIsHoveredTask] = useState(false);

  const changeStateTask = (task: Task, state: boolean, listId?: string) => {
    updateStateTask(task, state, listId);
  };

  const baseDot =
    "w-3 h-3 mr-1 rounded-full transition-colors duration-1000 ease-in-out cursor-pointer z-40"
  const completedDot = "bg-green-500";
  const hoverDot = "bg-white border border-gray-400";
  return (
    <div
      key={`taskDragable-${task.id}`}
      className={`
    p-1 
    cursor-grab 
    transform ${itsOverlay ? "rotate-6" : ""}`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div
        className="border-2 p-1 pl-2 bg-white border-white shadow-gray-400  shadow-sm rounded-md"
        onMouseEnter={() => setIsHoveredTask(true)}
        onMouseLeave={() => setIsHoveredTask(false)}
        
      >
        <div className="flex items-center">
          <div
            title={task.completed ? "Mark imcomplete" : "Mark complete"}
            className={`${baseDot} ${task.completed ? completedDot : isHoveredTask ? hoverDot : ""
              }`}
            onClick={() => changeStateTask(task, !task.completed, listId)}
          >
            {task.completed && (
              <div className="">
                <CheckIcon className="text-white" />
              </div>
            )}
          </div>
          <span onClick={() => setTaskToDialog(task)} className="transition-all duration-1000 ease-in-out">
            {task.title}
          </span>
        </div>
      </div>
      
    </div>

  );
}
