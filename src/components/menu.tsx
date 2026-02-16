import { useStorage } from "@/hooks/useStorage";
import { type WheelDataList, wheelData } from "@/utils/wheel-data";
import ListOption from "./list-option";
import { LoadFileModal } from "./load-file-modal/load-file-modal";
import { Button } from "./ui/button";
import { Heading } from "./ui/typography";

export default function Menu() {
  const [lsValue, setLSValue] = useStorage(wheelData, "wheel_data");

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

  return (
    <div className="bg-muted/50 w-full max-w-3xl rounded-lg flex flex-col p-5 gap-5 text-center">
      <Heading size={"h2"}>Decision Making Tool</Heading>

      <div className="flex gap-2.5">
        <Button onClick={add}>Add</Button>

        <Button onClick={clear}>Clear All</Button>

        <LoadFileModal replace={replace} />

        <Button>Save</Button>

        <Button>Start</Button>
      </div>

      <div className="flex flex-col gap-2.5">
        {lsValue.list.map((data) => (
          <ListOption key={data.hash} data={data} remove={remove} update={update}></ListOption>
        ))}
      </div>
    </div>
  );
}
