import { RotateCcwIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Settings } from "@/utils/wheel-data";
import { Button } from "../ui/button";

type WheelModeProps = {
  updateSettings: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  handleReset: () => void;
  settings: Settings;
};

export default function wheelMode(props: WheelModeProps) {
  const { updateSettings, handleReset, settings } = props;

  function handleWheelMode(val: "classic" | "elimination") {
    updateSettings("mode", val);
  }

  return (
    <div className="flex">
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
            <SelectItem value="elimination">Dropout</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        onClick={handleReset}
        variant={"outline"}
        title="Reset Wheel"
        disabled={settings.isSpinning || settings.mode === "classic"}
        className="w-27.5 max-[720px]:w-10"
      >
        <RotateCcwIcon className="size-5 " />
        <span className="max-[720px]:hidden uppercase">reset</span>
      </Button>
    </div>
  );
}
