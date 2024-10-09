import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password should be minimum of 8 character" }),
  code: z.string().min(3, { message: "Please enter school code" }).optional(),
});

export default function SchoolLoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  function onSubmit(values: z.output<typeof loginFormSchema>) {
    console.log("submit is clicked");
    const params = {
      type: "school",
      ...values,
    };

    signIn("credentials", { ...params, redirect: false })
      .then((res) => {
        if (res?.error) {
          toast({ variant: "destructive", description: "Login failed" });
        } else {
          router.push("/school");
        }
      })
      .catch(() => {
        toast({ variant: "destructive", description: "Login failed" });
      });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter School Code" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter Password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="my-2" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
}
