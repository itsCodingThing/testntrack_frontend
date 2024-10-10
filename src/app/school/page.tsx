"use client";

import AddSchoolAdmin from "./add-school-admin";
import AddBatch from "./add-batch";
import AddTeacher from "./add-teacher";
import AddStudent from "./add-student";

export default function SchoolPage() {
  return (
    <section>
      <h1 className="text-center text-4xl font-bold mb-5">Dashboard</h1>
      <div className="flex gap-2 justify-center">
        <AddSchoolAdmin />
        <AddTeacher />
        <AddStudent />
        <AddBatch />
      </div>
    </section>
  );
}
