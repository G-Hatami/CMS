<template>
  <v-app :style="{backgroundColor : backgroundColor}">
    <navbar-component v-if="route.path !== '/'"></navbar-component>
    <v-main>
      <v-container class="fill-height">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>

import NavbarComponent from "@/components/NavbarComponent.vue";
import { useRoute } from 'vue-router';
import {computed} from "vue";
const route = useRoute();


const backgroundColor = computed(() => {
  return route.path === '/' ? '#C8E6C9' : '#ffffff'; // Change colors as needed
});
</script>
