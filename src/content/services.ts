export type ServiceKey = "awareness" | "business" | "compliance" | "corporate";

export type ServiceFieldKey =
  | "price"
  | "duration"
  | "format"
  | "audience"
  | "focus"
  | "includes";

export type ServiceDefinition = {
  key: ServiceKey;
  /** Which optional fields (besides price + duration) this service exposes. */
  fields: ServiceFieldKey[];
};

export const services: ServiceDefinition[] = [
  {
    key: "awareness",
    fields: ["price", "duration", "format"],
  },
  {
    key: "business",
    fields: ["price", "duration", "audience"],
  },
  {
    key: "compliance",
    fields: ["price", "duration", "focus"],
  },
  {
    key: "corporate",
    fields: ["price", "duration", "includes"],
  },
];
