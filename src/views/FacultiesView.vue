<template>
  <models-list :items="items" :headers="headers" search-placeholder="search in faculties">
    <template #models-name>Faculties</template>
    <template #model-name>Faculty</template>
  </models-list>
</template>
<script setup>
import {ref} from "vue";
import ModelsList from "@/components/ModelsList.vue";

const headers = ref([
  {title: 'Faculty Name', value: 'name', key : 'name'},
  {title: 'Department', value: 'department' , key: 'department'},
  {title: 'Status', value: 'status' },
  {title: 'Actions', value: 'actions'}
])
const items = ref([])

</script>


<style scoped lang="scss">

</style>
