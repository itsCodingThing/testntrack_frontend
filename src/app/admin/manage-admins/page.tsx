import { getAllAdmins } from "@/lib/backend-apis/admin";
import AdminTable from "../_components/admin-table";

export default async function ManageAdminPage() {
  const adminResponse = await getAllAdmins({ count: 20, page: 1 });

  if (!adminResponse.status) {
    return <h1>no data available</h1>;
  }

  return <AdminTable data={adminResponse.data} />;
}
