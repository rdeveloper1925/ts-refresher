import * as z from "zod";
import { client } from "./openai";
import { CalendarEventSchema,  type CalendarEvent } from "./schema.ts";

export async function extractCalendarEvent(input: string): Promise<CalendarEvent | null> {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini", // or "gpt-4o-mini" for cheaper
    messages: [
      { role: "system", content: "You are an AI that extracts structured event data from natural language." },
      { role: "user", content: input },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "calendar_event",
        schema: z.toJSONSchema(CalendarEventSchema), // pass zod schema here
      },
    },
  });

  const raw = response.choices[0].message.content;

  if (!raw) return null;

  try {
    return CalendarEventSchema.parse(JSON.parse(raw));
  } catch (err) {
    console.error("Schema validation failed:", err);
    return null;
  }
}
