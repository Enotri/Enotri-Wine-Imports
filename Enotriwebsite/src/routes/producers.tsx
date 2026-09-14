import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/producers")({
  component: ProducersLayout,
});

function ProducersLayout() {
  return <Outlet />;
}
