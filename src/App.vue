<template>

  <v-app :dir="isRtl ?'rtl' : 'ltr'" :style="{backgroundColor : backgroundColor}">
    <navbar-component        :class="isRtl ? 'rtl-sidebar' : 'ltr-sidebar'"
                             v-if="route.path !== '/'"></navbar-component>
    <v-main>
      <v-container class="fill-height">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>


</template>
<script setup>

import NavbarComponent from "@/components/NavbarComponent.vue";
import {useRoute} from 'vue-router';
import {computed} from "vue";
import {useI18n} from "vue-i18n";

const route = useRoute();
const {locale} = useI18n()
const isRtl = computed(() => locale.value === 'fa');


const backgroundColor = computed(() => {
  return route.path === '/' ? '#C8E6C9' : '#ffffff'; // Change colors as needed
});
</script>
<style>
.ltr-sidebar {
  left: 0;
  right: auto;
}


.rtl-sidebar {
  right: 0;
  left: auto;
}
[dir="rtl"]  , .navbar {
  direction: rtl;
  text-align: right;

}

[dir="ltr"] , .navbar{
  direction: ltr;
  text-align: left;

}
</style>
