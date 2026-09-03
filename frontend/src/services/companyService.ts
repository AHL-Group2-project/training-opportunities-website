import api from "../lib/axios";

export interface PublicCompany {
  _id: string;
  name: string;
  field: string;
  website?: string;
}

export const getPublicCompanies = async (): Promise<PublicCompany[]> => {
  const { data } = await api.get<PublicCompany[]>("/companies/public");
  return data;
};
