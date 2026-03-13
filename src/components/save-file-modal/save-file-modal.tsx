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
        <Button className="max-[510px]:w-10" title="Save Options">
          <SaveIcon className="size-5" />
          <span className="max-[510px]:hidden capitalize">save</span>
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
