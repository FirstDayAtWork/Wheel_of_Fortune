import { Link } from "@tanstack/react-router";
import { CircleArrowLeftIcon, LoaderPinwheelIcon } from "lucide-react";

import type { Settings } from "@/utils/wheel-data";
import { Button } from "../ui/button";
import WheelDuration from "./wheel-duration";
import WheelMode from "./wheel-mode";

type WheelMenuProps = {
  updateSettings: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  handleReset: () => void;
  settings: Settings;
};

export default function WheelMenu(props: WheelMenuProps) {
  const { updateSettings, handleReset, settings } = props;

  function handleWheelSpin() {
    updateSettings("isSpinning", true);
  }

  return (
    <div className="flex gap-2.5 justify-between max-[510px]:flex-col">
      <div className="flex gap-2.5 max-[510px]:justify-between">
        <Link
          to={"/"}
          disabled={settings.isSpinning}
          className="max-[720px]:text-left max-[720px]:w-10"
        >
          <Button variant={"outline"} disabled={settings.isSpinning}>
            <CircleArrowLeftIcon className="size-5" />
            <span className="max-[720px]:hidden uppercase">back</span>
          </Button>
        </Link>

        <div className="flex gap-2.5 ">
          <WheelDuration updateSettings={updateSettings} settings={settings} />
          <WheelMode
            updateSettings={updateSettings}
            handleReset={handleReset}
            settings={settings}
          />
        </div>
      </div>

      <Button
        className="w-40 max-[510px]:w-full"
        onClick={handleWheelSpin}
        disabled={settings.isSpinning}
      >
        <LoaderPinwheelIcon className="size-5" />
        <span className="uppercase">spin wheel</span>
      </Button>
    </div>
  );
}
