import { lang } from "@/lang";

export function parseApiErrorMessage(
  data: unknown,
  fallback = lang.errors.unknownError
): string {
  if (
    data &&
    typeof data === "object" &&
    "error" in data &&
    typeof (data as { error: unknown }).error === "string"
  ) {
    return (data as { error: string }).error;
  }

  return fallback;
}

export function resolveClientError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return lang.errors.defaultClientError;
}
