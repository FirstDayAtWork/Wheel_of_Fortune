import { useState } from "react";
import { useStorage } from "@/hooks/useStorage";
import type { Settings, WheelData, WheelDataList } from "@/utils/wheel-data";
import { settingsDefaultValue } from "@/utils/wheel-data";
import FeedBack from "./feedback";
import WheelCanvas from "./wheel-canvas";
import WheelMenu from "./wheel-menu";
import { WinnerModal } from "./winner-modal";

export default function WheelContent() {
  const [settings, setSettings] = useStorage(settingsDefaultValue, "settings");
  const [eliminationList, setEliminationValue] = useStorage<WheelDataList["hash"][]>(
    [],
    "eliminationList",
  );
  const [wheelData] = useStorage<WheelData>(
    {
      idCounter: 0,
      list: [],
    },
    "wheel_data",
  );
  const [feedback, setFeedback] = useState("Press Spin Wheel Button!");
  const [isOpen, setIsOpen] = useState(false);

  function handleDialogOpen(open: boolean) {
    if (!open && settings.mode === "elimination") {
      const value = wheelData.list.find((item) => item.title === feedback);

      if (value) {
        setEliminationValue((prev) => [...prev, value.hash]);
      }
    }
    setIsOpen((prev) => !prev);
  }

  function updateSettings<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function updateFeedback(newValue: string) {
    setFeedback(newValue);
  }

  function handleReset() {
    if (settings.mode === "elimination") {
      setEliminationValue([]);
    }
    updateSettings("duration", 5);
  }

  return (
    <div className="bg-muted/50 w-full max-w-3xl rounded-lg flex flex-col p-5 gap-5 text-center">
      <WheelMenu updateSettings={updateSettings} settings={settings} handleReset={handleReset} />

      <FeedBack feedback={feedback} />

      <WheelCanvas
        settings={settings}
        updateFeedback={updateFeedback}
        updateSettings={updateSettings}
        handleDialogOpen={handleDialogOpen}
        size={712}
        wheelData={wheelData}
        eliminationList={eliminationList}
      />

      <WinnerModal isOpen={isOpen} handleDialogOpen={handleDialogOpen} feedback={feedback} />
    </div>
  );
}
