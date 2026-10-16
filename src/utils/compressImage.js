// Shrinks a photo in the browser before upload: phone photos are often 5-15 MB,
// far over what the server (and Vercel) accept. Returns a JPEG File no larger
// than `maxSide` px on its longest side, or the original if it can't be decoded
// (e.g. HEIC in Chrome) or is already small.
export async function compressImage(file, { maxSide = 2000, quality = 0.85 } = {}) {
  if (!file?.type?.startsWith("image/") || /gif|svg/.test(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 900 * 1024) return file;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff"; // flatten transparency onto white for JPEG
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

const MAX_UPLOAD = 4 * 1024 * 1024; // matches serverActions.bodySizeLimit in next.config.mjs

// Compresses and size-checks a photo. Returns { file } or { error }.
export async function prepareUpload(file, options) {
  const out = await compressImage(file, options);
  if (out.size > MAX_UPLOAD) {
    return { error: "That photo is too big to upload. Try a JPG or PNG version (iPhone: Settings → Camera → Formats → Most Compatible)." };
  }
  return { file: out };
}
