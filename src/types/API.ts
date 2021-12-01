import { Identity } from "@/types/Card";
export const API_HOST = process.env.API_HOST;
export const FETCH_CARD_ROUTE = "fetch_card";
export const FETCH_All_CARDS_ROUTE = "cards/all";
export const FETCH_PAGE_ROUTE = "cards/page";
export const FETCH_SUPERTYPE_OPTIONS_ROUTE = "options/supertypes";
export const FETCH_SUBTYPE_OPTIONS_ROUTE = "options/subtypes";
export const FETCH_CARD_NAME_OPTIONS_ROUTE = "options/cardnames";
export const FETCH_SET_NAME_OPTIONS_ROUTE = "options/setnames";
export const FETCH_KEYWORD_OPTIONS_ROUTE = "options/keywords";

export interface FilterOptions {
  name: string;
  text: string;
  setNames: string[];
  superTypes: string[];
  subTypes: string[];
  keywords: string[];
  colors: Identity[];
}
