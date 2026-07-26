import { type Camper } from "@/types/camper";

export function getCamperCoverImage(camper: Camper): string {
  if (camper.coverImage) {
    return camper.coverImage;
  }
  
  if (camper.gallery && camper.gallery.length > 0) {
    return camper.gallery[0].thumb || camper.gallery[0].original;
  }

  return "/images/placeholder-camper.webp";
}

export function formatLabel(str: string) {
  if (!str) return "";

  if (str.toLowerCase() === "ac") {
    return "AC";
  }
  return str.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
}