import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocationProvider } from "@/context/location";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Placeholder from "./pages/Placeholder";
import More from "./pages/More";
import Snaps from "./pages/Snaps";
import Account from "./pages/account/Account";
import Profile from "./pages/account/Profile";
import Notifications from "./pages/account/Notifications";
import Language from "./pages/account/Language";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyEmail from "./pages/auth/VerifyEmail";
import PhoneAuth from "./pages/auth/Phone";
import Start from "./pages/auth/Start";
import Intro2 from "./pages/auth/Intro2";
import Repost from "./pages/Repost";


const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <LocationProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth/start" element={<Start />} />
        <Route path="/auth/intro2" element={<Intro2 />} />
        <Route path="/snaps" element={<Snaps />} />
        <Route path="/snap" element={<Placeholder title="Snap" />} />
        <Route path="/account" element={<Account />} />
        <Route path="/more" element={<More />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />
        <Route path="/auth/phone" element={<PhoneAuth />} />
        <Route path="/account/profile" element={<Profile />} />
        <Route path="/account/notifications" element={<Notifications />} />
        <Route path="/account/language" element={<Language />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LocationProvider>
  </TooltipProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
