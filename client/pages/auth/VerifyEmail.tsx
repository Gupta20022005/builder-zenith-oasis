import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";

const HERO = "https://cdn.builder.io/api/v1/image/assets%2Ffad8b66ffa4e41d0b851cdde107bb805%2Fcca049e3c16448fbb4a5f9c60f7368b7?format=webp&width=800";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const email = params.get("email") || "your email";
  const navigate = useNavigate();

  return (
    <AuthLayout image={HERO}>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Verify your email</h2>
        <p className="text-sm text-muted-foreground">We sent a verification link to <span className="font-medium">{email}</span>. Click the link to finish signing up.</p>
      </div>
      <div className="mt-4 grid gap-2">
        <Button className="rounded-full" onClick={() => navigate("/")}>I\'ve verified my email</Button>
        <Button variant="outline" className="rounded-full" onClick={() => alert("Resent!")}>Resend email</Button>
      </div>
    </AuthLayout>
  );
}
