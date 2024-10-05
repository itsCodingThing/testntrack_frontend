import { getAdminById } from "@/lib/api";

export default async function SettingPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await getAdminById(Number(params.id));

  return <div className="container mx-auto">{response.status}</div>;
}
