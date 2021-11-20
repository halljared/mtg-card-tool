export enum Condition {
  NM = "NM",
  LP = "LP",
  MP = "MP",
  HP = "HP",
  D = "D",
}
export default interface Card {
  name: string;
  setNumber: number;
  setCode: string;
  condition: Condition;
}
export interface ScryfallCard {
  object: string; // "card"
  name: string; // "Brazen Wolves"
  lang: string; // "en"
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
  mana_cost: "string"; // "{2}{R}"
  cmc: number; // 3
  type_line: "string"; // "Creature — Wolf"
  power?: "string"; // "2"
  toughness?: "string"; // "3"
  colors: string[];
  color_identity: string[];
  legalities: {
    [key: string]: string;
  };
  reserved: boolean;
  set: string; // "emn"
  set_name: string; // "Eldritch Moon"
  collector_number: number; // "122";
  rarity: string; // "common";
  artist: string; // "Nils Hamm";
  prices: {
    usd: string | null; // "0.06";
    usd_foil: string | null;
    usd_etched: string | null;
    eur: string | null;
    eur_foil: string | null;
  };
}

export function cardEquals(a: Card, b: Card): boolean {
  return key(a) == key(b);
}
export function sfCardEquals(a: ScryfallCard, b: ScryfallCard): boolean {
  return sfKey(a) == sfKey(b);
}

export function key(c: Card): string {
  return c.name.toLowerCase() + c.setCode.toLowerCase();
}
export function sfKey(c: ScryfallCard): string {
  return c.name.toLowerCase() + c.set.toLowerCase();
}
