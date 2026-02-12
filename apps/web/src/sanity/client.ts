import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "bgkp6123",
  dataset: "production",
  apiVersion: "2026-02-12",
  useCdn: false,
});