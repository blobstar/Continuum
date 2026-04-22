import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name").max(120),
  email: z.email("Please enter a valid work email"),
  company: z.string().min(2, "Please enter your company").max(160),
  service: z.enum(["awareness", "business", "compliance", "corporate", "other"]),
  message: z
    .string()
    .min(10, "A little more detail helps us route your enquiry")
    .max(4000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
