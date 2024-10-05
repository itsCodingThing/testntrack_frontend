import AdminTable from "./admin-table";
import { getAllAdmins } from "@/lib/api";

export default async function AdminPage() {
  const response = await getAllAdmins();

  if (!response.status) {
    return <h1>no data available</h1>;
  }

  return <AdminTable data={response.data} />;
}
