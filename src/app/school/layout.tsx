export default function SchoolLayout(props: {
  children: React.ReactNode;
  table: React.ReactNode;
}) {
  return (
    <section>
      {props.children}
      {props.table}
    </section>
  );
}
