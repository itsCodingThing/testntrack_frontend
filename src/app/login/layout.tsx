import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen bg-zinc-50 grid place-items-center">
      <Card>
        <CardHeader>
          <h1 className="text-center font-bold text-2xl">TestnTrack Login</h1>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
