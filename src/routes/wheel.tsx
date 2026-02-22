import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { Loader } from "@/components/ui/loader";
import WheelContent from "@/components/wheel/wheel-content";

export const Route = createFileRoute("/wheel")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ClientOnly fallback={<Loader height="h-30" width="w-30" />}>
      <WheelContent />
    </ClientOnly>
  );
}
