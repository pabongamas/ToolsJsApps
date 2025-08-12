import { Task } from "@/app/types/typesBoard";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { EditorContext } from "@tiptap/react";
import { useState } from "react";

export default function EditorDescription({
    task,
    onSave,
}: {
    task: Task;
    onSave: (html: string) => void;
}) {
    const [currentHtml, setCurrentHtml] = useState<string>(
        task.description || ""
    );
    return (
        <>
            <SimpleEditor content={task.description} onSave={setCurrentHtml} />
            <div>
                <Button
                    className="bg-primary"
                    onClick={() => {
                        onSave(currentHtml)
                    }}
                >
                    Save
                </Button>
            </div>
        </>
    );
}
