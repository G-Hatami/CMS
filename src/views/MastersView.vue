<template>
  <models-list :items="items" :headers="headers" search-placeholder="search in masters">
    <template #models-name>Masters</template>
    <template #model-name>Master</template>
  </models-list>

</template>
<script setup>
import {onMounted, ref} from "vue";
import ModelsList from "@/components/ModelsList.vue";
import axios from "axios";

const headers = ref([
  {title: 'Personal Number', value: 'personal-number' , key : 'personal-number'},
  {title: 'Firstname', value: 'firstname' , key: 'firstname'},
  {title: 'Lastname', value: 'lastname' , key: 'lastname'},
  {title: 'National Number', value: 'national-number' , key: 'national-number'},
  {title: 'Courses', value: 'courses' , key: 'courses'},
  {title: 'Faculty', value: 'faculty' , key: 'faculty'},
  {title: 'Actions', value: 'actions'}
])

const items = ref()
const getMasters = async () => {
  try {
    items.value = (await axios.get('https://254524c3-e01e-4716-8d9b-1460a3b69e31.mock.pstmn.io/api/masters')).data
  } catch (error) {
    console.error('Error fetching students:', error);
  }
}
onMounted(() => {
  getMasters()
  console.log("masters")
})
</script>


<style scoped lang="scss">

</style>
