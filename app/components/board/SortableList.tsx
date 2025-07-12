import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { List } from "../../types/typesBoard";
import DroppableList from "./DroppableList";
import { CSS } from "@dnd-kit/utilities";

export default function SortableList({
  list,
  itsOverlay = false,
}: {
  list: List;
  itsOverlay?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div
      className={`bg-${list.color}App-50 flex-none cursor-grab transform w-[200px]  p-2 rounded-md ${
        itsOverlay ? "rotate-6" : ""
      }`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="">
        <SortableContext
          items={list.tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <DroppableList list={list} />
        </SortableContext>
      </div>
    </div>
  );
}
