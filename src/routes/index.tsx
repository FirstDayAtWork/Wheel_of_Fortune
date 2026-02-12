import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import Menu from "@/components/menu";
import { Loader } from "@/components/ui/loader";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <ClientOnly fallback={<Loader height="h-30" width="w-30" />}>
      <Menu />
    </ClientOnly>
  );
}
