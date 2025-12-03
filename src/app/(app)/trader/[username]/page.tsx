import { notFound } from "next/navigation";
import TraderComponent from "./components/traderComponent";
import { getUserByUsername } from "@/services/api/modules/users";

export default async function TraderPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const profile = await getUserByUsername(username);

  if (!profile) return notFound();

  return <TraderComponent profile={profile} username={username} />;
}
