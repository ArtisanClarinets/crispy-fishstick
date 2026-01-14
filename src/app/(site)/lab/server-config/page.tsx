import { redirect } from "next/navigation";

export default function LabServerConfigRedirect() {
  // Backward compatibility: Redirect old lab URL to new Configurator
  redirect("/infrastructure/configurator");
}
