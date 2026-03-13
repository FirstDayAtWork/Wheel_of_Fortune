import { DicesIcon } from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import type { Settings } from "@/utils/wheel-data";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type WheelDurationProps = {
  updateSettings: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  settings: Settings;
};

export default function wheelDuration(props: WheelDurationProps) {
  const { updateSettings, settings } = props;

  const [duration, setDuration] = useState(settings.duration || 5);
  const delayedDuration = useDebounce(duration, 500);

  function handleDurationChange(event: ChangeEvent<HTMLInputElement>) {
    setDuration(+event.target?.value);
  }

  function handleRandomDuration() {
    setDuration(Math.floor(Math.random() * 99) + 2);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    updateSettings("duration", delayedDuration);
  }, [delayedDuration]);

  return (
    <div className="flex ">
      <Input
        onChange={handleDurationChange}
        placeholder="Duration"
        type="number"
        className="h-9 max-w-37.5! w-full!"
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
        className="w-27.5 max-[720px]:w-10"
      >
        <DicesIcon className="size-5" />
        <span className="max-[720px]:hidden uppercase">random</span>
      </Button>
    </div>
  );
}
