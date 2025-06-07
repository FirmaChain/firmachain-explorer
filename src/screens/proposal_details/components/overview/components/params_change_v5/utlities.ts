export function extractModuleName(type?: string): string {
    console.log(type);
  if (typeof type !== "string") {
    return "unknown";
  }

  if (type.startsWith("/cosmos.")) {
    const parts = type.split(".");
    return parts[1] || "unknown";
  }

  if (type.startsWith("/ibc.")) {
    const parts = type.split(".");
    const idx = parts.findIndex(p =>
      ["applications", "core", "lightclients"].includes(p)
    ) + 1;
    return parts[idx] || "unknown";
  }

  if (type.startsWith("/icq.")) {
    return "icq";
  }

  return "unknown";
}


