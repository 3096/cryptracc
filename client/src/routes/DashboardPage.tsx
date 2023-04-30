import { useIdentitySetupCheck } from "../hooks/cryptracc";

export default function DashboardPage() {
  useIdentitySetupCheck();
  return <>this is the dashboard page</>;
}
