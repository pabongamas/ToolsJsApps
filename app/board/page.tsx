import LeftBar from "./leftBar";
import MainBoard from "./mainBoard";
import { ListTaskProvider } from "../contexts/ListTaskContext";

export default function Board() {
  return (
    <>
      <ListTaskProvider>
        <div className="flex w-full h-screen p-5 gap-3">
          <LeftBar />
          <MainBoard />
        </div>
      </ListTaskProvider>
    </>
  );
}
