import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type LoadFileModalProps = {
  isOpen: boolean;
  handleDialogOpen: () => void;
  feedback: string;
};

export function WinnerModal(props: LoadFileModalProps) {
  const { isOpen, handleDialogOpen, feedback } = props;

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance m-5">
            {feedback}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Continue</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
