import { useState } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HERO = "https://cdn.builder.io/api/v1/image/assets%2Ffad8b66ffa4e41d0b851cdde107bb805%2Fcca049e3c16448fbb4a5f9c60f7368b7?format=webp&width=800";

export default function Login() {
  const [showEmail, setShowEmail] = useState(true);
  const navigate = useNavigate();

  return (
    <AuthLayout image={HERO}>
      <h2 className="text-xl font-semibold">Sign in</h2>
      <p className="text-sm text-muted-foreground mb-4">Welcome back</p>

      {showEmail ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          className="grid gap-3"
        >
          <div className="grid gap-1">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input id="email" name="email" type="email" required className="h-11 rounded-md border px-3" placeholder="you@example.com" />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input id="password" name="password" type="password" required className="h-11 rounded-md border px-3" placeholder="••••••••" />
          </div>
          <Button type="submit" className="rounded-full">Sign in</Button>
        </form>
      ) : null}

      <div className="mt-4 grid gap-2">
        <Button variant="secondary" className="rounded-full" onClick={() => navigate("/auth/phone")}> <Phone className="mr-2 size-4"/> Continue with phone </Button>
        <Button variant="outline" className="rounded-full" onClick={() => setShowEmail((v) => !v)}>
          <Mail className="mr-2 size-4" /> {showEmail ? "Hide email form" : "Continue with email"}
        </Button>
      </div>

      <p className="mt-4 text-center text-sm">
        New here? <button className="text-primary underline" onClick={() => navigate("/auth/signup")}>Create an account</button>
      </p>
    </AuthLayout>
  );
}
