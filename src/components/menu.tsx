import { useNavigate } from "@tanstack/react-router";
import { BrushCleaningIcon, PlayIcon, PlusIcon } from "lucide-react";
import { useStorage } from "@/hooks/useStorage";
import { type WheelDataList, wheelData } from "@/utils/wheel-data";
import ListOption from "./list-option";
import { LoadFileModal } from "./load-file-modal/load-file-modal";
import { SaveFileModal } from "./save-file-modal/save-file-modal";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Heading } from "./ui/typography";

export default function Menu() {
  const [lsValue, setLSValue] = useStorage(wheelData, "wheel_data");

  const navigate = useNavigate();

  function remove(id: number) {
    const edited = lsValue.list.filter((item) => item.id !== id);
    setLSValue({ idCounter: lsValue.idCounter, list: edited });
  }

  function clear() {
    setLSValue(wheelData);
  }

  function add() {
    const counter = lsValue.idCounter + 1;

    setLSValue({
      idCounter: counter,
      list: [...lsValue.list, { id: counter, title: "", weight: 1, hash: crypto.randomUUID() }],
    });
  }

  function update(newValue: WheelDataList) {
    const updated = lsValue.list.map((item) => (item.id === newValue.id ? newValue : item));

    setLSValue({
      idCounter: lsValue.idCounter,
      list: [...updated],
    });
  }

  function replace(newData: WheelDataList[]) {
    setLSValue({
      idCounter: newData.length,
      list: [...newData],
    });
  }

  function start() {
    navigate({ to: "/wheel" });
  }

  return (
    <div className="bg-muted/50 w-full max-w-3xl rounded-lg flex flex-col p-5 gap-5 text-center">
      <Heading size={"h2"}>Decision Making Tool</Heading>

      <div className="flex gap-2.5 items-center">
        <ButtonGroup className="gap-2.5">
          <Button onClick={add}>
            <PlusIcon className="size-5" />
            Add
          </Button>

          <Button onClick={clear}>
            <BrushCleaningIcon className="size-5" />
            Clear All
          </Button>

          <LoadFileModal replace={replace} />

          <SaveFileModal data={lsValue} />

          <Button onClick={start} disabled={lsValue.list.length < 2}>
            <PlayIcon className="size-5" />
            Start Wheel
          </Button>
        </ButtonGroup>
      </div>

      <div className="flex flex-col gap-2.5">
        {lsValue.list.map((data) => (
          <ListOption key={data.hash} data={data} remove={remove} update={update}></ListOption>
        ))}
      </div>
    </div>
  );
}
