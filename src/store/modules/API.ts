import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import axios from "axios";
import store from "@/store";
import Card, { key, ScryfallCard } from "@/types/Card";
import {
  DB_HOST,
  FETCH_All_CARDS_ROUTE,
  FETCH_CARD_ROUTE,
  FETCH_PAGE_ROUTE,
} from "@/types/API";
import { DataTableOptions } from "../../types/Vuetify";

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
    let sfCard = options[1];
    sfCard = Object.assign(Object.assign({}, card), sfCard);
    sfCard.id = key(sfCard);
    this.fetchedCards.push(sfCard);
  }
  @Mutation
  setFetchedCards(cards: ScryfallCard[]) {
    for (const card of cards) {
      card.id = key(card);
    }
    this.fetchedCards = cards;
  }

  @Action
  fetchAll(): Promise<void> {
    return axios
      .get<ScryfallCard>(`${DB_HOST}/${FETCH_All_CARDS_ROUTE}`)
      .then((response) => {
        if (response.data) {
          this.context.commit("setFetchedCards", response.data);
        }
      });
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

  @Action
  fetchPage(
    tableOptions: DataTableOptions,
    filters: any
  ): Promise<void | ScryfallCard[]> {
    return axios
      .post<ScryfallCard>(`${DB_HOST}/${FETCH_PAGE_ROUTE}`, {
        tableOptions,
        filters,
      })
      .then((response) => {
        this.context.commit("setResponse", response.data);
        if (response.data) {
          this.context.commit("setFetchedCards", response.data);
        }
      });
  }
}

export default getModule(APIModule);
