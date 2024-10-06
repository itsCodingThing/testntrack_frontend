import { getSchools } from "@/lib/api";
import SchoolTable from "./school-table";

export default async function AdminPage() {
  const response = await getSchools();

  if (!response.status) {
    return <h2>no data available</h2>;
  }

  return (
    <div className="container mx-auto mt-2">
      <h1 className="font-bold text-2xl">Schools</h1>
      <SchoolTable data={response.data} />
    </div>
  );
}
