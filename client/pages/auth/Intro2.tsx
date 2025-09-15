import { useNavigate } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const IMG2 = "https://cdn.builder.io/api/v1/image/assets%2Ffad8b66ffa4e41d0b851cdde107bb805%2F84c0cf4f9abb4bbea2c797fbcb1fffa7?format=webp&width=800";

export default function Intro2() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen relative">
      <img src={IMG2} alt="Auth options" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 flex min-h-screen flex-col justify-end">
        <div className="mx-auto max-w-md w-full p-6 text-white">
          <h2 className="text-2xl font-bold">Welcome</h2>
          <div className="mt-4 grid gap-3">
            <button onClick={() => navigate("/auth/login")} className="h-12 w-full rounded-full bg-white text-black font-medium">Login</button>
            <button onClick={() => navigate("/auth/signup")} className="h-12 w-full rounded-full bg-primary text-primary-foreground font-medium">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
