import axios from "axios";

import { type Camper, type CampersResponse } from "@/types/camper";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type getCampersParams = {
  page?: number;
  perPage?: number;
  location?: string;
  form?: string;
  transmission?: string;
  engine?: string;
};

export async function getCampers(params?: getCampersParams ): Promise<CampersResponse> {
    const res = await axios.get<CampersResponse>(`${BASE_URL}/campers`, {
        params,
    });

    return res.data;
}