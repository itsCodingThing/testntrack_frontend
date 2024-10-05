import DataCard from "@/components/data-card";
import AdminTablePage from "./@table/page";

export default function AdminPage() {
  return (
    <div className="contaier mx-auto">
      <div className="mb-2 grid grid-cols-5 gap-1">
        <DataCard title="Total admins" value={1525} />
        <DataCard title="Total admins" value={1525} />
        <DataCard title="Total admins" value={1525} />
        <DataCard title="Total admins" value={1525} />
      </div>
      <AdminTablePage />
    </div>
  );
}
