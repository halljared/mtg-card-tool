<template>
  <v-container>
    <CardList :cards="wants" wants />
    <div v-if="wants.length">
      <v-card outlined tile elevation="4">
        <v-card-actions>
          <v-spacer />
          <v-dialog v-model="confirm">
            <template v-slot:activator="{ on, val }">
              <v-btn outlined v-on="on" v-bind="val" color="error" class="mr-4">
                Clear Wants
              </v-btn>
            </template>
            <v-card>
              <v-card-title> Confirm </v-card-title>
              <v-card-text class="error--text">
                Pressing confirm will remove all the wants from your list!
              </v-card-text>
              <v-card-actions>
                <v-btn @click="confirm = false">Cancel</v-btn>
                <v-spacer />
                <v-btn @click="clearWants" class="error--text">Clear</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog">
            <template v-slot:activator="{ on, val }">
              <v-btn v-on="on" v-bind="val" color="deep-purple" class="mr-4">
                Request Cards
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="warning--text pb-4">
                Requesting Cards
              </v-card-title>
              <v-card-subtitle>
                <p>
                  I will lookup prices as I'm pulling cards then apply a
                  discount based on a price bracket with cards
                  <span class="cyan--text font-weight-bold">
                    over $25 being discounted 10%</span
                  >
                  and cards
                  <span class="cyan--text font-weight-bold">
                    less than $5 being discounted 35%</span
                  >.
                </p>
                Copy the text below and send it to me along with your email or
                phone # and I will message back as soon as possible.
              </v-card-subtitle>
              <v-card-text>
                <v-textarea
                  v-model="wantsJSON"
                  rows="3"
                  style="cursor: pointer"
                />
                <!-- <v-tooltip v-model="copied" top>
                  <template v-slot:activator="{}">
                    <v-btn class="mr-4" title="Copy" @click="jsonToClipboard">
                      <v-icon color="success">mdi-content-copy</v-icon>
                    </v-btn>
                  </template>
                  <span class="success--text">Copied</span>
                </v-tooltip> -->
                <v-btn @click="dialog = false">Close</v-btn>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CardList from "@/components/CardList.vue";
import cardModule from "@/store/modules/Cards";
import { ScryfallCard } from "@/types/Card";

@Component({
  components: {
    CardList,
  },
})
export default class Wants extends Vue {
  confirm = false;
  copied = false;
  dialog = false;
  get wants(): ScryfallCard[] {
    return cardModule.wants;
  }
  get wantsJSON(): string {
    return JSON.stringify(this.wants);
  }
  clearWants(): void {
    this.confirm = false;
    cardModule.clearWants();
  }
  jsonToClipboard(): void {
    navigator.clipboard.writeText(this.wantsJSON).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1500);
    });
  }
}
</script>
