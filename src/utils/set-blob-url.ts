export function setBlobUrl(data: string, name: "csv" | "json"): string {
  let type = "";

  if (name === "csv") {
    type = "text/plain";
  } else if (name === "json") {
    type = "application/json";
  }

  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  return url;
}
