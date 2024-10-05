import { getSchools } from "@/lib/api";
import SchoolTable from "./school-table";

export default async function AdminPage() {
  const response = await getSchools();

  if (!response.status) {
    return <h2>no data available</h2>;
  }

  return <SchoolTable data={response.data} />;
}
