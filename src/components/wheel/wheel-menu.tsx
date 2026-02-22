import { Link } from "@tanstack/react-router";
import { CircleArrowLeftIcon, DicesIcon, LoaderPinwheelIcon } from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type WheelMenuProps = {
  updateSettings: (newValue: number) => void;
  settingsDuration: number;
};

export default function WheelMenu(props: WheelMenuProps) {
  const { updateSettings, settingsDuration } = props;

  const [duration, setDuration] = useState(settingsDuration || 5);
  const delayedDuration = useDebounce(duration, 500);

  function handleDurationChange(event: ChangeEvent<HTMLInputElement>) {
    setDuration(+event.target?.value);
  }

  function handleRandomDuration() {
    setDuration(Math.floor(Math.random() * 99) + 2);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    updateSettings(delayedDuration);
  }, [delayedDuration]);

  return (
    <div className="flex gap-2.5">
      <Link to={"/"}>
        <Button variant={"outline"}>
          <CircleArrowLeftIcon className="size-5" />
          BACK
        </Button>
      </Link>

      <Input
        onChange={handleDurationChange}
        placeholder="Duration"
        type="number"
        className=" h-9 max-w-25"
        step={1}
        min={1}
        max={100}
        value={duration}
        title="Duration"
      ></Input>

      <Button onClick={handleRandomDuration} variant={"outline"} title="Set Random Duration">
        <DicesIcon className="size-5" />
        RANDOM
      </Button>

      <Button className="w-40">
        <LoaderPinwheelIcon className="size-5" />
        SPIN WHEEL
      </Button>
    </div>
  );
}
