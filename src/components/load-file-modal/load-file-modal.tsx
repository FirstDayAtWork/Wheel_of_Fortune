import { FileUpIcon } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { csvToArray } from "@/utils/csv-to-array";
import fileToText from "@/utils/file-to-txt";
import { validateJsonSchema } from "@/utils/validate-json-schema";
import type { WheelDataList } from "@/utils/wheel-data";
import { ModalTabs } from "./modal-tabs";

type LoadFileModalProps = {
  replace: (newData: WheelDataList[]) => void;
};

export function LoadFileModal(props: LoadFileModalProps) {
  const { replace } = props;

  const [isError, setError] = useState(false);
  const dataReference = useRef<WheelDataList[]>(null);

  async function handleFileLoad(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files?.[0]) {
      const text = await fileToText(files[0]);
      let res: string | Omit<WheelDataList, "id" | "hash">[] = "";

      if (text && (files[0].type === "application/json" || files[0].type === "text/csv")) {
        try {
          res = JSON.parse(text);

          if (Array.isArray(res) && res.every(validateJsonSchema)) {
            dataReference.current = res.map((item: Omit<WheelDataList, "id" | "hash">, index) => {
              return {
                ...item,
                id: index + 1,
                hash: crypto.randomUUID(),
              };
            });

            setError(false);
          } else {
            setError(true);
          }
        } catch {
          res = csvToArray(text);

          if (Array.isArray(res) && res.every(validateJsonSchema)) {
            dataReference.current = res.map((item: Omit<WheelDataList, "id" | "hash">, index) => {
              return {
                ...item,
                id: index + 1,
                hash: crypto.randomUUID(),
              };
            });
            setError(false);
          } else {
            setError(true);
          }
        }
      } else {
        setError(true);
      }
    }
  }

  function handleSave() {
    if (dataReference.current) {
      replace(dataReference.current);
      dataReference.current = null;
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <FileUpIcon className="size-5" />
          Load
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Options</DialogTitle>
          <DialogDescription>You can upload options in CSV or JSON formats.</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Input
              onChange={handleFileLoad}
              type="file"
              accept="text/csv, application/json"
              {...(isError ? { "aria-invalid": true } : undefined)}
            />
            <div className="h-3">
              {isError && <Label className="text-destructive">Invalid Format</Label>}
            </div>
          </div>
        </div>

        <ModalTabs />

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              {...(isError ? { disabled: true } : undefined)}
              onClick={handleSave}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
