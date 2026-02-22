import { useStorage } from "@/hooks/useStorage";
import FeedBack from "./feedback";
import WheelCanvas from "./wheel-canvas";
import WheelMenu from "./wheel-menu";

export default function WheelContent() {
  const [settings, setSettings] = useStorage({ duration: 5 }, "settings");

  function updateSettings(newValue: number) {
    setSettings({ ...settings, duration: newValue });
  }

  return (
    <div className="bg-muted/50 w-full max-w-3xl rounded-lg flex flex-col p-5 gap-5 text-center">
      <WheelMenu updateSettings={updateSettings} settingsDuration={settings.duration} />
      <FeedBack />
      <WheelCanvas />
    </div>
  );
}
