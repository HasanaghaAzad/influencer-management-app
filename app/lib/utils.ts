export function lines2arr(lines: string): string[] {
  return lines.split("\n").filter((line) => line.trim());
}
