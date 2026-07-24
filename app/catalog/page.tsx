import CamperCard from "@/components/CamperCard/CamperCard";

export default function CampersCatalog() {
  return (
    <>
      <CamperCard
        id="2"
        name="Canyon Alcove 21"
        price={9500}
        rating={4.4}
        totalReviews={2}
        location="Ukraine, Kyiv"
        description="The Canyon Alcove 21 is a classic alcove-style motorhome designed for small families seeking a reliable and comfortable road companion. Its diesel engine delivers steady performance on long routes, while the well-organized interior provides everything needed for a memorable journey."
        form="alcove"
        transmission="automatic"
        engine="diesel"
        coverImage="https://ac.goit.global/fullstack/career/campers/cruise-america-c-21/cruise-america-c-21-1.jpg"
      />
    </>
  );
}
