import { getAdminDb, FieldValue } from "./firebase-admin";

export interface SaveContactInput {
  name: string;
  email: string;
  company: string;
  teamSize: string;
  message?: string;
  userAgent: string;
}

export function buildContactDoc(input: SaveContactInput) {
  return {
    name: input.name,
    email: input.email,
    company: input.company,
    subject: `Demo talebi — ekip ${input.teamSize}`,
    message: input.message || "",
    userAgent: input.userAgent,
    pageUrl: "https://collbrai.com/#contact",
    createdAt: FieldValue.serverTimestamp(),
  };
}

export async function saveTrackerContact(
  input: SaveContactInput
): Promise<{ ok: boolean; error?: string }> {
  try {
    await getAdminDb().collection("tracker-contacts").add(buildContactDoc(input));
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "unknown" };
  }
}
