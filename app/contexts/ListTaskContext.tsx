"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { List, Task, Board } from "../types/typesBoard";
import { v4 as uuidv4 } from "uuid";

interface ListTaskContextValue {
  board: Board;
  updateBoard: (board: Board) => void;
  updateBoardObj: (changes: Partial<Board>) => void;
  lists: List[];
  updateLists: (lists: List[]) => void;
  addNewCardTaskList: Task | null;
  startAddingCardTask: (Task: Task) => void;
  updateAddingCardTask: (text: string) => void
  stopAddingCardTask: () => void;
  addNewTaskToListByCard: (insertPosition: number | null) => void;
  updateList: (ListEdit: List, changes: Partial<List>) => void;
  updateStateTask: (task: Task, newState: boolean, listId?: string) => void;
  updateValueTask: (task: Task, listId: string) => void;
  taskToOpenDialog: { task: Task, listId: string } | null;
  setTaskToDialog: (task: Task | null, listId?: string) => void;
}
const initialLists: List[] = [
  {
    id: `listToday-${uuidv4()}`,
    title: "Today",
    color: "purple",
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
    color: "red",
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
    color: "yellow",
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
const boardInitial: Board = {
  id: `board-${uuidv4()}`,
  color: "ocean",
  title: "My trello Board",
  lists: initialLists
}

const ListTaskContext = createContext<ListTaskContextValue | undefined>(
  undefined
);

export function ListTaskProvider({ children }: { children: ReactNode }) {

  const [taskToOpenDialog, setTaskToOpenDialog] = useState<{ task: Task, listId: string } | null>(null)
  const setTaskToDialog = (task: Task | null, listId?: string) => {
    if (task === null) {
      setTaskToOpenDialog(null);
    } else {
      if (!listId) {
        throw new Error("listId es required when task is not null");
      }
      setTaskToOpenDialog({ task, listId });
    }
  };

  //use state to control the data in all the context ,this can be obteined in every component that is in the context
  const [lists, setLists] = useState<List[]>(initialLists);
  const updateLists = (lists: List[]) => setLists(lists);


  const [board, setBoard] = useState<Board>(boardInitial);
  const updateBoard = (board: Board) => setBoard(board);

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

  const addNewTaskToListByCard = (insertPosition: number | null = null) => {
    if (!addNewCardTaskList) return;
    updateBoardObj({
      lists: board.lists.map(list => {
        if (list.id !== addNewCardTaskList.belongListId) {
          return list;
        }

        // clone current task
        const updatedTasks = [...list.tasks];

        if (insertPosition !== null && insertPosition >= 0 && insertPosition <= updatedTasks.length) {
          // insert in the specified position 
          updatedTasks.splice(insertPosition, 0, addNewCardTaskList);
        } else {
          // if there is not valid position , add at the end 
          updatedTasks.push(addNewCardTaskList);
        }

        return { ...list, tasks: updatedTasks };
      })
    });

    stopAddingCardTask();
  };
  const updateList = (listEdit: List, changes: Partial<List>) => {
    updateBoardObj({
      lists: board.lists.map(list =>
        list.id === listEdit.id
          ? { ...list, ...changes }
          : list
      )
    });
  }

  const updateStateTask = (taskEdit: Task, newState: boolean, listId?: string) => {
    updateBoardObj({
      lists: board.lists.map(list =>
        list.id === listId
          ? {
            ...list, tasks: list.tasks.map(task =>
              task.id === taskEdit.id
                ? { ...task, completed: newState }
                : task
            ),
          }
          : list
      )
    });
  }


  const updateValueTask = (taskEdit: Task, listId?: string) => {
    updateBoardObj({
      lists: board.lists.map(list => {
        return list.id === listId
          ? {
            ...list, tasks: list.tasks.map(task => {
              return task.id === taskEdit.id
                ? taskEdit
                : task
            }
            ),
          }
          : list
      }
      )
    });
  }



  const updateBoardObj = (changes: Partial<Board>) => {
    setBoard(prevBoard => ({
      ...prevBoard,
      ...changes,
    }));
  };

  return (
    <ListTaskContext.Provider
      value={{
        board,
        updateBoard,
        updateBoardObj,
        lists,
        updateLists,
        addNewCardTaskList,
        startAddingCardTask,
        updateAddingCardTask,
        stopAddingCardTask,
        addNewTaskToListByCard,
        updateList,
        updateStateTask,
        updateValueTask,
        taskToOpenDialog,
        setTaskToDialog,
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
