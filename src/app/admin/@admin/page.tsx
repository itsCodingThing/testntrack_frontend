import AdminTable from "./admin-table";
import { getAllAdmins } from "@/lib/api";

export default async function AdminTablePage() {
  const response = await getAllAdmins();

  if (!response.status) {
    return <h1>no data available</h1>;
  }

  return (
    <div className="container mx-auto mt-2">
      <h1 className="font-bold text-2xl">Admins</h1>
      <AdminTable data={response.data} />
    </div>
  );
}
