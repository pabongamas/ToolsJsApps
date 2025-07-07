import { useListTaskContext } from "@/app/contexts/ListTaskContext";
import { Task } from "@/app/types/typesBoard"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export default function DialogOpenTask({ taskToOpenDialog }: { taskToOpenDialog: Task }) {

    const {setTaskToDialog}=useListTaskContext()
    return <>
        <Dialog open={taskToOpenDialog !== null}
            onOpenChange={(isOpen) => {
                if (!isOpen) setTaskToDialog(null);
            }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Task {taskToOpenDialog.title}</DialogTitle>
                    <DialogDescription>
                       {taskToOpenDialog.description}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </>
}


