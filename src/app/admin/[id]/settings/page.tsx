import { getAdminById } from "@/lib/backend-apis/admin";
import Profile from "../../_components/profile";

export default async function SettingPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await getAdminById(Number(params.id));

  if (!response.status) {
    return <div className="container mx-auto">no profile found</div>;
  }

  const { data: profile } = response;

  return <Profile profile={profile} />;
}
