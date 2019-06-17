<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-sheet elevation="2">
          <v-toolbar flat>
            <v-toolbar-title class="primary--text font-weight-bold">
              FactSet
              <span
                class="caption font-weight-bold"
              >&nbsp;&nbsp;&nbsp;{{ $vuetify.t('$vuetify.currencyConverter.currencyConverter') }}</span>
            </v-toolbar-title>
            <v-spacer />
            <v-divider vertical />
            <v-menu
              v-model="showColorMenu"
              :close-on-content-click="false"
              offset-y
              bottom
              origin="center center"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  flat
                  v-on="on"
                  class="primary--text"
                >
                  <v-icon color="primary">
                    color_lens
                  </v-icon>
                  {{ $vuetify.t('$vuetify.currencyConverter.theme') }}
                </v-btn>
              </template>
              <v-sheet>
                <sketch-picker v-model="color" />
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    flat
                    @click="showColorMenu = false"
                  >
                    {{ $vuetify.t('$vuetify.currencyConverter.cancel') }}
                  </v-btn>
                  <v-btn
                    color="primary"
                    flat
                    @click="changeGlobalPrimaryColor()"
                  >
                    {{ $vuetify.t('$vuetify.currencyConverter.save') }}
                  </v-btn>
                </v-card-actions>
              </v-sheet>
            </v-menu>
            <v-divider
              vertical
              class="mr-4"
            />
            <v-flex
              xs3
              sm3
              md2
            >
              <v-select
                v-model="selectedLanguage"
                :items="languages"
                label="Select"
                @change="changeLanguage()"
                hide-details
                prepend-inner-icon="language"
                single-line
                class="pt-0 primary--text font-weight-bold"
              />
            </v-flex>
          </v-toolbar>
          <v-divider />
          <v-layout
            fluid
            row
            wrap
            class="ma-5 pa-4"
          >
            <v-flex
              xs12
              sm2
              md2
            >
              <v-autocomplete
                v-model="selectedCurrencies.currency1"
                hide-details
                :items="currencySymbols"
                placeholder="Currency"
                class="primary--text font-weight-bold"
                @change="setTargetRate()"
              >
                <template v-slot:item="data">
                  <v-list-tile-title v-html="data.item" />
                </template>
              </v-autocomplete>
            </v-flex>
            <v-spacer />
            <v-flex
              xs12
              sm2
              md2
            >
              <v-text-field
                type="number"
                v-model="sourceValue"
                @input="setTargetRate()"
                color="primary"
                class="primary--text font-weight-bold"
              >
                <template v-slot:prepend>
                  <span
                    class="headline"
                    v-html="currencySymbol(selectedCurrencies.currency1)"
                  />
                </template>
              </v-text-field>
            </v-flex>
            <v-spacer />
            <v-icon
              color="primary"
              @click="swapCurrencies()"
            >
              swap_horiz
            </v-icon>
            <v-spacer />
            <v-flex
              xs12
              sm2
              md2
            >
              <v-text-field
                type="number"
                v-model="targetValue"
                @input="setSourceRate()"
                color="primary"
                class="primary--text font-weight-bold"
              >
                <template v-slot:prepend>
                  <span
                    class="headline"
                    v-html="currencySymbol(selectedCurrencies.currency2)"
                  />
                </template>
              </v-text-field>
            </v-flex>
            <v-spacer />
            <v-flex
              xs12
              sm2
              md2
            >
              <v-autocomplete
                v-model="selectedCurrencies.currency2"
                hide-details
                :items="currencySymbols"
                placeholder="Currency"
                class="primary--text font-weight-bold"
                @change="setSourceRate()"
              >
                <template v-slot:item="data">
                  <v-list-tile-title v-html="data.item" />
                </template>
              </v-autocomplete>
            </v-flex>
          </v-layout>
          <div
            v-if="conversionRate.rates"
            class="pb-5"
          >
            <p
              v-if="conversionRate.rates[selectedCurrencies.currency2] && selectedCurrencies.currency1 != selectedCurrencies.currency2"
              class="primary--text text-weight-bold title"
            >
              <span class="font-weight-black headline">1</span> {{ selectedCurrencies.currency1 }} {{ $vuetify.t('$vuetify.currencyConverter.equals') }} <span class="font-weight-black headline">{{ conversionRate.rates[selectedCurrencies.currency2].toLocaleString(this.selectedLanguage) }}</span> {{ selectedCurrencies.currency2 }}
            </p>
            <p
              v-if="conversionRate.rates[selectedCurrencies.currency1]"
              class="primary--text text-weight-bold title"
            >
              <span class="font-weight-black headline">1</span> {{ selectedCurrencies.currency2 }} {{ $vuetify.t('$vuetify.currencyConverter.equals') }} <span class="font-weight-black headline">{{ conversionRate.rates[selectedCurrencies.currency1].toLocaleString(this.selectedLanguage) }}</span> {{ selectedCurrencies.currency1 }}
            </p>
          </div>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// Custom color picker component
import { Sketch } from "vue-color";
// Rest API provider
import * as api from "../plugins/api";

export default {
  components: {
    "sketch-picker": Sketch
  },
  props: {
    // Array of currency symbols
    currencySymbols: { type: Array, default: () => { return ['EUR', 'USD'] } },
    // Object with base currency and target rates in nested object
    conversionRate: { type: Object, default: () => { return { base: 'EUR', rates: { 'USD': 1 } } } },
    // Array of objects with 'text' as display text and 'value' for language change
    languages: { type: Array, default: () => { return [{ text: 'English', value: 'en' }, { text: 'Deutsch', value: 'de' }] } },
    // Object with 'hex' as key and hex color code as value
    color: { type: Object, default: () => { return { hex:'#002856' } } },
    // Default language is set to English
    selectedLanguage: { type: String, default: () => { return 'en' } },
    // Primary input value
    sourceValue: { type: Number, default: () => { return 0 } },
    // Secondary input value
    targetValue: { type: Number, default: () => { return 0 } },
    // Object with keys 'currency1' and 'currency2' to store primary and secondary currencies
    selectedCurrencies: { type: Object, default: () => { return { currency1: 'EUR', currency2: 'USD' } } },
  },
  async beforeMount(){
    this.conversionRate = (await api.getCurrencyConversion({
            base: this.conversionRate.base,
            symbols: this.conversionRate.rates[0]
          })).data;
  },
  async mounted() {
    this.changeGlobalPrimaryColor();
    const data = (await api.getCurrencySymbols()).data;
    this.currencySymbols = [data.base].concat(
      Object.keys(data.rates).map(i => i)
    );
  },
  data: () => ({
    showColorMenu: false,
  }),
  methods: {
    /**
   * To change global theme of the component
   */
    changeGlobalPrimaryColor() {
      this.$vuetify.theme.primary = this.color.hex;
      this.showColorMenu = false;
    },
    /**
   * To change Internationalization and localization of the component
   */
    changeLanguage() {
      this.$vuetify.lang.current = this.selectedLanguage;
    },
    /**
   * On Swap icon click, Primary & secondary input and select fields are interchanged
   */
    swapCurrencies() {
      this.selectedCurrencies.currency2 = [
        this.selectedCurrencies.currency1,
        (this.selectedCurrencies.currency1 = this.selectedCurrencies.currency2)
      ][0];
      this.targetValue = [
        this.sourceValue,
        (this.sourceValue = this.targetValue)
      ][0];
      this.setTargetRate();
    },
    /**
   * Conversion of rate from source to traget currency.
   *  Takes into consideration if there is any previous stored conversion rate before calling the REST API
   */
    async setTargetRate() {
      if (!this.sourceValue) this.targetValue = undefined;
      if (isNaN(this.sourceValue)) this.targetValue = undefined;
      else if (this.conversionRate.base === this.selectedCurrencies.currency1) {
        this.targetValue = (
          this.sourceValue *
          this.conversionRate.rates[this.selectedCurrencies.currency2]
        ).toFixed(4);
      } else {
        try {
          this.conversionRate = (await api.getCurrencyConversion({
            base: this.selectedCurrencies.currency1,
            symbols: this.selectedCurrencies.currency2
          })).data;
          this.targetValue = (
            this.sourceValue *
            this.conversionRate.rates[this.selectedCurrencies.currency2]
          ).toFixed(4);
        } catch (error) {
          this.targetValue = 0;
        }
      }
    },
      /**
   * Conversion of rate from target to source currency.
   *  Takes into consideration if there is any previous stored conversion rate before calling the REST API
   */
    async setSourceRate() {
      if (!this.targetValue) this.sourceValue = undefined;
      if (isNaN(this.targetValue)) this.sourceValue = undefined;
      else if (this.conversionRate.base === this.selectedCurrencies.currency2) {
        this.sourceValue = (
          this.targetValue *
          this.conversionRate.rates[this.selectedCurrencies.currency1]
        ).toFixed(4);
      } else {
        try {
          this.conversionRate = (await api.getCurrencyConversion({
            base: this.selectedCurrencies.currency2,
            symbols: this.selectedCurrencies.currency1
          })).data;
          this.sourceValue = (
            this.targetValue *
            this.conversionRate.rates[this.selectedCurrencies.currency1]
          ).toFixed(4);
        } catch (error) {
          this.sourceValue = 0;
        }
      }
    }
  }
};
</script>

<style>
.v-input input {
  color: var(--v-primary) !important;
  font-size: 14px !important;
}
</style>

