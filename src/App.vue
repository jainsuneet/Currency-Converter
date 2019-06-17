<template>
  <v-app>
    <v-content>
      <CurrencyConverter />
    </v-content>
  </v-app>
</template>

<script>
import CurrencyConverter from './components/CurrencyConverter'

export default {
  name: 'App',
  components: {
    CurrencyConverter
  }
}
</script>
