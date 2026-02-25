import { useState } from "react";
import { useStorage } from "@/hooks/useStorage";
import { settingsDefaultValue } from "@/utils/wheel-data";
import FeedBack from "./feedback";
import WheelCanvas from "./wheel-canvas";
import WheelMenu from "./wheel-menu";

export default function WheelContent() {
  const [settings, setSettings] = useStorage(settingsDefaultValue, "settings");
  const [feedback, setFeedback] = useState("Press Spin Wheel Button!");

  function updateDuration(newValue: number) {
    setSettings({ ...settings, duration: newValue });
  }

  function updateSpinningStatus(newStatus: boolean) {
    setSettings({ ...settings, isSpinning: newStatus });
  }

  function updateFeedback(newValue: string) {
    setFeedback(newValue);
  }

  return (
    <div className="bg-muted/50 w-full max-w-3xl rounded-lg flex flex-col p-5 gap-5 text-center">
      <WheelMenu
        updateDuration={updateDuration}
        updateSpinningStatus={updateSpinningStatus}
        settings={settings}
      />

      <FeedBack feedback={feedback} />

      <WheelCanvas
        settings={settings}
        updateFeedback={updateFeedback}
        updateSpinningStatus={updateSpinningStatus}
      />
    </div>
  );
}
