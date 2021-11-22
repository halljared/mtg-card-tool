import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import axios from "axios";
import store from "@/store";
import Card, { ScryfallCard } from "@/types/Card";
import { DB_HOST, FETCH_CARD_ROUTE } from "@/types/API";

@Module({ name: "api", store, dynamic: true })
class APIModule extends VuexModule {
  response = "";
  fetchedCards: ScryfallCard[] = [];

  @Mutation
  setResponse(val: string) {
    this.response = JSON.stringify(val);
  }
  @Mutation
  addFetchedCard(options: [Card, ScryfallCard]) {
    const card = options[0];
    const sfCard = options[1];
    this.fetchedCards.push(Object.assign(Object.assign({}, card), sfCard));
  }

  @Action
  fetchCard(card: Card): Promise<void | ScryfallCard> {
    return axios
      .get<ScryfallCard>(
        `${DB_HOST}/${FETCH_CARD_ROUTE}/set/${card.setCode.toLowerCase()}/number/${
          card.setNumber
        }`
      )
      .then((response) => {
        this.context.commit("setResponse", response.data);
        if (response.data) {
          this.context.commit("addFetchedCard", [card, response.data]);
        }
      });
  }
}

export default getModule(APIModule);
