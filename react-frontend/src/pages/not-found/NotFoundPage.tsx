import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";

export default function NotFoundPage() {
  return (
    <div className="mx-auto mt-24 w-full max-w-md text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">The page youâ€™re looking for doesnâ€™t exist.</p>
      <Link className="mt-6 inline-block rounded-md border px-4 py-2 text-sm" to={ROUTES.ROOT}>
        Go home
      </Link>
    </div>
  );
}
