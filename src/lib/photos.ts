/** One photo per line: "url" or "url|caption". */
export function parsePhotoList(raw: string): { src: string; caption?: string }[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [src, caption] = line.split("|");
      return { src: src.trim(), caption: caption?.trim() };
    });
}
