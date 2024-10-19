export interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
  contact: string;
  status: "pending" | "active" | "deactive";
  created_at: string;
}
