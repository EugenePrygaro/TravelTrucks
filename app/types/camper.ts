export type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string,
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: string[]
  gallery?: CamperGalleryObject[],
  coverImage?: string,
  totalReviews: number;
};

export type CamperGalleryObject = {
    id: string,
    camperId: string,
    thumb: string,
    original: string,
    order: number
}

export type CampersResponse = {
    page: number,
  perPage: number,
  total: number,
  totalPages: number,
  campers: Camper[]
}