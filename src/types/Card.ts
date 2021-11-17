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
