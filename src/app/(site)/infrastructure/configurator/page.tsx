import { Configurator } from "@/widgets/infrastructure/configurator/ui";

export const metadata = {
  title: "Server Configurator",
  description: "Build your server with live TCO and compatibility checks.",
};

export default function ConfiguratorPage() {
  return (
    <div className="container py-8 h-[calc(100vh-80px)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Hardware Configurator</h1>
        <p className="text-muted-foreground text-sm">Design your node. We validate physics in real-time.</p>
      </div>
      <Configurator />
    </div>
  );
}
