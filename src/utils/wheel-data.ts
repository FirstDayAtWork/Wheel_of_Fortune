export interface WheelData {
  idCounter: number;
  list: WheelDataList[];
}

export type WheelDataList = {
  id: number;
  title: string;
  weight: string;
};

export const wheelData: WheelData = {
  idCounter: 1,
  list: [
    {
      id: 1,
      title: "",
      weight: "",
    },
  ],
};
