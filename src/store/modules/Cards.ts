import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";
import Card from "@/types/Card";
import { cardEquals } from "../../types/Card";

@Module({ name: "cards", store, dynamic: true })
class CardModule extends VuexModule {
  collection: Card[] = [];
  wants: Card[] = [];

  @Mutation
  setCollection(cards: Card[]) {
    this.collection = Array.from(cards);
  }
  @Mutation
  setWants(cards: Card[]) {
    this.wants = Array.from(cards);
  }
  @Mutation
  pushWant(card: Card) {
    this.wants.push(Object.assign({}, card));
  }
  @Mutation
  filterWant(card: Card) {
    this.wants = this.wants.filter((_card) => {
      return !cardEquals(card, _card);
    });
  }

  @Action({ commit: "setCollection" })
  importCollection(cards: Card[]) {
    return cards;
  }
  @Action({ commit: "setWants" })
  importWants(cards: Card[]) {
    return cards;
  }
  @Action({ commit: "pushWant" })
  addWant(card: Card) {
    return card;
  }
  @Action({ commit: "filterWant" })
  removeWant(card: Card) {
    return card;
  }
}

export default getModule(CardModule);
