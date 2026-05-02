import path from "path";

export function createFileName(originalName) {
  const ext = path.extname(originalName);

  const name = originalName
    .replace(ext, "")
    .toLowerCase()
    .replace(/\s+/g, "-")        // spaces → -
    .replace(/[^a-z0-9-]/g, ""); // remove weird chars

  return `${name}-${Date.now()}${ext}`;
}