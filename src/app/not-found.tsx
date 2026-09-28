import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container-page section-pad max-w-xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl text-ink">Page not found</h1>
      <p className="mt-4 text-ink/65">
        That route does not exist yet—or the placeholder link still needs a real URL.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/">Home</Button>
        <Button href="/contact" variant="secondary">
          Contact
        </Button>
      </div>
      <p className="mt-6 text-sm">
        <Link href="/travel" className="text-forest hover:underline">
          Travel journal
        </Link>
        {" · "}
        <Link href="/books" className="text-forest hover:underline">
          Books
        </Link>
      </p>
    </div>
  );
}
