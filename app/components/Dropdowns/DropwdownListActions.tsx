import { useListTaskContext } from "@/app/contexts/ListTaskContext";
import { List } from "@/app/types/typesBoard";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EllipsisHorizontalIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface params {
    list: List,
    addCardAction: () => void,
}

export default function DropdownListActions({ list, addCardAction }: params) {
    const [copyList, setCopyList] = useState(false);
    const [closingDropdown, setClosingDropdown] = useState(false);
    const { updateList, updateBoardObj, board } = useListTaskContext();
    const changeColorList = (list: List, color: string) => {
        updateList(list, { color: color })
    }
    const copyListFn = () => {
        setCopyList(true);
        setClosingDropdown(true);
    }
    const saveCopyList = () => {
        const listCopy: List = {
            ...list,
            id: "listCopy_" + crypto.randomUUID(),
            title: list.title + " (Copy)",
            tasks: list.tasks.map((task) => ({
                ...task,
                id: "taskCopy_" + crypto.randomUUID(),
            })),
        };

        const listFilteredIndex = board.lists.findIndex(listValue => listValue.id === list.id);

        // Insert copy at the desired position without changing original array
        const newLists = [
            ...board.lists.slice(0, listFilteredIndex + 1),
            listCopy,
            ...board.lists.slice(listFilteredIndex + 1)
        ];

        setCopyList(false);
        setClosingDropdown(false);

        updateBoardObj({
            ...board,
            lists: newLists
        });
    }

    return (
        <>
            {!closingDropdown && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button title="List actions"
                            className="cursor-pointer w-4 h-6 ml-auto bg-transparent filter transition 
                     duration-200 ease-in-out hover:bg-black/10"
                        >
                            <EllipsisHorizontalIcon className="text-gray-700" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent >
                        <DropdownMenuLabel className="text-center">
                            <div className="flex justify-center items-center">
                                <div className="flex justify-center">List actions</div>
                                <Button className=" bg-transparent hover:bg-gray-300 text-gray-600 w-6 h-6 right-3 absolute">
                                    <XMarkIcon className="" />
                                </Button>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => { addCardAction() }}>
                            Add card
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { copyListFn() }}>
                            Copy list
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Move list
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Watch
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="border-0 h-[0.5]" />

                        <DropdownMenuLabel className="text-center">Change list color</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <div className="grid grid-cols-5 gap-1">
                                <div onClick={() => changeColorList(list, "green")} className="colorMod w-9 h-6  bg-greenApp-50  hover:bg-greenApp-100"></div>
                                <div onClick={() => changeColorList(list, "yellow")} className="colorMod w-9 h-6 bg-yellowApp-50  hover:bg-yellowApp-100 "></div>
                                <div onClick={() => changeColorList(list, "orange")} className="colorMod w-9 h-6 bg-orangeApp-50  hover:bg-orangeApp-100"></div>
                                <div onClick={() => changeColorList(list, "red")} className="colorMod w-9 h-6 bg-redApp-50  hover:bg-redApp-100"></div>
                                <div onClick={() => changeColorList(list, "purple")} className="colorMod w-9 h-6 bg-purpleApp-50  hover:bg-purpleApp-100"></div>
                                <div onClick={() => changeColorList(list, "blue")} className="colorMod w-9 h-6 bg-blueApp-50  hover:bg-blueApp-100"></div>
                                <div onClick={() => changeColorList(list, "blueSky")} className="colorMod w-9 h-6 bg-blueSkyApp-50  hover:bg-blueSkyApp-100"></div>
                                <div onClick={() => changeColorList(list, "lime")} className="colorMod w-9 h-6 bg-limeApp-50  hover:bg-limeApp-100"></div>
                                <div onClick={() => changeColorList(list, "magenta")} className="colorMod w-9 h-6 bg-magentaApp-50  hover:bg-magentaApp-100"></div>
                                <div onClick={() => changeColorList(list, "gray")} className="colorMod w-9 h-6 bg-grayApp-50  hover:bg-grayApp-100"></div>
                            </div>

                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div className="w-full">

                                <Button onClick={() => changeColorList(list, "listbase")} className="w-full bg-listbaseApp-50 hover:bg-gray-300 text-gray-600 flex gap-0"><XMarkIcon />Remove color</Button>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="border-0 h-[0.5]" />
                        <DropdownMenuItem>
                            <div className="w-full">
                                Archive this list
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            {copyList && (
                <DropdownMenu open={copyList}  >
                    <DropdownMenuTrigger asChild>
                        <Button title="List actions"
                            className="cursor-pointer w-4 h-6 ml-auto bg-transparent filter transition 
                     duration-200 ease-in-out hover:bg-black/10"
                        >
                            <EllipsisHorizontalIcon className="text-gray-700" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-56" >
                        <DropdownMenuLabel className="text-center">
                            <div className="flex justify-center items-center">
                                <div className="flex justify-center">Copy List</div>
                                <Button className=" bg-transparent hover:bg-gray-300 text-gray-600 w-6 h-6 right-3 absolute cursor-pointer" onClick={() => { setCopyList(false); setClosingDropdown(false); }}>
                                    <XMarkIcon className="" />
                                </Button>
                            </div>
                        </DropdownMenuLabel>
                        <div className="w-full flex flex-col gap-2">
                            <div className={` p-1 cursor-pointer transform `}>
                                <span className="text-xs font-bold text-gray-500">Name</span>

                                <Textarea
                                    autoFocus
                                    defaultValue={list.title}
                                    placeholder="Enter a title or paste a link"
                                    className="bg-white h-12 focus-visible:border-ring focus-visible:ring-ring/0 w-full"
                                />
                            </div>
                            <div className="flex items-center p-1 gap-2 ">
                                <Button onClick={() => saveCopyList()} variant={"save"}>Save</Button>

                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

        </>
    );
}
