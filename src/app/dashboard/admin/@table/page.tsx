import { Suspense } from "react";
import AdminTable from "./admin-table";
import { adminApi } from "@/lib/api";

export default async function AdminPage() {
  const response = await adminApi.getAllAdmins();

  return (
    <Suspense fallback={<p>Loading Admin Tables</p>}>
      <AdminTable data={response.data} />
    </Suspense>
  );
}
