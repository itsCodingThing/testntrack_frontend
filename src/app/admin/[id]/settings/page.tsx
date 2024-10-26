import { getAdminById } from "@/lib/backend-apis/admin";
import Profile from "../../_components/profile";

export default async function SettingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getAdminById(Number(id));

  if (!response.status) {
    return <div className="container mx-auto">no profile found</div>;
  }

  const { data: profile } = response;

  return <Profile profile={profile} />;
}
