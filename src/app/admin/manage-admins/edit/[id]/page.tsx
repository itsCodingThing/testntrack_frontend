"use client";

import useSWR from "swr";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import backendAPI from "@/lib/backend-apis";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Admin } from "@/types/models/admin";
import { useReducer } from "react";

const editFormReduceer = (
  state: { name: string; email: string },
  action: { type: string; value: string }
) => {
  if (action.type === "name") {
    return {
      ...state,
      name: action.value,
    };
  }

  if (action.type === "email") {
    return {
      ...state,
      email: action.value,
    };
  }

  return state;
};

function EditForm({ profile, id }: { profile: Admin; id: string }) {
  const { toast } = useToast();
  const [state, dispatch] = useReducer(editFormReduceer, {
    name: profile.name,
    email: profile.email,
  });

  const updateInputValue = (name: string, value: string) => {
    dispatch({ type: name, value });
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();

        backendAPI.admin
          .updateAdmin({ status: "active", adminId: Number(id), ...state })
          .then((res) => {
            if (res.status) {
              toast({ variant: "default", title: "updated successfully" });
            } else {
              toast({ variant: "destructive", title: "failed to update user" });
            }
          });
      }}
    >
      <div>
        <Label>Name</Label>
        <Input
          name="name"
          value={state.name}
          onChange={(e) => updateInputValue("name", e.currentTarget.value)}
        />
      </div>

      <div>
        <Label>Email</Label>
        <Input
          name="email"
          value={state.email}
          onChange={(e) => updateInputValue("email", e.currentTarget.value)}
        />
      </div>

      <Button>Save</Button>
    </form>
  );
}

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useSWR(
    { url: "/api/admin/update", id },
    ({ id }) => backendAPI.admin.getAdminById(Number(id))
  );

  if (isLoading || !data) {
    return <p>Loading</p>;
  }

  return (
    <div className="h-full bg-white">
      <div className="flex justify-between pb-2">
        <h1 className="text-xl font-bold">Edit page</h1>
        <Link className="text-xl font-bold" href="/admin/manage-admins">
          Go Back
        </Link>
      </div>
      <div className="h-1/2 grid place-items-center">
        <div className="w-[300px]">
          <EditForm id={id} profile={data.data} />
        </div>
      </div>
    </div>
  );
}
