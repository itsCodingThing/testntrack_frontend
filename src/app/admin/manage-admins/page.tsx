import backendAPI from "@/lib/backend-apis";
import AdminTable from "../_components/admin-table";
import AddAdmin from "../_components/add-admin";

export default async function ManageAdminPage() {
  const adminResponse = await backendAPI.admin.getAllAdmins({
    count: 20,
    page: 1,
  });

  if (!adminResponse.status) {
    return <h1>no data available</h1>;
  }

  return (
    <>
      <AddAdmin />
      <AdminTable data={adminResponse.data} />
    </>
  );
}
