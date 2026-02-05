import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function ListOption() {
  const id = "1234";
  return (
    <div className="flex gap-2.5">
      <Label htmlFor={id} className="text-sm flex-none">
        #1
      </Label>

      <Input type="text" placeholder="Title" name="title" id={id} className="flex-4 h-9"></Input>

      <Input type="number" placeholder="Weight" name="weight" className="flex-1 h-9"></Input>

      <Button variant="destructive" size="icon">
        <TrashIcon />
      </Button>
    </div>
  );
}
