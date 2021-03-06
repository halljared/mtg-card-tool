import { CSV } from "@/types/CSV";
export enum Condition {
  NM = "NM",
  LP = "LP",
  MP = "MP",
  HP = "HP",
  D = "D",
}
export enum Printing {
  NORMAL = "Normal",
  FOIL = "Foil",
}
export enum Identity {
  WHITE = "W",
  BLUE = "U",
  BLACK = "B",
  RED = "R",
  GREEN = "G",
}
export interface Price {
  usd: string;
  usd_foil: string;
}
export default interface Card {
  name: string;
  setNumber: number;
  setCode: string;
  condition: Condition;
  quantity: number;
  printing: Printing;
}
export interface ScryfallCard {
  id?: string;
  object: string; // "card"
  name: string; // "Brazen Wolves"
  printing: Printing; // "Normal"
  quantity: number;
  language: string; // "en"
  uri: string; // "https://api.scryfall.com/cards/ab8e2ece-3c66-4f34-9042-fc02639c6a79"
  scryfall_uri: string; // "https://scryfall.com/card/emn/122/brazen-wolves?utm_source=api"
  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
  };
  keywords: string[];
  mana_cost: "string"; // "{2}{R}"
  cmc: number; // 3
  superTypes: string[];
  subTypes: string[];
  power?: "string"; // "2"
  toughness?: "string"; // "3"
  colors: string[];
  color_identity: string[];
  oracle_text: string;
  legalities: {
    [key: string]: string;
  };
  reserved: boolean;
  set: string; // "emn"
  set_name: string; // "Eldritch Moon"
  collector_number: number; // "122";
  rarity: string; // "common";
  artist: string; // "Nils Hamm";
  price: number;
}

export function cardEquals(a: ScryfallCard, b: ScryfallCard): boolean {
  return key(a) == key(b);
}

export function key(c: ScryfallCard): string {
  return `${c.collector_number}_${c.set.toLowerCase()}_${c.printing}_${
    c.language
  }`;
}

export function fromCSV(csv: CSV): Card {
  return {
    name: csv["Name"],
    condition: Condition.NM,
    setCode: csv["Set Code"],
    setNumber: parseInt(csv["Card Number"]),
    quantity: parseInt(csv["Quantity"]),
    printing: csv["Printing"] as Printing,
  };
}
