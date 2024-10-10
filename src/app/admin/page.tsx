import { getSchools, getAllAdmins } from "@/lib/api";
import DataCard from "@/components/data-card";
import { Separator } from "@/components/ui/separator";
import AdminTable from "./_components/admin-table";
import SchoolTable from "./_components/school-table";

export default async function AdminPage() {
  const [schoolResponse, adminResponse] = await Promise.all([
    getSchools(),
    getAllAdmins(),
  ]);

  if (!schoolResponse.status) {
    return <h2>no data available</h2>;
  }

  if (!adminResponse.status) {
    return <h1>no data available</h1>;
  }

  return (
    <div className="contaier mx-auto">
      <div className="mb-2 grid grid-cols-5 gap-1">
        <DataCard title="Total admins" value={1525} />
      </div>
      <AdminTable data={adminResponse.data} />
      <Separator orientation="horizontal" className="my-3" />
      <SchoolTable data={schoolResponse.data} />
    </div>
  );
}
