import { Board } from "@/app/types/typesBoard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { useListTaskContext } from "@/app/contexts/ListTaskContext";
import { title } from "process";


export default function HeaderBoard({ boardLoaded }: { boardLoaded: Board }) {
  const [editTitleBoard, setEditTitleBoard] = useState<boolean>(false);
  const inputEditTitleBoard = useRef<HTMLInputElement>(null);

  const { board, updateBoardObj } = useListTaskContext();



  // update title every time something is written
  const debouncedUpdateTitle = useMemo(
    () =>
      debounce((value: string) => {
        updateBoardObj({ title: value });
      }, 100),
    [updateBoardObj]
  );


  //control  input edit  title of board
  useEffect(() => {
    if (!editTitleBoard) return;
    const onClickOutside = (e: MouseEvent) => {
      if (
        inputEditTitleBoard.current &&
        !inputEditTitleBoard.current.contains(e.target as Node)
      ) {
        setEditTitleBoard(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [editTitleBoard]);

  return (
    <header
      className={`flex items-center justify-between p-1  text-white  w-full bg-black/10 rounded-2xl rounded-b-none`}
    >
      {!editTitleBoard && (
        <>
          <Button
            onClick={() => setEditTitleBoard(true)}
            className=" tex-sm font-semibold bg-transparent hover:bg-black/10 cursor-pointer"
          >
            {boardLoaded.title}
          </Button>
          <div>
            <Button
              title="Menu Board"
              className="cursor-pointer w-4 h-6 ml-auto bg-transparent filter transition 
                     duration-200 ease-in-out hover:bg-black/10"
            >
              <EllipsisHorizontalIcon className="text-white" />
            </Button>
          </div>
        </>
      )}
      {editTitleBoard && (
        <>
          <Input onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setEditTitleBoard(false);
            }
          }}
            ref={inputEditTitleBoard}
            autoFocus
            onChange={(e) => {
              debouncedUpdateTitle(e.target.value); 
            }}
            size={Math.max(boardLoaded.title.length, 1)}
            className="w-auto text-gray-900 bg-white focus-visible:border-ring focus-visible:ring-ring/0 focus:outline-nonefocus:bg-white focus:shadow-[inset_0_0_0_2px_#388bff] " defaultValue={boardLoaded.title}></Input>
        </>
      )}
    </header>
  );
}
