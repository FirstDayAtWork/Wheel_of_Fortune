export interface WheelData {
  idCounter: number;
  list: WheelDataList[];
}

export type WheelDataList = {
  hash: `${string}-${string}-${string}-${string}-${string}`;
  id: number;
  title: string;
  weight: number;
};

export const wheelData: WheelData = {
  idCounter: 1,
  list: [
    {
      hash: crypto.randomUUID(),
      title: "",
      weight: 1,
      id: 1,
    },
  ],
};

export type Settings = {
  duration: number;
  isSpinning: boolean;
};

export const settingsDefaultValue: Settings = { duration: 5, isSpinning: false };
