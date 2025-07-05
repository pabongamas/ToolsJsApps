"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { List, Task } from "../types/typesBoard";
import { v4 as uuidv4 } from "uuid";

interface ListTaskContextValue {
  lists: List[];
  updateLists: (lists: List[]) => void;
  addNewCardTaskList: Task | null;
  startAddingCardTask: (Task: Task) => void;
  updateAddingCardTask: (text: string) => void
  stopAddingCardTask: () => void;
  addNewTaskToListByCard: () => void;
  editTitleList:(ListEdit:List,newTitle:string)=>void;
}
const initialLists: List[] = [
  {
    id: `listToday-${uuidv4()}`,
    title: "Today",
    color: "#ccc",
    tasks: [
      {
        id: `taskToday-${uuidv4()}`,
        title: "1ra task",
        description: "Description 1ra task",
        completed: true,
      },
      {
        id: `taskToday-${uuidv4()}`,
        title: "2ra task",
        description: "Description 2ra task",
        completed: false,
      },
      {
        id: `taskToday-${uuidv4()}`,
        title: "3ra task",
        description: "Description 3ra task",
        completed: false,
      },
    ],
  },
  {
    id: `listWeek-${uuidv4()}`,
    title: "this Week",
    color: "#F8E6A0",
    tasks: [
      {
        id: `taskWeek-${uuidv4()}`,
        title: "1ra task for the week",
        description: "Description 1ra task for the week",
        completed: true,
      },
      {
        id: `taskWeek-${uuidv4()}`,
        title: "2ra task for the week",
        description: "Description 2ra task for the week",
        completed: false,
      },
      {
        id: `taskWeek-${uuidv4()}`,
        title: "3ra task for the week",
        description: "Description 3ra task for the week",
        completed: false,
      },
    ],
  },
  {
    id: `listLater-${uuidv4()}`,
    title: "Later",
    color: "#BAF3DB",
    tasks: [
      {
        id: `taskLater-${uuidv4()}`,
        title: "1ra task for later",
        description: "Description 1ra task for later",
        completed: false,
      },
    ],
  },
];

const ListTaskContext = createContext<ListTaskContextValue | undefined>(
  undefined
);

export function ListTaskProvider({ children }: { children: ReactNode }) {
  //use state to control the data in all the context ,this can be obteined in every component that is in the context
  const [lists, setLists] = useState<List[]>(initialLists);
  const updateLists = (lists: List[]) => setLists(lists);

  //state to control when its gonna create a new card and the user wants to move elements with dragoverlay,
  // full implementation in DroppableList
  const [addNewCardTaskList, SetAddNewCardTaskList] = useState<Task | null>(
    null
  );
  //control the set of the variable addNewCardTaskList
  const startAddingCardTask = (task: Task) => SetAddNewCardTaskList(task);

  //update field text  in the addNewCardTaskList by SetAddNewCardTaskList
  const updateAddingCardTask = (text: string) => {
    if (!addNewCardTaskList) return;
    SetAddNewCardTaskList({
      ...addNewCardTaskList,
      title: text,
    });
  };
  const stopAddingCardTask = () => SetAddNewCardTaskList(null);

  const addNewTaskToListByCard = () => {
    if (!addNewCardTaskList) return;
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === addNewCardTaskList.belongListId
          ? { ...list, tasks: [...list.tasks, addNewCardTaskList] }
          : list
      )
    );

    stopAddingCardTask();
  };
  const editTitleList = (listEdit:List, newTitle:string) => {
    setLists((prevList) =>
      prevList.map((list) =>
        list.id === listEdit.id ? { ...list, title: newTitle } : list
      ))
  }

  return (
    <ListTaskContext.Provider
      value={{
        lists,
        updateLists,
        addNewCardTaskList,
        startAddingCardTask,
        updateAddingCardTask,
        stopAddingCardTask,
        addNewTaskToListByCard,
        editTitleList,
      }}
    >
      {children}
    </ListTaskContext.Provider>
  );
}
export function useListTaskContext() {
  const ctx = useContext(ListTaskContext);
  if (!ctx)
    throw new Error("ListTaskContext must be used within ListTaskProvider");
  return ctx;
}
