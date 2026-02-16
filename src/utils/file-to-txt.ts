export default async function fileToText(file: File): Promise<string | null> {
  if (!(file instanceof File)) {
    return null;
  }

  const reader = new FileReader();
  reader.readAsText(file);

  return new Promise((resolve) => {
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      }
    });
  });
}
