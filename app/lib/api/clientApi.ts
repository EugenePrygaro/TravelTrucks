import axios from "axios";

import { type CampersResponse, type Camper } from "@/types/camper";
import { type Filters, type GetCampersParams } from "@/types/filters";
import { type Review } from "@/types/review";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export async function getCampers(params?: GetCampersParams ): Promise<CampersResponse> {
    const res = await axios.get<CampersResponse>(`${BASE_URL}/campers`, {
        params,
    });

    return res.data;
}

export async function getCamperById(id: string): Promise<Camper> {
    const res = await axios.get<Camper>(`${BASE_URL}/campers/${id}`)

    return res.data;
}

export async function getFilters(): Promise<Filters> {
    const res = await axios.get<Filters>(`${BASE_URL}/campers/filters`)
    return res.data;
}

export async function getReviews(id: string): Promise<Review[]> {
    const res = await axios.get<Review[]>(`${BASE_URL}/campers/${id}/reviews`)
    return res.data;
}

