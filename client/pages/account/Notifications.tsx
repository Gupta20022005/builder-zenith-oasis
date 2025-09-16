import MobileShell from "@/components/layout/MobileShell";
import { settingsStore } from "@/data/user";
import { Switch } from "@/components/ui/switch";

export default function Notifications() {
  const s = settingsStore.get();

  const set = (key: keyof typeof s.notifications, val: boolean) => {
    const next = { ...s, notifications: { ...s.notifications, [key]: val } };
    settingsStore.save(next);
  };

  return (
    <MobileShell>
      <h1 className="mb-4 text-2xl font-bold">Notifications</h1>
      <div className="divide-y rounded-xl border bg-card">
        <Row label="Push notifications" checked={s.notifications.push} onChange={(v)=>set("push", v)} />
        <Row label="Email updates" checked={s.notifications.email} onChange={(v)=>set("email", v)} />
        <Row label="SMS alerts" checked={s.notifications.sms} onChange={(v)=>set("sms", v)} />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">Changes are saved automatically.</p>
    </MobileShell>
  );
}

function Row({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v:boolean)=>void }) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <span className="font-medium">{label}</span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
