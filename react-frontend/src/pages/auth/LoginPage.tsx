import { useState } from "react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { loginSchema, type LoginSchema } from "@/validations/auth.schema";
import { authService } from "@/services/auth/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/shared/constants/routes";
import { FormError } from "@/components/forms/FormError";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setToken = useAuthStore((s) => s.setToken);

  const [values, setValues] = useState<LoginSchema>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginSchema, string>>>({});
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: Location })?.from?.pathname ?? ROUTES.ROOT;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof LoginSchema | undefined;
        if (key) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please fix validation errors");
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const res = await authService.login(parsed.data);
      setToken(res.accessToken);
      toast.success("Logged in");
      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-24 w-full max-w-sm rounded-xl border p-6">
      <h1 className="text-xl font-semibold">Login</h1>
      <p className="mt-1 text-sm text-muted-foreground">Use your credentials to continue.</p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            autoComplete="email"
          />
          <FormError message={errors.email} />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2"
            value={values.password}
            onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
            autoComplete="current-password"
          />
          <FormError message={errors.password} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          {loading ? "Signing inâ€¦" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
