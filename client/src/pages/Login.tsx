import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { Loader2, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

function safeReturnPath() {
  const value = new URLSearchParams(window.location.search).get("returnTo");
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/dashboard";
}

export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const returnTo = useMemo(safeReturnPath, []);
  const login = trpc.auth.login.useMutation({ onSuccess: () => window.location.assign(returnTo) });
  const register = trpc.auth.register.useMutation({ onSuccess: () => window.location.assign(returnTo) });
  const pending = login.isPending || register.isPending; const error = login.error?.message ?? register.error?.message;
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (mode === "login") login.mutate({ email, password }); else register.mutate({ name, email, password }); };
  return <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900" dir="rtl"><section className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><div className="mb-7 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-700 text-white"><ShieldCheck className="h-6 w-6" /></span><div><p className="text-lg font-bold">PharmaYemen</p><p className="text-sm text-slate-500">نسخة العرض والتوثيق</p></div></div><h1 className="text-xl font-bold">{mode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}</h1><p className="mt-2 text-sm leading-6 text-slate-600">تستخدم هذه النسخة حساباً محلياً معيارياً. يمكن استبداله بمزوّد هوية مؤسسي عند النشر.</p><form className="mt-6 space-y-4" onSubmit={submit}>{mode === "register" && <div className="space-y-2"><Label htmlFor="name">الاسم</Label><Input id="name" value={name} onChange={event => setName(event.target.value)} required minLength={2} /></div>}<div className="space-y-2"><Label htmlFor="email">البريد الإلكتروني</Label><Input id="email" dir="ltr" type="email" value={email} onChange={event => setEmail(event.target.value)} required /></div><div className="space-y-2"><Label htmlFor="password">كلمة المرور</Label><Input id="password" dir="ltr" type="password" value={password} onChange={event => setPassword(event.target.value)} required minLength={10} /></div>{error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<Button className="w-full" disabled={pending} type="submit">{pending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}{mode === "login" ? "دخول آمن" : "إنشاء الحساب"}</Button></form><button className="mt-5 w-full text-sm font-medium text-emerald-700 underline-offset-4 hover:underline" onClick={() => setMode(mode === "login" ? "register" : "login")} type="button">{mode === "login" ? "ليس لديك حساب؟ أنشئ حساباً" : "لديك حساب بالفعل؟ سجّل الدخول"}</button></section></main>;
}
