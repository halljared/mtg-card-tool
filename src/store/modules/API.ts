import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import axios from "axios";
import store from "@/store";
import Card, { ScryfallCard, sfKey } from "@/types/Card";
import { DB_HOST, FETCH_CARD_ROUTE } from "@/types/API";

@Module({ name: "api", store, dynamic: true })
class APIModule extends VuexModule {
  response = "";
  fetchedCards: {
    [key: string]: ScryfallCard;
  } = {};

  @Mutation
  setResponse(val: string) {
    this.response = JSON.stringify(val);
  }
  @Mutation
  addFetchedCard(card: ScryfallCard) {
    this.fetchedCards[sfKey(card)] = Object.assign({}, card);
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
          this.context.commit("addFetchedCard", response.data);
        }
      });
  }
}

export default getModule(APIModule);
