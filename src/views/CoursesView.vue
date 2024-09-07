<template>
  <models-list :items="items" :headers="headers" search-placeholder="search in courses">
    <template #models-name>Courses</template>
    <template #model-name>Course</template>
  </models-list>
</template>
<script setup>
import {ref} from "vue";
import ModelsList from "@/components/ModelsList.vue";

const headers = ref([
  {title: 'Faculty Name', value: 'name'},
  {title: 'Department', value: 'department'},
  {title: 'Status', value: 'status'},
  {title: 'Actions', value: 'actions'}
])
const items = ref([{name: 'John Doe', department: 'Computer Science', status: 'Active'},
  {name: 'Jane Doe', department: 'IT', status: 'Inactive'},])
</script>


<style scoped lang="scss">

</style>
