import { useState } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const HERO = "https://cdn.builder.io/api/v1/image/assets%2Ffad8b66ffa4e41d0b851cdde107bb805%2Fcca049e3c16448fbb4a5f9c60f7368b7?format=webp&width=800";

export default function PhoneAuth() {
  const [step, setStep] = useState<"enter" | "code">("enter");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <AuthLayout image={HERO}>
      <h2 className="text-xl font-semibold">{step === "enter" ? "Sign in with phone" : "Enter code"}</h2>
      {step === "enter" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep("code");
          }}
          className="mt-2 grid gap-3"
        >
          <label className="text-sm font-medium" htmlFor="phone">Mobile number</label>
          <div className="flex">
            <select aria-label="Country code" className="h-11 rounded-l-md border px-2 text-sm bg-white">
              <option value="AU">+61</option>
              <option value="US">+1</option>
              <option value="IN">+91</option>
            </select>
            <input id="phone" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} required className="h-11 w-full rounded-r-md border border-l-0 px-3" placeholder="Mobile number" />
          </div>
          <Button type="submit" className="rounded-full">Send code</Button>
        </form>
      ) : (
        <div className="mt-4 grid gap-4">
          <p className="text-sm text-muted-foreground">We\'ve sent a 6‑digit code to {phone}. Enter it below to continue.</p>
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <Button className="rounded-full" onClick={() => (window.location.href = "/")}>Verify</Button>
          <button className="text-sm underline justify-self-start" onClick={() => setStep("enter")}>Use a different number</button>
        </div>
      )}
    </AuthLayout>
  );
}
