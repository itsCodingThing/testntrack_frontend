import { schoolApi } from "@/lib/api";
import SchoolTable from "./school-table";
export default async function SchoolPage() {
  const { data } = await schoolApi.getSchools();

  return (
    <section className="container mx-auto">
      <SchoolTable data={data} />
    </section>
  );
}
