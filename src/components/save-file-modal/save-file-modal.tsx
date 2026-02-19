import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { WheelData } from "@/utils/wheel-data";
import SaveFileButton from "./save-file-button";

type SaveFileModalProps = {
  data: WheelData;
};

export function SaveFileModal(props: SaveFileModalProps) {
  const { data } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Save</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download File</DialogTitle>
          <DialogDescription>Choose Format</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <SaveFileButton data={data} name={"csv"} />
          <SaveFileButton data={data} name={"json"} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
