import { Suspense } from "react";
import { adminApi } from "@/lib/api";
import AdminTable from "../admin-table";

export default async function AdminPage() {
  const response = await adminApi.getAllAdmins();

  return (
    <Suspense fallback={<p>Loading Admin Tables</p>}>
      <AdminTable data={response.data} />
    </Suspense>
  );
}
