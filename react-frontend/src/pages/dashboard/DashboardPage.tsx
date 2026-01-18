import { useAuthStore } from "@/store/auth.store";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {user?.name ? `Welcome, ${user.name}` : "Welcome!"}
      </p>
    </div>
  );
}
