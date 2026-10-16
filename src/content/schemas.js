// Field definitions for the lists admins manage from the dashboard.
// Shared by the dashboard forms (client) and the save actions (server), so
// what the form shows and what the server accepts can't drift apart.

export const COMMITTEE_ICONS = [
  { value: "leaf", label: "Leaf" },
  { value: "recycle", label: "Recycling" },
  { value: "bolt", label: "Energy" },
  { value: "bike", label: "Bike" },
  { value: "mega", label: "Megaphone" },
  { value: "campus", label: "Campus" },
];

export const SCHEMAS = {
  committees: {
    label: "Committee",
    plural: "Committees",
    noun: "committees",
    titleField: "name",
    ordered: false,
    fields: [
      { name: "name", label: "Committee name", type: "text", required: true, max: 80 },
      { name: "description", label: "Description", type: "textarea", required: true, max: 600, rows: 3 },
      { name: "goals", label: "Goals for this year", type: "lines", max: 6, hint: "One goal per line" },
      { name: "meetingTime", label: "Meeting time", type: "text", max: 80, placeholder: "e.g. Tuesdays, 5:00 PM" },
      { name: "meetingLocation", label: "Meeting location", type: "text", max: 120, placeholder: "e.g. GC 150, MMC" },
      { name: "contactEmail", label: "Contact email", type: "email", max: 120 },
      { name: "icon", label: "Icon", type: "select", options: COMMITTEE_ICONS },
      { name: "image", label: "Photo", type: "image", folder: "committees" },
    ],
  },
  team: {
    label: "Officer",
    plural: "Officers",
    noun: "officers",
    titleField: "name",
    subtitleField: "role",
    ordered: true,
    fields: [
      { name: "name", label: "Name", type: "text", required: true, max: 80 },
      { name: "role", label: "Role", type: "text", required: true, max: 80, placeholder: "e.g. President" },
      { name: "bio", label: "Short bio", type: "textarea", max: 300, rows: 3, hint: "One or two sentences" },
      { name: "photoUrl", label: "Headshot", type: "image", folder: "team", square: true },
      { name: "linkedin", label: "LinkedIn link", type: "url", max: 200, placeholder: "https://www.linkedin.com/in/…" },
      { name: "email", label: "Public email", type: "email", max: 120, hint: "Optional. Shown on the site." },
    ],
  },
  events: {
    label: "Event",
    plural: "Events",
    noun: "events",
    titleField: "title",
    subtitleField: "date",
    ordered: false,
    fields: [
      { name: "title", label: "Event name", type: "text", required: true, max: 100 },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "time", label: "Time", type: "text", max: 60, placeholder: "e.g. 6:00 PM" },
      { name: "where", label: "Where", type: "text", max: 120, placeholder: "e.g. GC 150, MMC" },
      { name: "description", label: "Description", type: "textarea", max: 400, rows: 3 },
      { name: "link", label: "Details or RSVP link", type: "url", max: 300, hint: "Optional. Defaults to our Instagram." },
    ],
  },
  faq: {
    label: "Question",
    plural: "FAQ",
    noun: "questions",
    titleField: "question",
    ordered: true,
    fields: [
      { name: "question", label: "Question", type: "text", required: true, max: 200 },
      { name: "answer", label: "Answer", type: "textarea", required: true, max: 1200, rows: 4 },
    ],
  },
};

// Validates raw form values against a schema. Returns { data } or { error }.
export function validateItem(schema, get) {
  const data = {};
  for (const f of schema.fields) {
    const raw = get(f.name);
    let v = typeof raw === "string" ? raw.trim() : raw;

    if (f.type === "lines") {
      v = String(v || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, f.max || 10)
        .map((s) => s.slice(0, 200));
      data[f.name] = v;
      continue;
    }
    v = String(v || "");
    if (f.required && !v) return { error: `${f.label} is required.` };
    if (f.max && v.length > f.max) return { error: `${f.label} is too long (max ${f.max} characters).` };
    if (v && f.type === "email" && !/^\S+@\S+\.\S+$/.test(v)) return { error: `${f.label} doesn't look like an email address.` };
    if (v && f.type === "url" && !/^https:\/\/\S+$/.test(v)) return { error: `${f.label} must start with https://` };
    if (v && f.type === "image" && !v.startsWith("https://res.cloudinary.com/")) return { error: `Upload the ${f.label.toLowerCase()} with the photo button.` };
    if (v && f.type === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(v)) return { error: `${f.label} isn't a valid date.` };
    if (v && f.type === "select" && !f.options.some((o) => o.value === v)) return { error: `Pick a ${f.label.toLowerCase()}.` };
    data[f.name] = v;
  }
  return { data };
}
