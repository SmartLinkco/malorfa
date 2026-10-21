export type FormResponse = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};

export async function postForm(url: string, body: unknown): Promise<FormResponse> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = (await response.json().catch(() => null)) as Partial<FormResponse> | null;
    if (!data || typeof data.ok !== "boolean" || typeof data.message !== "string") {
      return {
        ok: false,
        message: "Something went wrong. Please try again in a moment.",
      };
    }

    const fieldErrors =
      data.fieldErrors && typeof data.fieldErrors === "object" ? data.fieldErrors : undefined;

    return { ok: data.ok, message: data.message, fieldErrors };
  } catch {
    return {
      ok: false,
      message: "We couldn't reach the server. Check your connection and try again.",
    };
  }
}
