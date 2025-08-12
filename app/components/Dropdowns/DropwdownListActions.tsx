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
import { EllipsisHorizontalIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface params{
    list:List,
    addCardAction:()=>void
}

export default function DropdownListActions({list,addCardAction}:params) {
    const {updateList}=useListTaskContext();
    const changeColorList=(list:List,color:string)=>{
        updateList(list,{color:color})
    }
    return (
        <>
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
                    <DropdownMenuItem onClick={()=>{addCardAction()}}>
                        Add card
                    </DropdownMenuItem>
                    <DropdownMenuItem >
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
                            <div onClick={()=>changeColorList(list,"green")} className="colorMod w-9 h-6  bg-greenApp-50  hover:bg-greenApp-100"></div>
                            <div onClick={()=>changeColorList(list,"yellow")} className="colorMod w-9 h-6 bg-yellowApp-50  hover:bg-yellowApp-100 "></div>
                            <div onClick={()=>changeColorList(list,"orange")} className="colorMod w-9 h-6 bg-orangeApp-50  hover:bg-orangeApp-100"></div>
                            <div onClick={()=>changeColorList(list,"red")} className="colorMod w-9 h-6 bg-redApp-50  hover:bg-redApp-100"></div>
                            <div onClick={()=>changeColorList(list,"purple")} className="colorMod w-9 h-6 bg-purpleApp-50  hover:bg-purpleApp-100"></div>
                            <div onClick={()=>changeColorList(list,"blue")} className="colorMod w-9 h-6 bg-blueApp-50  hover:bg-blueApp-100"></div>
                            <div onClick={()=>changeColorList(list,"blueSky")} className="colorMod w-9 h-6 bg-blueSkyApp-50  hover:bg-blueSkyApp-100"></div>
                            <div onClick={()=>changeColorList(list,"lime")} className="colorMod w-9 h-6 bg-limeApp-50  hover:bg-limeApp-100"></div>
                            <div onClick={()=>changeColorList(list,"magenta")} className="colorMod w-9 h-6 bg-magentaApp-50  hover:bg-magentaApp-100"></div>
                            <div onClick={()=>changeColorList(list,"gray")} className="colorMod w-9 h-6 bg-grayApp-50  hover:bg-grayApp-100"></div>
                        </div>

                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <div className="w-full">

                            <Button onClick={()=>changeColorList(list,"listbase")} className="w-full bg-listbaseApp-50 hover:bg-gray-300 text-gray-600 flex gap-0"><XMarkIcon />Remove color</Button>
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
        </>
    );
}
