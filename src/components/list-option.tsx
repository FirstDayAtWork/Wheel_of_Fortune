import { TrashIcon } from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import type { WheelDataList } from "@/utils/wheel-data";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type ListOptionProps = {
  data: WheelDataList;
  remove: (id: number) => void;
  update: (newValue: WheelDataList) => void;
};

export default function ListOption(props: ListOptionProps) {
  const { data, remove, update } = props;
  const [optionValue, setOptionValue] = useState(data);
  const delayedOptionValue = useDebounce(optionValue, 500);

  const id = optionValue.id + optionValue.weight;

  function handleChange(event: ChangeEvent<HTMLInputElement>, type: "title" | "weight") {
    const value = event.target.value;

    setOptionValue({
      id: optionValue.id,
      title: type === "title" ? value : optionValue.title,
      weight: type === "weight" ? value : optionValue.weight,
    });
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    update(delayedOptionValue);
  }, [delayedOptionValue]);

  return (
    <div className="flex gap-2.5">
      <Label htmlFor={id} className="text-sm flex-none">
        {`#${optionValue.id}`}
      </Label>

      <Input
        onChange={(e) => handleChange(e, "title")}
        type="text"
        placeholder="Title"
        name="title"
        id={id}
        className="flex-4 h-9"
        value={optionValue.title}
      ></Input>

      <Input
        type="number"
        placeholder="Weight"
        name="weight"
        className="flex-1 h-9"
        onChange={(e) => handleChange(e, "weight")}
        value={optionValue.weight}
        min={0}
        max={10}
      ></Input>

      <Button variant="destructive" size="icon" onClick={() => remove(optionValue.id)}>
        <TrashIcon />
      </Button>
    </div>
  );
}
