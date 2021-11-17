import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";
import Card from "@/types/Card";

@Module({ name: "cards", store, dynamic: true })
class CardModule extends VuexModule {
  collection: Card[] = [];

  @Mutation
  setCollection(cards: Card[]) {
    this.collection = Array.from(cards);
  }

  @Action({ commit: "setCollection" })
  importCollection(cards: Card[]) {
    return cards;
  }
}

export default getModule(CardModule);
