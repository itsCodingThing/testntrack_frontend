"use client";

import * as motion from "framer-motion/client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import AdminLoginForm from "./admin-login";
import SchoolLoginForm from "./school-login";

export default function LoginPage() {
  return (
    <Tabs defaultValue="admin">
      <div className="flex justify-center">
        <div>
          <TabsList className="mb-3 w-full">
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="school">School</TabsTrigger>
          </TabsList>
        </div>
      </div>
      <TabsContent value="admin">
        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <AdminLoginForm />
        </motion.div>
      </TabsContent>
      <TabsContent value="school">
        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <SchoolLoginForm />
        </motion.div>
      </TabsContent>
    </Tabs>
  );
}
