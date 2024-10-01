import { getSchools } from "@/lib/api";
import SchoolTable from "./school-table";

export default async function SchoolPage() {
  const { data } = await getSchools();

  return (
    <section>
      <SchoolTable data={data} />
    </section>
  );
}
