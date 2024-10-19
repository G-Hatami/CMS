<template>
  <v-app>
    <div class="text-h3  font-weight-bold">{{ t("dashboard.dashboard") }}</div>
    <v-divider></v-divider>
    <v-container>

      <v-card>

      </v-card>
    </v-container>

  </v-app>

</template>
<script setup>
import {useI18n} from "vue-i18n";
//we define it in a curly brace so, it gets the function type
const {t} = useI18n()

</script>

<style scoped lang="scss">

</style>
