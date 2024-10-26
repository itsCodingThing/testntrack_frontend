import backendAPI from "@/lib/backend-apis";
import SchoolTable from "../_components/school-table";

export default async function ManageSchoolsPage() {
  const response = await backendAPI.school.getAllSchools();

  if (!response.status) return <p>no data</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl">Manage School Page</h1>
      <SchoolTable data={response.data} />
    </div>
  );
}
