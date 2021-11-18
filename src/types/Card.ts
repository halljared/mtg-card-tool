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

export function cardEquals(a: Card, b: Card): boolean {
  return a.name + a.setCode == b.name + b.setCode;
}
