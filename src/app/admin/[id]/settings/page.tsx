import { getAdminById } from "@/lib/backend-apis/admin";

export default async function SettingPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await getAdminById(Number(params.id));

  return <div className="container mx-auto">{response.message}</div>;
}
