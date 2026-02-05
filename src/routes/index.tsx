import { createFileRoute } from "@tanstack/react-router";
import Menu from "@/components/menu";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return <Menu />;
}
