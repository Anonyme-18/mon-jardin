"use client";

import { useRef, useState } from "react";
import { Camera, ImagePlus, Loader2, X } from "lucide-react";
import {
  MAX_FENCE_PHOTOS,
  compressImageFiles,
} from "@/lib/fencePhotos";
import { cn } from "@/lib/utils";

interface FencePhotoUploadProps {
  photos: string[];
  onChange: (photos: string[]) => void;
  error?: string;
}

export function FencePhotoUpload({
  photos,
  onChange,
  error,
}: FencePhotoUploadProps) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const canAddMore = photos.length < MAX_FENCE_PHOTOS;

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setLocalError(null);
    setLoading(true);
    try {
      const compressed = await compressImageFiles(files, photos.length);
      if (compressed.length === 0) {
        setLocalError(`Maximum ${MAX_FENCE_PHOTOS} photos.`);
        return;
      }
      onChange([...photos, ...compressed]);
    } catch {
      setLocalError("Impossible de traiter l'image. Réessayez.");
    } finally {
      setLoading(false);
      if (uploadRef.current) uploadRef.current.value = "";
      if (cameraRef.current) cameraRef.current.value = "";
    }
  };

  const removePhoto = (index: number) => {
    onChange(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {photos.map((photo, index) => (
          <div
            key={`${index}-${photo.slice(0, 32)}`}
            className="relative h-28 w-28 overflow-hidden rounded-xl border border-sage-border ring-1 ring-sage-border"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo}
              alt={`Photo du mur ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="absolute right-1 top-1 rounded-full bg-forest-dark/90 p-1 text-white hover:bg-forest-dark"
              aria-label="Supprimer la photo"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {canAddMore && (
          <>
            <button
              type="button"
              disabled={loading}
              onClick={() => uploadRef.current?.click()}
              className={cn(
                "flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sage-border bg-cream-warm text-xs font-medium text-forest transition-colors hover:border-forest hover:bg-sage/40",
                loading && "opacity-60"
              )}
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  <ImagePlus className="h-6 w-6" />
                  Importer
                </>
              )}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => cameraRef.current?.click()}
              className={cn(
                "flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-forest/40 bg-white text-xs font-medium text-forest transition-colors hover:border-forest hover:bg-sage/30",
                loading && "opacity-60"
              )}
            >
              <Camera className="h-6 w-6" />
              Prendre une photo
            </button>
          </>
        )}
      </div>

      <input
        ref={uploadRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <p className="text-xs text-forest/60">
        {photos.length}/{MAX_FENCE_PHOTOS} photo{photos.length > 1 ? "s" : ""} —
        montrez le mur, la clôture et l&apos;accès depuis la cour ou la rue.
      </p>

      {(error || localError) && (
        <p className="text-sm text-soil">{error || localError}</p>
      )}
    </div>
  );
}
