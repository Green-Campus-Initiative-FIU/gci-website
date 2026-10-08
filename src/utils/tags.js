// ** Parses tags from a form data object **
export function parseTags(formData, field = "tagsJson") {
  const raw = formData.get(field);
  if (!raw) return [];
  try {
    const arr = JSON.parse(String(raw));
    if (!Array.isArray(arr)) return [];
    return Array.from(
      new Set(arr.map((t) => String(t).trim()).filter(Boolean))
    );
  } catch {
    return [];
  }
}
