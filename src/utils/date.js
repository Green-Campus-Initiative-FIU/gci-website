// **  Converts Firestore Timestamp or Date to Milliseconds **
export function toMillis(input) {
  if (!input) return null;
  if (typeof input?.toMillis === "function") return input.toMillis(); // Firestore Timestamp
  if (input instanceof Date) return input.getTime();
  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? null : d.getTime();
}

// ** Converts various date formats to a Date object **
export function toDate(input) {
  if (!input) return null;
  // Firestore Timestamp has a toDate() method
  if (typeof input?.toDate === "function") return input.toDate();
  // Date object
  if (input instanceof Date) return input;
  // Number (ms)
  if (typeof input === "number") return new Date(input);
  // ISO String
  if (typeof input === "string") return new Date(input);
  return null;
}


// ** Formats a date as MM/DD/YYYY **
export function formatLocaleMMDDYYYY(input) {
  const date = toDate(input);
  if (!date || isNaN(date.getTime())) return "Invalid Date";
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

// ** Formats a date as MM/DD/YYYY but fixed to gregorian **
export function formatFixedMMDDYYYY(input) {
  const date = toDate(input);
  if (!date || isNaN(date.getTime())) return "";
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

// ** Formats a date as Month Day, Year **
export function formatTextDate(input, { shortMonths = false } = {}) {
  const date = toDate(input);
  if (!date || isNaN(date.getTime())) return "Invalid Date";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: shortMonths ? "short" : "long",
    day: "numeric",
  });
}
