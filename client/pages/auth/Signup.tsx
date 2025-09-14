import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HERO = "https://cdn.builder.io/api/v1/image/assets%2Ffad8b66ffa4e41d0b851cdde107bb805%2Fa83cd5cc7262469b849e6586e152b872?format=webp&width=800";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <AuthLayout image={HERO}>
      <h2 className="text-xl font-semibold">Create account</h2>
      <p className="text-sm text-muted-foreground mb-4">It only takes a moment</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const email = (new FormData(form).get("email") as string) || "";
          navigate(`/auth/verify-email?email=${encodeURIComponent(email)}`);
        }}
        className="grid gap-3"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1">
            <label className="text-sm font-medium" htmlFor="first">First Name</label>
            <input id="first" name="first" required className="h-11 rounded-md border px-3" placeholder="First name" />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium" htmlFor="last">Last Name</label>
            <input id="last" name="last" required className="h-11 rounded-md border px-3" placeholder="Last name" />
          </div>
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium" htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" required className="h-11 rounded-md border px-3" placeholder="you@example.com" />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium" htmlFor="phone">Mobile number</label>
          <div className="flex">
            <select aria-label="Country code" className="h-11 rounded-l-md border px-2 text-sm bg-white">
              <option value="AU">+61</option>
              <option value="US">+1</option>
              <option value="IN">+91</option>
            </select>
            <input id="phone" name="phone" required className="h-11 w-full rounded-r-md border border-l-0 px-3" placeholder="Mobile number" />
          </div>
          <p className="text-xs text-muted-foreground">We may use your number to verify your account.</p>
        </div>
        <Button type="submit" className="rounded-full">Next</Button>
        <Button type="button" variant="secondary" className="rounded-full" onClick={() => navigate("/auth/phone")}>Use phone instead</Button>
      </form>
    </AuthLayout>
  );
}
