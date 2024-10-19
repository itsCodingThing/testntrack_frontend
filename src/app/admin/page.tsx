import DataCard from "@/components/data-card";
import Chart from "./_components/chart";

export default function AdminPage() {
  return (
    <div className="contaier mx-auto">
      <div className="mb-2 grid grid-cols-5 gap-2">
        <DataCard title="Total admins" value={500} />
        <DataCard title="Total schools" value={500} />
        <DataCard title="Total admins" value={500} />
        <DataCard title="Total schools" value={500} />
        <DataCard title="Total schools" value={500} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-spans-1">
          <Chart />
        </div>
        <div className="col-spans-1">
          <Chart />
        </div>
      </div>
    </div>
  );
}
