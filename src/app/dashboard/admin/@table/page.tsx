import AdminTable from "./admin-table";
import { getAllAdmins } from "@/lib/api";

export default async function AdminPage() {
  const response = await getAllAdmins();

  return <AdminTable data={response.data} />;
}
