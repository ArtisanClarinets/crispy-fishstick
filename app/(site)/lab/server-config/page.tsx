import { redirect } from "next/navigation";

export default function LabServerConfigRedirect() {
  redirect("/infrastructure/configurator");
}
