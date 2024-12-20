import { APIResponse } from "@playwright/test";
import { ZodType } from "zod";

export async function validateSchema(response: APIResponse, schema: ZodType) {
  try {
    schema.parse(await response.json());
  } catch (error) {
    console.log(await response.json());
    throw new Error(`Schema does not accurate. Following error: ${error}`);
  }
}
