const MAX_WIDTH = 900;
const JPEG_QUALITY = 0.72;
export const MAX_FENCE_PHOTOS = 4;

export async function compressImageFile(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Le fichier doit être une image.");
  }

  const dataUrl = await readFileAsDataUrl(file);
  return resizeDataUrl(dataUrl, MAX_WIDTH, JPEG_QUALITY);
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Impossible de lire l'image."));
    reader.readAsDataURL(file);
  });
}

function resizeDataUrl(
  dataUrl: string,
  maxWidth: number,
  quality: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const ratio = Math.min(1, maxWidth / img.width);
      const width = Math.round(img.width * ratio);
      const height = Math.round(img.height * ratio);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas indisponible."));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => reject(new Error("Image invalide."));
    img.src = dataUrl;
  });
}

export async function compressImageFiles(
  files: FileList | File[],
  currentCount: number
): Promise<string[]> {
  const list = Array.from(files);
  const remaining = MAX_FENCE_PHOTOS - currentCount;
  if (remaining <= 0) return [];

  const selected = list.slice(0, remaining);
  return Promise.all(selected.map(compressImageFile));
}
