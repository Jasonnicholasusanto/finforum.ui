import { getUserDataByUsername } from "@/services/getUserDataActions";
import { notFound } from "next/navigation";
import TraderComponent from "./components/trader-component";

export default async function TraderPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const profile = await getUserDataByUsername(username);

  if (!profile) return notFound();

  return <TraderComponent profile={profile} username={username} />;
}
