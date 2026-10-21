"use client";

import { useState } from "react";
import { honeypotField } from "@/lib/forms/constants";

export function useFormStartedAt() {
  const [startedAt] = useState(() => Date.now());
  return startedAt;
}

/** Off-screen field. Bots fill it; people never see it. `id` must be unique per form. */
export function Honeypot({ id }: { id: string }) {
  return (
    <div
      className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
      aria-hidden="true"
    >
      <label htmlFor={id}>Company website</label>
      <input
        id={id}
        name={honeypotField}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
        data-1p-ignore="true"
        data-lpignore="true"
      />
    </div>
  );
}
