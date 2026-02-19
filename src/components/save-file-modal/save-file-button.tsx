import { useRef } from "react";
import { dataToCSV } from "@/utils/data-to-csv";
import { dataToJSON } from "@/utils/data-to-json";
import { setBlobUrl } from "@/utils/set-blob-url";
import type { WheelData } from "@/utils/wheel-data";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";

type SaveFileButtonProps = {
  data: WheelData;
  name: "csv" | "json";
};

export default function saveFileButton(props: SaveFileButtonProps) {
  const { name, data } = props;

  const linkReference = useRef<HTMLAnchorElement>(null);

  function saveFile() {
    let convertedData = "";

    if (name === "csv") {
      convertedData = dataToCSV(data.list);
    } else if (name === "json") {
      convertedData = JSON.stringify(dataToJSON(data.list), null, 2);
    }

    const result = setBlobUrl(convertedData, name);

    if (linkReference.current) {
      linkReference.current.href = result;
      linkReference.current.download = `${result.length}_items.${name}`;
      linkReference.current.click();
    }
  }

  return (
    <>
      {/** biome-ignore lint/a11y/useValidAnchor: <explanation> */}
      {/** biome-ignore lint/a11y/useAnchorContent: <explanation> */}
      <a ref={linkReference} href="" download="" className="hidden"></a>

      <DialogClose asChild>
        <Button onClick={saveFile} className="uppercase">
          {name}
        </Button>
      </DialogClose>
    </>
  );
}
