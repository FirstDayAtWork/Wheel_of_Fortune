import { SaveIcon } from "lucide-react";
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
import type { WheelDataList } from "@/utils/wheel-data";
import SaveFileButton from "./save-file-button";

type SaveFileModalProps = {
  data: WheelDataList[];
};

export function SaveFileModal(props: SaveFileModalProps) {
  const { data } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <SaveIcon className="size-5" />
          Save
        </Button>
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
