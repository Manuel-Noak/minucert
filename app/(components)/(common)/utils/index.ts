import { createHash } from "crypto";

export function generateDailyHash(value: string): string {
  const today: string = new Date().toISOString().split("T")[0];
  const input: string = `${value}-${today}`;

  return createHash("sha256").update(input).digest("hex");
}
