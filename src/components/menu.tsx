import ListOption from "./list-option";
import { Button } from "./ui/button";
import { Heading } from "./ui/typography";

export default function Menu() {
  return (
    <div className="bg-muted/50 w-full max-w-3xl rounded-lg flex flex-col p-5 gap-5 text-center">
      <Heading size={"h2"}>Decision Making Tool</Heading>
      <div className="flex gap-2.5">
        <Button>Add</Button>
        <Button>Clear All</Button>
        <Button>Load</Button>
        <Button>Save</Button>
        <Button>Start</Button>
      </div>

      <div>
        <ListOption></ListOption>
      </div>
    </div>
  );
}
