import { getSchools } from "@/lib/api";
import SchoolTable from "./school-table";

export default async function AdminPage() {
  const response = await getSchools();

  return <SchoolTable data={response.data} />;
}
