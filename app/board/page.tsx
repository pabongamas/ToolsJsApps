import LeftBar from "./leftBar";
import MainBoard from "./mainBoard";
import { ListTaskProvider } from "../contexts/ListTaskContext";

export default function Board() {
  return (
    <>
      <ListTaskProvider>
        <div className="flex w-full h-screen">
          <LeftBar />
          <MainBoard />
        </div>
      </ListTaskProvider>
    </>
  );
}
