import { z } from "zod";

export const CalendarEventSchema = z.object({
  title: z.string(),
  date: z.string(),  // ISO 8601 format recommended
  start_time: z.string(), // "18:00"
  end_time: z.string(),   // "19:00"
  location: z.string(),
});



export type CalendarEvent = z.infer<typeof CalendarEventSchema>;

