import { useNavigate } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const IMG2 = "https://cdn.builder.io/api/v1/image/assets%2Ffad8b66ffa4e41d0b851cdde107bb805%2F6da2bd7672ad418eafd01155e4b1dfb8?format=webp&width=800";

export default function Intro2() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen relative">
      <img src={IMG2} alt="Choose method" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 flex min-h-screen flex-col justify-end">
        <div className="mx-auto max-w-md w-full p-6 text-white">
          <h2 className="text-2xl font-bold">Join or sign in</h2>
          <div className="mt-4 grid gap-3">
            <button onClick={() => navigate("/auth/signup")}
              className="h-12 w-full rounded-full bg-white text-black font-medium inline-flex items-center justify-center">
              <Mail className="mr-2 size-5"/> Continue with Email
            </button>
            <button onClick={() => navigate("/auth/phone")} className="h-12 w-full rounded-full bg-primary text-primary-foreground font-medium inline-flex items-center justify-center">
              <Phone className="mr-2 size-5"/> Continue with Phone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
