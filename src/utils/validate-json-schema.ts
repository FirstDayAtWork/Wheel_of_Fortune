export function validateJsonSchema<T>(data: T): T | false {
  return (
    data instanceof Object &&
    "title" in data &&
    typeof data.title === "string" &&
    "weight" in data &&
    typeof data.weight === "number" &&
    Object.keys(data).length === 2 &&
    data
  );
}
