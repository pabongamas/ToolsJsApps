"use client";
import { useDraggable } from "@dnd-kit/core";
import { Task } from "../types/typesBoard";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskDragable({ task, itsOverlay }: { task: Task, itsOverlay?: boolean }) {
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
    opacity: isDragging ? 0 : 1
  };
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
        className="border-2 p-1 pl-2 bg-white border-white shadow-gray-400  shadow-sm rounded-md" >
        {task.title}
      </div>
    </div>
  );
}
