import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";
import { ScryfallCard, cardEquals } from "@/types/Card";

@Module({ name: "cards", store, dynamic: true })
class CardModule extends VuexModule {
  collection: ScryfallCard[] = [];
  wants: ScryfallCard[] = [];

  @Mutation
  setCollection(cards: ScryfallCard[]) {
    this.collection = Array.from(cards);
  }
  @Mutation
  setWants(cards: ScryfallCard[]) {
    this.wants = Array.from(cards);
  }
  @Mutation
  pushWant(card: ScryfallCard) {
    this.wants.push(Object.assign({}, card));
  }
  @Mutation
  filterWant(card: ScryfallCard) {
    this.wants = this.wants.filter((_card) => {
      return !cardEquals(card, _card);
    });
  }

  @Action({ commit: "setCollection" })
  importCollection(cards: ScryfallCard[]) {
    return cards;
  }
  @Action({ commit: "setWants" })
  importWants(cards: ScryfallCard[]) {
    return cards;
  }
  @Action({ commit: "pushWant" })
  addWant(card: ScryfallCard) {
    return card;
  }
  @Action({ commit: "filterWant" })
  removeWant(card: ScryfallCard) {
    return card;
  }
}

export default getModule(CardModule);
