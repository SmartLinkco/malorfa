import { redirect } from "next/navigation";

/** Alias route for author / books. */
export default function AuthorAlias() {
  redirect("/books");
}
