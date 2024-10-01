import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DataCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <Card className="text-center w-40">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{value}</p>
      </CardContent>
    </Card>
  );
}