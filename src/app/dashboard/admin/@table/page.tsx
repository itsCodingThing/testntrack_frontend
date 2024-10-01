import { Suspense } from "react";
import AdminTable from "./admin-table";
import { getAllAdmins } from "@/lib/api";

export default async function AdminPage() {
  const response = await getAllAdmins();

  return (
    <Suspense fallback={<p>Loading Admin Tables</p>}>
      <AdminTable data={response.data} />
    </Suspense>
  );
}
