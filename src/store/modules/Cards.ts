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
    localStorage.setItem("wants", JSON.stringify(this.wants));
  }
  @Mutation
  pushWant(card: ScryfallCard) {
    this.wants.push(Object.assign({}, card));
    localStorage.setItem("wants", JSON.stringify(this.wants));
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
  @Action
  clearWants() {
    this.context.commit("setWants", []);
  }
  @Action({ commit: "pushWant" })
  addWant(card: ScryfallCard) {
    return card;
  }
  @Action({ commit: "filterWant" })
  removeWant(card: ScryfallCard) {
    return card;
  }
  @Action
  vivifyLocalWants() {
    const wants = localStorage.getItem("wants");
    let cards: ScryfallCard[] = [];
    if (wants) {
      cards = JSON.parse(wants);
    }
    this.context.commit("setWants", cards);
  }
}

export default getModule(CardModule);
