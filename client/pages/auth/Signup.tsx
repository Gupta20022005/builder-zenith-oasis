import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FormScreen from "@/components/auth/FormScreen";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <FormScreen title="Your details" progress={30}
      bottom={<p className="text-xs text-muted-foreground">If you'd like to know more about how we collect, use and look after your personal information, please refer to our <a className="underline" href="#">Privacy Collection Notice</a> and <a className="underline" href="#">Privacy Policy</a>.</p>}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const fd = new FormData(form);
          const email = (fd.get("email") as string) || "";
          try {
            const next = { first: String(fd.get("first")||""), last: String(fd.get("last")||""), email, phone: String(fd.get("phone")||"") };
            localStorage.setItem("app:user", JSON.stringify(next));
            localStorage.setItem("app:promptLocation", "1");
          } catch {}
          navigate(`/auth/verify-email?email=${encodeURIComponent(email)}`);
        }}
        className="grid gap-4"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1">
            <label className="text-sm font-medium" htmlFor="first">First Name<span className="text-destructive"> *</span></label>
            <input id="first" name="first" required className="h-11 rounded-md border px-3" placeholder="First Name" />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium" htmlFor="last">Last Name<span className="text-destructive"> *</span></label>
            <input id="last" name="last" required className="h-11 rounded-md border px-3" placeholder="Last Name" />
          </div>
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium" htmlFor="email">Email address<span className="text-destructive"> *</span></label>
          <input id="email" name="email" type="email" required className="h-11 rounded-md border px-3" placeholder="you@example.com" />
        </div>
        <div className="grid gap-1">
          <label className="text-sm font-medium" htmlFor="phone">Mobile number<span className="text-destructive"> *</span></label>
          <div className="flex">
            <select aria-label="Country code" className="h-11 rounded-l-md border px-2 text-sm bg-white">
              <option value="AU">+61</option>
              <option value="US">+1</option>
              <option value="IN">+91</option>
            </select>
            <input id="phone" name="phone" required className="h-11 w-full rounded-r-md border border-l-0 px-3" placeholder="Mobile number" />
          </div>
          <a href="#" className="mt-1 text-xs underline">Why do you need my mobile number?</a>
        </div>
        <Button type="submit" className="h-12 rounded-full">Next</Button>
      </form>
    </FormScreen>
  );
}
