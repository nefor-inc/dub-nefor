import { PlainClient } from "@team-plain/typescript-sdk";

export const plain = new PlainClient({
  apiKey:
    process.env.PLAIN_API_KEY ||
    (process.env.NEXT_PUBLIC_SELF_HOSTED === "true"
      ? "self-hosted-support-disabled"
      : ""),
});

export type PlainUser = {
  id: string;
  name: string | null;
  email: string | null;
};
