import axios from "axios";

import { type CampersResponse } from "@/types/camper";
import { type Filters, type GetCampersParams } from "@/types/filters";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export async function getCampers(params?: GetCampersParams ): Promise<CampersResponse> {
    const res = await axios.get<CampersResponse>(`${BASE_URL}/campers`, {
        params,
    });

    return res.data;
}

export async function getFilters(): Promise<Filters> {
    const res = await axios.get<Filters>(`${BASE_URL}/campers/filters`)
    console.log(res.data);
    return res.data;
}

