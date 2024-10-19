<template>
  <v-app>

    <h1 class="text-h3 font-weight-bold">{{ t("navbar.entities.Settings") }}</h1>
    <VDivider class="mt-2"></VDivider>
    <v-container fluid class="mt-4" >
      <v-card flat class="pa-4 bg-green-lighten-5">
        <div class="text-h5 font-weight-bold">{{t("settings.theme")}}</div>
        <v-btn-toggle
          class="mt-4"
          mandatory
          shaped
        >
          <v-btn class="font-weight-bold">
            Dark
          </v-btn>

          <v-btn class="font-weight-bold">
            Light
          </v-btn>
        </v-btn-toggle>
      </v-card>
      <v-card flat class="pa-4 bg-green-lighten-5 mt-4">
        <div class="text-h5 font-weight-bold">{{ t("settings.language") }}</div>
        <v-btn-toggle
          class="mt-4"
          mandatory
          shaped
        >
          <v-btn @click="switchToEn()" class="font-weight-bold">
            English
          </v-btn>
          <v-btn @click="switchToFa()" class="font-weight-bold">
            Persian
          </v-btn>
        </v-btn-toggle>
      </v-card>
    </v-container>

  </v-app>
</template>


<script setup>
import i18n from "@/i18n";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const switchToEn = () =>{
  i18n.global.locale = 'en' ;
  console.log(i18n.global.locale , "new lang en")

}
const switchToFa= () =>{
  i18n.global.locale = "fa"
  console.log(i18n.global.locale , "new lang fa")

}
</script>


<style scoped lang="scss">

</style>
