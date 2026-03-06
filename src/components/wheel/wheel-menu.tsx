import { Link } from "@tanstack/react-router";
import { CircleArrowLeftIcon, DicesIcon, LoaderPinwheelIcon } from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDebounce from "@/hooks/useDebounce";
import type { Settings } from "@/utils/wheel-data";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type WheelMenuProps = {
  updateSettings: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  settings: Settings;
};

export default function WheelMenu(props: WheelMenuProps) {
  const { updateSettings, settings } = props;
  const [duration, setDuration] = useState(settings.duration || 5);
  const delayedDuration = useDebounce(duration, 500);

  function handleDurationChange(event: ChangeEvent<HTMLInputElement>) {
    setDuration(+event.target?.value);
  }

  function handleRandomDuration() {
    setDuration(Math.floor(Math.random() * 99) + 2);
  }

  function handleWheelSpin() {
    updateSettings("isSpinning", true);
  }

  function handleWheelMode(val: "classic" | "elimination") {
    updateSettings("mode", val);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    updateSettings("duration", delayedDuration);
  }, [delayedDuration]);

  return (
    <div className="flex gap-2.5">
      <Link to={"/"} disabled={settings.isSpinning}>
        <Button variant={"outline"} disabled={settings.isSpinning}>
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
        disabled={settings.isSpinning}
      ></Input>

      <Button
        onClick={handleRandomDuration}
        variant={"outline"}
        title="Set Random Duration"
        disabled={settings.isSpinning}
      >
        <DicesIcon className="size-5" />
        RANDOM
      </Button>

      <Select
        name="wheel-mode"
        value={settings.mode}
        onValueChange={handleWheelMode}
        disabled={settings.isSpinning}
      >
        <SelectTrigger className="w-full h-9! max-w-37.5" title="Choose Wheel Mode">
          <SelectValue placeholder="Choose Mode" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="classic">Classic</SelectItem>
            <SelectItem value="elimination">Elimination</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button className="w-40" onClick={handleWheelSpin} disabled={settings.isSpinning}>
        <LoaderPinwheelIcon className="size-5" />
        SPIN WHEEL
      </Button>
    </div>
  );
}
