import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Admin } from "@/types/models/admin";
import { CirclePlusIcon } from "lucide-react";

export default function Profile({ profile }: { profile: Admin }) {
  return (
    <div className="container mx-auto grid place-items-center">
      <div className="p-4 flex gap-2">
        <div className="p-2">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Profile
                <span className="text-yellow-500">{profile.status}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                className="mx-auto rounded-md"
                src="https://picsum.photos/300"
                alt="profile image"
                width={300}
                height={300}
                priority
              />
              <Label>
                Name
                <Input defaultValue={profile.name} />
              </Label>
              <Label>
                email
                <Input defaultValue={profile.email} />
              </Label>
              <Label>
                contact
                <Input defaultValue={profile.contact} />
              </Label>
              <Button className="mt-2">Save</Button>
            </CardContent>
          </Card>
        </div>
        <div className="p-2 flex flex-col gap-2">
          <Card className="w-[500px] h-[200px]">
            <CardHeader>
              <CardTitle>Bio</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                className="max-h-[100px]"
                rows={4}
                maxLength={300}
                placeholder="Your bio"
              />
            </CardContent>
          </Card>
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Permissions
                <Button
                  className="border-none bg-transparent"
                  variant="outline"
                  size="icon"
                >
                  <CirclePlusIcon />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="my-1 gap-2">
                {["create admin", "create school", "remove student"].map(
                  (permission, i) => (
                    <div
                      className="my-1 p-3 flex justify-between border border-1 rounded-md"
                      key={i}
                    >
                      <p>{permission}</p>
                      <p>approve</p>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
