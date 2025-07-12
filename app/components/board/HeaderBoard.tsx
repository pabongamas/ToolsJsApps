import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function HeaderBoard() {
  const [editTitleBoard, setEditTitleBoard] = useState<boolean>(false);
  return (
    <header
      className={`flex items-center justify-between p-3  text-white  w-full bg-black/10 rounded-2xl rounded-b-none`}
    >
      {!editTitleBoard && (
        <>
          <Button
            onClick={() => setEditTitleBoard(true)}
            className=" tex-sm font-semibold bg-transparent hover:bg-black/10 cursor-pointer"
          >
            My Trello board
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
          <Input className="w-3/12"></Input>
        </>
      )}
    </header>
  );
}
