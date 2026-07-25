export type Filters = {
  location: string;
  forms: Array<'alcove' | 'panel_van' | 'integrated' | 'semi_integrated'>;
  transmissions: Array<'automatic' | 'manual'>;
  engines: Array<'diesel' | 'petrol' | 'hybrid' | 'electric'>;
};

export type GetCampersParams = {
  page?: number;
  perPage?: number;
  location?: string;
  form?: string;
  transmission?: string;
  engine?: string;
};