import { Loader2 } from "lucide-react";

type LoaderProps = {
  height: string;
  width: string;
};

export function Loader(props: LoaderProps) {
  const { height, width } = props;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <Loader2 className={`text-foreground ${height} ${width} animate-spin`} />
    </div>
  );
}
